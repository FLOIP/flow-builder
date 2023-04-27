<template>
  <div class="import-flow">
    <div class="row">
      <div class="col-sm-12 m-2">
        <div class="card d-flex bg-light">
          <div class="card-body">
            <div>
              <h2 v-if="hasImportFlowTitle">
                {{ trans('flow-builder.import-flow') }}
              </h2>
              <p>{{ 'flow-builder.create-flow-from-json' | trans }}</p>
              <div
                v-if="trans('flow-builder.import-note')"
                class="alert alert-info"
                role="alert">
                {{ 'flow-builder.import-note'| trans }}
              </div>
            </div>
            <div>
              <label class="mt-2 no-weight">
                <input
                  v-model="uploadOrPaste"
                  type="radio"
                  value="upload"> {{ 'flow-builder.import-json-file' | trans }}
              </label>
              <div
                v-if="uploadOrPaste === 'upload'"
                class="ml-3 mr-3">
                <div class="form-inline mb-2">
                  <span class="one-line">
                    <a
                      class="btn btn-outline-secondary"
                      @click="chooseFile">
                      {{ (!flowJsonText ? 'flow-builder.import-file' : 'flow-builder.replace-file') | trans }}
                    </a>
                    <input
                      id="flowUpload"
                      ref="file"
                      type="file"
                      hidden
                      @change="handleFileUpload">
                    <strong
                      v-if="fileName"
                      class="ml-1">{{ 'flow-builder.uploaded-file' | trans }}</strong> {{ fileName }}
                  </span>
                </div>
                <text-editor
                  v-if="flowJsonText"
                  :value="flowJson"
                  label=""
                  class="tall-text"
                  :placeholder="'flow-builder.edit-flow-json' | trans"
                  @input="setUpdatingAndHandleFlowJsonTextChange" />
              </div>
            </div>
            <div class="mt-2">
              <label class="mt-2 no-weight">
                <input
                  v-model="uploadOrPaste"
                  type="radio"
                  value="paste"> {{ 'flow-builder.paste-json-directly' | trans }}
              </label>
              <div
                v-if="uploadOrPaste === 'paste'"
                class="ml-3 mr-3">
                <text-editor
                  :value="flowJson"
                  label=""
                  class="tall-text"
                  :placeholder="'flow-builder.paste-flow-json' | trans"
                  @input="setUpdatingAndHandleFlowJsonTextChange" />
              </div>
            </div>
            <error-handler-v2 />
            <div class="float-right mt-3">
              <router-link
                :to="route('flows.cancelImport')"
                class="btn btn-outline-secondary mr-2">
                {{ trans('flow-builder.cancel') }}
              </router-link>

              <a
                :href="route('flows.editFlow', {flowId: flowUUID, component: 'builder', mode: 'edit'})"
                class="btn btn-primary"
                :class="{'disabled': disableContinue}"
                @click.prevent="handleImportFlow(route('flows.editFlow', {flowId: flowUUID, component: 'builder', mode: 'edit'}))">
                {{ 'flow-builder.create-flow' | trans }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import Lang from '@/lib/filters/lang'
import Routes from '@/lib/mixins/Routes'
import {Component, Prop} from 'vue-property-decorator'
import {Getter, Mutation, namespace, State} from 'vuex-class'
import {debounce, forEach, get, isEmpty} from 'lodash'
import {mixins} from 'vue-class-component'
import {store} from '@/store'
import {IContext} from '@floip/flow-runner'
import ErrorHandlerV2 from '@/components/interaction-designer/flow-editors/import/ErrorHandlerV2.vue'

import ImportStore from '@/store/flow/views/import'
import {ErrorObject} from 'ajv'

const flowVuexNamespace = namespace('flow')
const importVuexNamespace = namespace('flow/import')
const validationVuexNamespace = namespace('validation')

@Component({
  components: {
    ErrorHandlerV2,
  },
})
class ImportFlow extends mixins(Lang, Routes) {
  @Prop({default: () => ({})}) readonly appConfig!: object

  @Prop({default: () => ({})}) readonly builderConfig!: object

  uploadOrPasteSetting = 'upload'

  fileName = ''

  async beforeCreate(): Promise<void> {
    const {$store} = this

    forEach(store.modules, (v, k) => !$store.hasModule(k) && $store.registerModule(k, v))

    $store.hasModule(['flow', 'import'])
    || $store.registerModule(['flow', 'import'], ImportStore)
  }

  async created(): Promise<void> {
    if ((!isEmpty(this.appConfig) && !isEmpty(this.builderConfig)) || !this.isConfigured) {
      this.configure({appConfig: this.appConfig, builderConfig: this.builderConfig})
    }
  }

  @validationVuexNamespace.Action resetValidationStatuses!: ({key}: {key: string}) => void

  get uploadOrPaste() {
    return this.uploadOrPasteSetting
  }

  set uploadOrPaste(value) {
    if (value !== this.uploadOrPasteSetting) {
      this.reset()
    }
    this.uploadOrPasteSetting = value
  }

  get flowJson() {
    return this.flowJsonText
  }

  set flowJson(value) {
    this.setFlowJson(value)
  }

  setUpdatingAndHandleFlowJsonTextChange(value: string) {
    this.setUpdating(true)
    this.debounceHandleFlowJsonTextChange(value)
  }

  // In case someone is editing a language, let's give them a second to finish before we tell them it doesn't match
  debounceHandleFlowJsonTextChange = debounce(this.handleFlowJsonTextChange, 2000)

  async handleFlowJsonTextChange(value: string) {
    this.flowJson = value
    this.setUpdating(false)
  }

  @importVuexNamespace.Getter isSafeToImport!: boolean

  get flowUUID() {
    return get(this.flowContainer, 'flows[0].uuid')
  }

  chooseFile() {
    const fileInput: any = this.$refs.file
    fileInput.click()
  }

  async handleFileUpload(event: any) {
    this.reset()

    const selectedFile = event.target.files[0]
    this.fileName = selectedFile.name
    event.target.value = ''

    const reader = new FileReader()

    reader.onload = (readEvent: any) => {
      this.flowJson = readEvent.target.result.toString()
    }

    reader.readAsText(selectedFile, 'UTF-8')
  }

  @validationVuexNamespace.Mutation pushAjvErrorToValidationStatuses!: ({key, ajvError}: {key: string, ajvError: ErrorObject}) => void

  @State(({trees: {ui}}) => ui) ui!: any

  @flowVuexNamespace.Action flow_persistImport!: ({
    persistRoute,
    flowContainer,
  }: { persistRoute: string, flowContainer: IContext }) => Promise<IContext>

  async handleImportFlow(route: string) {
    const flowContainer = await this.flow_persistImport({
      // @ts-ignore - Would need to switch mixins to class components to fix this - https://class-component.vuejs.org/guide/extend-and-mixins.html#mixins
      persistRoute: this.route('flows.persistFlowImport', {}),
      flowContainer: this.flowContainer,
    })
    const numberOfFlows = get(flowContainer, 'flows.length', 0);

    if (flowContainer != null) {
      this.reset()
      if (numberOfFlows > 1) {
          this.$toast.success(`${Lang.trans('flow-builder.multiple-flows-saved', {
          number: numberOfFlows,
          })}`, {
            timeout: 3000,
            hideProgressBar: true,
          })
      } else {
        this.$toast.success(`${Lang.trans('flow-builder.flow-saved')}`, {
            timeout: 3000,
            hideProgressBar: true,
          })
      }
      this.$router.push(route)
    } else {
      console.warn('There was something wrong when trying to import flow', 'Check console log for more details')
    }
  }

  @Mutation configure!: ({appConfig, builderConfig}: { appConfig: object, builderConfig: object }) => void

  @Getter isConfigured!: boolean

  @Getter hasImportFlowTitle!: boolean

  get disableContinue() {
    return this.flowUUID === undefined
      || !this.isSafeToImport
  }

  @importVuexNamespace.Action setFlowJson!: (value: string) => Promise<void>

  @importVuexNamespace.Mutation baseReset!: () => void

  @importVuexNamespace.Mutation resetLanguageMatching!: () => void

  @importVuexNamespace.Mutation resetGroupMatching!: () => void

  @importVuexNamespace.Mutation resetPropertyMatching!: () => void

  @importVuexNamespace.Mutation setFlowError!: (text: string) => void

  @importVuexNamespace.Mutation setUpdating!: (updatingStatus: boolean) => void

  @importVuexNamespace.State flowError!: string

  @importVuexNamespace.State flowJsonText!: string

  @importVuexNamespace.State flowContainer!: IContext

  reset() {
    this.fileName = ''
    this.baseReset()
    this.resetLanguageMatching()
    this.resetPropertyMatching()
    this.resetGroupMatching()
    this.resetValidationStatuses({key: 'container_import'})
  }
}

export default ImportFlow

</script>

<style lang="scss">
.tall-text textarea {
  min-height: 200px
}

.one-line {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>

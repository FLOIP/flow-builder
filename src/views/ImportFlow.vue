<template>
  <div class="new-contents">
    <!-- TODO Take a look at login style for an example of how this well could look -->
    <div class="row">
      <div class="col-sm-8 offset-sm-2">
        <div class="card">
          <div class="card-body">
            <h2>
              {{'flow-builder.import-flow' | trans}}
            </h2>
            <p>{{'flow-builder.create-flow-from-json'}}</p>
            <label class="mt-2 no-weight">
              <input type="radio" value="upload" v-model="uploadOrPaste"> {{'flow-builder.import-json-file' | trans}}
            </label>
            <br>
            <div v-if="uploadOrPaste === 'upload'">
              <input type="file"
                class="btn btn-default"
                @change="handleFileUpload">
                  {{'flow-builder.import-file' | trans}}
              </input>
              <p v-if="fileName"><strong>Uploaded File:</strong> {{fileName}}</p>
              <text-editor :value="flowJson"
                @input="setUpdatingAndHandleFlowJsonTextChange"
                v-if="flowJsonText"
                label=""
                class="tall-text"
                :placeholder="'flow-builder.edit-flow-json' | trans">
              </text-editor>
              <error-handler/>
            </div>

            <br>
            <label class="mt-2 no-weight">
              <input type="radio" value="paste" v-model="uploadOrPaste"> {{'flow-builder.paste-json-directly' | trans}}
            </label>
            <div v-if="uploadOrPaste === 'paste'">
              <text-editor :value="flowJson"
                @input="setUpdatingAndHandleFlowJsonTextChange"
                label=""
                class="tall-text"
                :placeholder="'flow-builder.paste-flow-json' | trans">
              </text-editor>
              <error-handler/>
            </div>

            <div class="mt-5 float-right">
              <router-link :to="route('flows.cancelImport')" class="btn btn-outline-secondary mr-2">
                {{trans('flow-builder.cancel')}}
              </router-link>
              <a :href="route('trees.editTree', {treeId: flowUUID, component: 'interaction-designer', mode: 'edit'})"
                class="btn btn-primary"
                :class="{'disabled': disableContinue}"
                @click.prevent="handleImportFlow(route('trees.editTree', {treeId: flowUUID, component: 'interaction-designer', mode: 'edit'}))">
                {{'flow-builder.save-and-continue' | trans}}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import lang from '@/lib/filters/lang'
import Routes from '@/lib/mixins/Routes'
import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { Getter, Mutation, namespace } from 'vuex-class'
import {
  forEach,
  isEmpty,
  get,
  debounce,
} from 'lodash'
import { store } from '@/store'
import { IContext } from '@floip/flow-runner'

import TextEditor from '@/components/common/TextEditor.vue'
import ErrorHandler from '@/components/interaction-designer/flow-editors/import/ErrorHandler.vue'
import ImportStore from '../store/flow/views/import'

const flowVuexNamespace = namespace('flow')
const importVuexNamespace = namespace('flow/import')

@Component(
  {
    components: {
      TextEditor,
      ErrorHandler,
    },
    mixins: [lang, Routes],
  },
)
class ImportFlow extends Vue {
  @Prop({ default: () => ({}) }) readonly appConfig!: object

  @Prop({ default: () => ({}) }) readonly builderConfig!: object

  uploadOrPasteSetting = 'upload'

  fileName = ''

  async created() {
    const { $store } = this

    forEach(store.modules, (v, k) => !$store.hasModule(k) && $store.registerModule(k, v))

    $store.hasModule(['flow', 'import'])
      || $store.registerModule(['flow', 'import'], ImportStore)

    if ((!isEmpty(this.appConfig) && !isEmpty(this.builderConfig)) || !this.isConfigured) {
      this.configure({ appConfig: this.appConfig, builderConfig: this.builderConfig })
    }
  }

  reset() {
    this.fileName = ''
    this.baseReset()
    this.resetLanguageMatching()
    this.resetPropertyMatching()
    this.resetGroupMatching()
  }

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

  get disableContinue() {
    return !this.flowUUID
      || this.flowError
      || this.languagesMissing
      || this.propertiesMissing
      || this.groupsMissing
      || this.hasUnsupportedBlockClasses
  }

  get flowUUID() {
    return get(this.flowContainer, 'flows[0].uuid')
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

    const contents = reader.readAsText(selectedFile, 'UTF-8')
  }

  async handleImportFlow(route: string) {
    const flowContainer = await this.flow_import({
      // @ts-ignore - Would need to switch mixins to class components to fix this - https://class-component.vuejs.org/guide/extend-and-mixins.html#mixins
      persistRoute: this.route('flows.persistFlow', { flowId: this.flowContainer.uuid }),
      flowContainer: this.flowContainer,
    })
    if (flowContainer) {
      this.reset()
      this.$router.push(route)
    } else {
      this.setFlowError('flow-builder.problem-importing-flow')
      // TODO - hook into validation system when we have it to display any errors? Or should we have caught any errors already?
    }
  }

  @flowVuexNamespace.Action flow_import!: ({ persistRoute, flowContainer }: { persistRoute: string; flowContainer: IContext }) => Promise<IContext>

  @Mutation configure!: ({ appConfig, builderConfig }: { appConfig: object; builderConfig: object }) => void

  @Getter isConfigured!: boolean

  @importVuexNamespace.Getter hasUnsupportedBlockClasses!: boolean

  @importVuexNamespace.Getter languagesMissing!: boolean

  @importVuexNamespace.Getter groupsMissing!: boolean

  @importVuexNamespace.Getter propertiesMissing!: boolean

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
}

export default ImportFlow

</script>

<style lang="scss">
  .tall-text textarea {
    min-height: 200px
  }
</style>

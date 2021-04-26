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
            <div v-if="flowError" class="alert alert-danger" role="alert">
              <p>{{flowError | trans}}</p>
            </div>
            <div v-if="hasUnsupportedBlockClasses" class="alert alert-danger" role="alert">
              {{ `${trans('flow-builder.unsupported-blocks-detected')}: ${unsupportedBlockClassesList}` }}
            </div>

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
              <text-editor :value="flowJson"
                @input="setUpdatingAndHandleFlowJsonTextChange"
                v-if="flowJsonText"
                label=""
                class="tall-text"
                :placeholder="'flow-builder.edit-flow-json' | trans">
              </text-editor>
              <div v-if="updating">
                <br>
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
              <import-matcher v-if="languagesMissing"
                @reactToMatch="handleMatchLanguage"
                :missing-matches="missingLanguages"
                type-id="id"
                type-label="label"
                :existing-options-without-match="existingLanguagesWithoutMatch"
                match-not-found-text="flow-builder.match-for-languages-not-found"/>
              <import-matcher v-if="propertiesMissing"
                @reactToMatch="handleMatchProperty"
                :missing-matches="missingProperties"
                type-id="name"
                type-label="name"
                :existing-options-without-match="existingPropertiesWithoutMatch"
                match-not-found-text="flow-builder.match-for-properties-not-found"/>
              <import-matcher v-if="groupsMissing"
                @reactToMatch="handleMatchGroup"
                :missing-matches="missingGroups"
                type-id="id"
                type-label="group_name"
                :existing-options-without-match="existingGroupsWithoutMatch"
                match-not-found-text="flow-builder.match-for-groups-not-found"/>
            </div>

            <br>
            <label class="mt-2 no-weight">
              <input type="radio" value="paste" v-model="uploadOrPaste"> {{'flow-builder.paste-json-directly' | trans}}
            </label>
            <div v-if="uploadOrPaste === 'paste'">
              <text-editor :value="flowJson"
                @input="setUpdatingAndHandleFlowJsonTextChange"
                v-if="uploadOrPaste === 'paste'"
                label=""
                class="tall-text"
                :placeholder="'flow-builder.paste-flow-json' | trans">
              </text-editor>
              <div v-if="updating">
                <br>
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
              <import-matcher v-if="languagesMissing"
                @reactToMatch="handleMatchLanguage"
                :missing-matches="missingLanguages"
                type-id="id"
                type-label="label"
                :existing-options-without-match="existingLanguagesWithoutMatch"
                match-not-found-text="flow-builder.match-for-languages-not-found"/>
              <import-matcher v-if="propertiesMissing"
                @reactToMatch="handleMatchProperty"
                :missing-matches="missingProperties"
                type-id="name"
                type-label="name"
                :existing-options-without-match="existingPropertiesWithoutMatch"
                match-not-found-text="flow-builder.match-for-properties-not-found"/>
              <import-matcher v-if="groupsMissing"
                @reactToMatch="handleMatchGroup"
                :missing-matches="missingGroups"
                type-id="id"
                type-label="group_name"
                :existing-options-without-match="existingGroupsWithoutMatch"
                match-not-found-text="flow-builder.match-for-groups-not-found"/>
            </div>

            <div class="mt-5 float-right">
              <a :href="route('trees.editTree', {treeId: flowUUID, component: 'interaction-designer', mode: 'edit'})"
                class="btn btn-primary"
                :class="{'disabled': disableContinue}"
                @click.prevent="handleImportFlow(route('trees.editTree', {treeId: flowUUID, component: 'interaction-designer', mode: 'edit'}))">
                {{'flow-builder.save-and-continue' | trans}}
              </a>
            </div>
            <!-- TODO cancel button - router link back or home is default -->
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
import {Getter, Mutation, namespace} from 'vuex-class'
import { 
  forEach, 
  isEmpty, 
  get,
  uniq,
  difference,
  join,
  debounce,
} from 'lodash'
import {store} from '@/store'
import { IContactPropertyOption } from '../store/flow/block-types/Core_SetContactPropertyStore'
import { IGroupOption } from '../store/flow/block-types/Core_SetGroupMembershipStore'
const flowVuexNamespace = namespace('flow')
const importVuexNamespace = namespace('flow/import')
import {IFlow, IContext, IBlock} from '@floip/flow-runner'
import { ILanguage } from '@floip/flow-runner/dist/flow-spec/ILanguage'
import ImportStore from '../store/flow/views/import'

import { updateResourcesForLanguageMatch } from '../store/flow/utils/importHelpers'

import TextEditor from '@/components/common/TextEditor.vue'
import ImportMatcher from '@/components/interaction-designer/flow-editors/ImportMatcher.vue'

@Component(
  {
    components: {
      TextEditor,
      ImportMatcher
    },
    mixins: [lang, Routes],
  },
)
class ImportFlow extends Vue {
  @Prop({default: () => ({})}) readonly appConfig!: object
  @Prop({default: () => ({})}) readonly builderConfig!: object

  uploadOrPasteSetting = "upload"
  updating = false

  async created() {
    const {$store} = this

    forEach(store.modules, (v, k) =>
      !$store.hasModule(k) && $store.registerModule(k, v))

    $store.hasModule(['flow', 'import'])
      || $store.registerModule(['flow', 'import'], ImportStore)

    if ((!isEmpty(this.appConfig) && !isEmpty(this.builderConfig)) || !this.isConfigured) {
      this.configure({ appConfig: this.appConfig, builderConfig: this.builderConfig })
    }
  }

  reset() {
    this.baseReset()
    this.resetLanguageMatching()
    this.resetPropertyMatching()
    this.resetGroupMatching()
  }

  get uploadOrPaste () {
    return this.uploadOrPasteSetting
  }
  set uploadOrPaste (value) {
    if(value !== this.uploadOrPasteSetting) {
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
    this.updating = true
    this.debounceHandleFlowJsonTextChange(value)
  }

  //In case someone is editing a language, let's give them a second to finish before we tell them it doesn't match
  debounceHandleFlowJsonTextChange = debounce(this.handleFlowJsonTextChange, 2000)

  async handleFlowJsonTextChange(value: string) {
    this.flowJson = value
    this.updating = false
  }

  get disableContinue() {
    return !this.flowUUID ||
      this.flowError ||
      this.languagesMissing ||
      this.propertiesMissing ||
      this.groupsMissing ||
      this.hasUnsupportedBlockClasses
  }

  get hasUnsupportedBlockClasses() {
    return !isEmpty(this.unsupportedBlockClasses)
  }

  get unsupportedBlockClasses() {
    return difference(this.uploadedBlockTypes, this.blockClasses)
  }

  get unsupportedBlockClassesList() {
    return join(this.unsupportedBlockClasses, ', ')
  }

  get uploadedBlockTypes() {
    return uniq(get(this.flowContainer, 'flows[0].blocks', []).map((block: IBlock) => block.type ))
  }

  get flowUUID() {
    return get(this.flowContainer, 'flows[0].uuid')
  }
  get languagesMissing() {
    return !isEmpty(this.missingLanguages) 
  }
  get propertiesMissing() {
    return !isEmpty(this.missingProperties)
  }
  get groupsMissing() {
    return !isEmpty(this.missingGroups)
  }


  async handleFileUpload(event: any) {
    this.reset()

    const selectedFile = event.target.files[0]

    const reader = new FileReader()

    reader.onload = (readEvent: any) => {
      this.flowJson = readEvent.target.result.toString()
    }

    const contents = reader.readAsText(selectedFile, "UTF-8")
  }
  handleMatchLanguage(oldLanguage: ILanguage, matchingNewLanguage: ILanguage) {
    this.matchLanguage({oldLanguage, matchingNewLanguage})
  }
  handleMatchProperty(oldProperty: {name: string, blockIds: string[]}, matchingNewProperty: IContactPropertyOption) {
    this.matchProperty({oldProperty, matchingNewProperty})
  }
  handleMatchGroup(oldGroup: {id: string, group_name: string, blockIds: string[]}, matchingNewGroup: IGroupOption) {
    this.matchGroup({oldGroup, matchingNewGroup})
  }
  async handleImportFlow(route: string) {
    const flowContainer = await this.flow_import({
      //@ts-ignore - Would need to switch mixins to class components to fix this - https://class-component.vuejs.org/guide/extend-and-mixins.html#mixins
      persistRoute: this.route('flows.persistFlow', { flowId: this.flowContainer.uuid }),
      flowContainer: this.flowContainer
    })
    if(flowContainer) {
      this.reset()
      this.$router.push(route)
    } else {
      this.setFlowError('flow-builder.problem-importing-flow')
      //TODO - hook into validation system when we have it to display any errors? Or should we have caught any errors already?
    }
  }

  @flowVuexNamespace.Action flow_import!: ({ persistRoute, flowContainer }: { persistRoute: string, flowContainer: IContext }) => Promise<IContext>
  @Mutation configure!: ({ appConfig, builderConfig }: { appConfig: object; builderConfig: object }) => void
  @Getter isConfigured!: boolean
  @Getter languages!: ILanguage[] 
  @Getter subscriberPropertyFields!: IContactPropertyOption[]
  @Getter groups!: IGroupOption[]
  @Getter blockClasses!: string[]
  @importVuexNamespace.Action validateLanguages!: (flowContainer: IContext) => Promise<void>
  @importVuexNamespace.Action validateProperties!: (newPropertyBlocks: IBlock[]) => Promise<void>
  @importVuexNamespace.Action validateGroups!: (newGroupBlocks: IBlock[]) => Promise<void>
  @importVuexNamespace.Action matchLanguage!: ({oldLanguage, matchingNewLanguage}: {oldLanguage: ILanguage, matchingNewLanguage: ILanguage}) => Promise<void>
  @importVuexNamespace.Action matchProperty!: ({oldProperty, matchingNewProperty}: {oldProperty: object, matchingNewProperty: object}) => Promise<void>
  @importVuexNamespace.Action matchGroup!: ({oldGroup, matchingNewGroup}: {oldGroup: object, matchingNewGroup: object}) => Promise<void>
  @importVuexNamespace.Action setFlowJson!: (value: string) => Promise<void>
  @importVuexNamespace.Mutation baseReset!: () => void
  @importVuexNamespace.Mutation resetLanguageMatching!: () => void
  @importVuexNamespace.Mutation resetGroupMatching!: () => void
  @importVuexNamespace.Mutation resetPropertyMatching!: () => void
  @importVuexNamespace.Mutation setFlowError!: (text: string) => void
  @importVuexNamespace.State flowError!: string 
  @importVuexNamespace.State flowJsonText!: string 
  @importVuexNamespace.State flowContainer!: IContext
  @importVuexNamespace.State missingLanguages!: ILanguage[]
  @importVuexNamespace.State existingLanguagesWithoutMatch!: ILanguage[]
  @importVuexNamespace.State missingProperties!: {name: string, blockIds: string[]}[]
  @importVuexNamespace.State existingPropertiesWithoutMatch!: IContactPropertyOption[]
  @importVuexNamespace.State missingGroups!: {id: string, group_name: string, blockIds: string[]}[]
  @importVuexNamespace.State existingGroupsWithoutMatch!: IGroupOption[]
}

export default ImportFlow 

</script>

<style lang="scss">
  .tall-text textarea {
    min-height: 200px
  }
</style>

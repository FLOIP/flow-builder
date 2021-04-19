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
              {{flowError | trans}}
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
                :match-text-not-found="'match-for-languages-not-found' | trans"/>
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
                :match-text-not-found="'match-for-languages-not-found' | trans"/>
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
  find,
  pick,
  omit,
  reject,
  differenceWith,
  isEqual,
  cloneDeep,
  debounce,
} from 'lodash'
import {store} from '@/store'
const flowVuexNamespace = namespace('flow')
import {IFlow, IContext} from '@floip/flow-runner'
import { ILanguage } from '@floip/flow-runner/dist/flow-spec/ILanguage'

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
    async created() {
      const {$store} = this

      forEach(store.modules, (v, k) =>
        !$store.hasModule(k) && $store.registerModule(k, v))

      if ((!isEmpty(this.appConfig) && !isEmpty(this.builderConfig)) || !this.isConfigured) {
        this.configure({ appConfig: this.appConfig, builderConfig: this.builderConfig })
      }
    },
  },
)
class ImportFlow extends Vue {
  @Prop({default: () => ({})}) readonly appConfig!: object
  @Prop({default: () => ({})}) readonly builderConfig!: object

  flowContainer = null
  uploadOrPasteSetting = "upload"
  flowJsonText = ""
  matchingLanguages = []
  missingLanguages = []
  missingProperties = []
  missingGroups = []
  existingLanguagesWithoutMatch = []
  flowError = null
  updating = false

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
    this.flowError = null
    this.flowJsonText = value
    let flowContainer
    try {
      //check valid json
      flowContainer = JSON.parse(this.flowJsonText)
    } catch (e) {
      this.resetLanguageMatching()
      this.flowError = "flow-builder.invalid-json-provided"
      return
    }
    //this.checkIfValidFlow(flowContainer) //TODO - waiting for validation work
    if(!this.checkSingleFlowOnly(flowContainer)) {
      this.flowError = 'flow-builder.importer-currently-supports-single-flow-only'
      return
    }
    const oldFlowContainer = cloneDeep(this.flowContainer)
    const newFlowContainer = cloneDeep(flowContainer)
    this.flowContainer = flowContainer

    if(this.detectedLanguageChanges(newFlowContainer, oldFlowContainer)) {
      this.validateLanguages(this.flowContainer)
    }
    //matching on "property_key" == "name" in builder
    //if(this.detectedPropertyChanges(newFlowContainer, oldFlowContainer)) {
      //this.validateProperties(this.flowContainer)
    //}
    ////matching on "groupKey" == "id" in builder
    //if(this.detectedGroupChanges(newFlowContainer, oldFlowContainer)) {
      //this.validateGroups(this.flowContainer)
    //}
    this.flowJsonText = JSON.stringify(this.flowContainer, null, 2)
    //check props
    //check groups
  }

  reset() {
    this.flowContainer = null
    this.uploadOrPasteSetting = "upload"
    this.flowJsonText = ""
    this.resetLanguageMatching()
    this.missingProperties = []
    this.missingGroups = []
    this.flowError = null
    this.updating = false
  }
  resetLanguageMatching() {
    this.matchingLanguages = []
    this.missingLanguages = []
    this.existingLanguagesWithoutMatch = []
  }

  setUpdatingAndHandleFlowJsonTextChange(value) {
    this.updating = true
    this.debounceHandleFlowJsonTextChange(value)
  }

  detectedLanguageChanges(flowContainer, oldFlowContainer) {
    return !isEqual(get(flowContainer, 'flows[0].languages'), get(oldFlowContainer, 'flows[0].languages'))
  }

  checkSingleFlowOnly(flowContainer) {
    if(flowContainer.flows.length !== 1) {
      return false
    }
    return true
  }

  get disableContinue() {
    return !this.flowUUID ||
      this.flowError ||
      !isEmpty(this.missingLanguages)
      !isEmpty(this.missingProperties)
      !isEmpty(this.missingGroups)
  }

  validateLanguages(flowContainer) {
    const uploadLanguages = get(flowContainer, 'flows[0].languages', [])
    const matchingLanguages = []
    if(uploadLanguages) {
      uploadLanguages.forEach((language) => {
        let matchingLanguage = find(this.languages, (orgLanguage) => {
          return isEqual(orgLanguage, language)
        })
        if(!matchingLanguage) {
          //Unlike the others we don't reset this. 
          //A previously unmatched language can only be fixed by updating or adding a language 
          this.missingLanguages.push(language)
        } else {
          matchingLanguages.push(language)
        }
      })
      this.matchingLanguages = matchingLanguages
      //Update the languages so we use the org settings for things like id and orgId
      this.flowContainer.flows[0].languages = this.matchingLanguages
      this.existingLanguagesWithoutMatch = differenceWith(this.languages, this.matchingLanguages, isEqual);
    }
  }

  handleMatchLanguage(oldLanguage, matchingNewLanguage) {
    this.flowContainer.flows[0].languages.push(matchingNewLanguage)
    this.flowContainer.resources = updateResourcesForLanguageMatch(this.flowContainer.resources, oldLanguage.id, matchingNewLanguage.id)
    this.flowJsonText = JSON.stringify(this.flowContainer, null, 2)
    this.missingLanguages = reject(this.missingLanguages, (language) => {
      return isEqual(language, oldLanguage)
    })
    this.validateLanguages(this.flowContainer)
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


  async handleFileUpload(event) {
    //TODO - this should properly reset things
    const selectedFile = event.target.files[0]

    const reader = new FileReader()

    reader.onload = (readEvent) => {
      this.flowJson = readEvent.target.result.toString()
    }

    const contents = reader.readAsText(selectedFile, "UTF-8")
  }
  //In case someone is editing a language, let's give them a second to finish before we tell them it doesn't match
  debounceHandleFlowJsonTextChange = debounce(this.handleFlowJsonTextChange, 2000)
  async handleFlowJsonTextChange(value) {
    this.flowJson = value
    this.updating = false
  }
  async handleImportFlow(route) {
    //TODO - ensure UUIDs generated?
    const flowContainer = await this.flow_persist({
      //@ts-ignore - Would need to switch mixins to class components to fix this - https://class-component.vuejs.org/guide/extend-and-mixins.html#mixins
      persistRoute: this.route('flows.persistFlow', { flowId: this.flowContainer.uuid }),
      flowContainer: this.flowContainer
    })
    if(flowContainer) {
      this.$router.push(route)
    } else {
      this.flowError = 'flow-builder.problem-importing-flow'
      //TODO - hook into validation system when we have it to display any errors? Or should we have caught any errors already?
    }
  }

  @flowVuexNamespace.Action flow_importFlow!: ({flow: IFlow}) => Promise<IContext>
  @flowVuexNamespace.Action flow_persist!: ({persistRoute: string, flowContainer: IContext}) => Promise<IContext>
  @Mutation configure 
  @Getter isConfigured!: boolean
  @Getter languages!: ILanguage[] 
}

export default ImportFlow 

</script>

<style lang="scss">
  .tall-text {
    min-height: 200px
  }
</style>

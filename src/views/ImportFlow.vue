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
              <import-matcher v-if="propertiesMissing"
                @reactToMatch="handleMatchProperty"
                :missing-matches="missingProperties"
                type-id="name"
                type-label="name"
                :existing-options-without-match="existingPropertiesWithoutMatch"
                :match-text-not-found="'match-for-properties-not-found' | trans"/>
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
              <import-matcher v-if="propertiesMissing"
                @reactToMatch="handleMatchProperty"
                :missing-matches="missingProperties"
                type-id="name"
                type-label="name"
                :existing-options-without-match="existingPropertiesWithoutMatch"
                :match-text-not-found="'match-for-properties-not-found' | trans"/>
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
  set,
  find,
  findIndex,
  pick,
  omit,
  reject,
  keys,
  filter,
  differenceWith,
  isEqual,
  cloneDeep,
  debounce,
} from 'lodash'
import {store} from '@/store'
import { IContactPropertyOption } from '../store/flow/block-types/Core_SetContactPropertyStore'
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
  existingLanguagesWithoutMatch = []
  blocksMissingProperties: any = {}
  missingProperties = []
  matchingProperties = []
  existingPropertiesWithoutMatch = []
  blocksMissingGroups = []
  matchingGroups = []
  existingGroupsWithoutMatch = []
  flowError = null
  updating = false
  propertyBlocks = []

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
      this.resetPropertyMatching()
      this.resetGroupMatching()
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
    const newPropertyBlocks = this.getPropertyBlocks(flowContainer)
    if(this.detectedPropertyChanges(newPropertyBlocks)) {
      this.propertyBlocks = newPropertyBlocks
      this.validateProperties(this.propertyBlocks)
    }
    ////matching on "groupKey" == "id" in builder
    //if(this.detectedGroupChanges(newFlowContainer, oldFlowContainer)) {
      //this.validateGroups(this.flowContainer)
    //}
    this.flowJsonText = JSON.stringify(this.flowContainer, null, 2)
    //check props
    //check groups
  }

  getPropertyBlocks(flowContainer) {
    return filter(get(flowContainer, 'flows[0].blocks'), (block) => { 
      return block.type === "Core\\SetContactProperty" 
    })
  }

  reset() {
    this.flowContainer = null
    this.uploadOrPasteSetting = "upload"
    this.flowJsonText = ""
    this.resetLanguageMatching()
    this.resetPropertyMatching()
    this.resetGroupMatching()
    this.flowError = null
    this.updating = false
    this.propertyBlocks = []
  }
  resetLanguageMatching() {
    this.matchingLanguages = []
    this.missingLanguages = []
    this.existingLanguagesWithoutMatch = []
  }
  resetPropertyMatching() {
    this.matchingLanguages = []
    this.blocksMissingProperties = {} 
    this.missingProperties = []
    this.existingPropertiesWithoutMatch = []
  }
  resetGroupMatching() {
    this.matchingGroups = []
    this.blocksMissingGroups = []
    this.existingGroupsWithoutMatch = []
  }

  setUpdatingAndHandleFlowJsonTextChange(value) {
    this.updating = true
    this.debounceHandleFlowJsonTextChange(value)
  }

  detectedLanguageChanges(flowContainer, oldFlowContainer) {
    return !isEqual(get(flowContainer, 'flows[0].languages'), get(oldFlowContainer, 'flows[0].languages'))
  }
  detectedPropertyChanges(newPropertyBlocks) {
    return !isEqual(newPropertyBlocks, this.propertyBlocks)
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
      !isEmpty(this.blocksMissingProperties)
      !isEmpty(this.blocksMissingGroups)
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

  validateProperties(newPropertyBlocks) {
    const matchingProperties = []
    newPropertyBlocks.forEach((propertyBlock) => {
      const propertyIdentifier = get(propertyBlock, 'config.set_contact_property.property_key')
      if(propertyIdentifier) {
        let matchingProperty = find(this.subscriberPropertyFields, (orgProperty) => {
          return isEqual(orgProperty.name, propertyIdentifier)
        })
        if(!matchingProperty) {
          //Unlike the others we don't reset this. 
          //A previously unmatched property can only be fixed by updating or adding a language 
          //
          //Name is all we can get when there isn't a match
          //...as the block sidebar gets the actual displayLabel by matching
          if(!get(this.blocksMissingProperties, propertyIdentifier)) {
            this.blocksMissingProperties[propertyIdentifier] = []
          }
          this.blocksMissingProperties[propertyIdentifier].push(propertyBlock.uuid)
        } else {
          matchingProperties.push(matchingProperty)
        }
      }
    })

    this.missingProperties = keys(this.blocksMissingProperties).map((propertyIdentifier) => {
      return { name: propertyIdentifier, blockIds: this.blocksMissingProperties[propertyIdentifier] }
    })
    this.matchingProperties = matchingProperties
    //Update the languages so we use the org settings for things like id and orgId
    this.existingPropertiesWithoutMatch = differenceWith(this.subscriberPropertyFields, this.matchingProperties, isEqual);
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
  handleMatchProperty(oldProperty, matchingNewProperty) {
    console.log(oldProperty.blockIds)
    oldProperty.blockIds.forEach((blockId) => {
      const blockIndex = findIndex(this.flowContainer.flows[0].blocks, (block) => { return block.uuid === blockId })
      console.log(blockIndex)
      set(this.flowContainer.flows[0].blocks, `${blockIndex}.config.set_contact_property.property_key`, matchingNewProperty.name)
    })
    this.flowJsonText = JSON.stringify(this.flowContainer, null, 2)
    //missingProperties gets updated again when we validate below
    this.blocksMissingProperties = keys(this.blocksMissingProperties).reduce((newBlocksMissingProperties, propertyIdentifier) => {
      if(oldProperty.name !== propertyIdentifier) {
        newBlocksMissingProperties[propertyIdentifier] = this.blocksMissingProperties[propertyIdentifier]
      }
      return newBlocksMissingProperties
    }, {})
    const newPropertyBlocks = this.getPropertyBlocks(this.flowContainer)
    this.validateProperties(newPropertyBlocks)
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
    return !isEmpty(this.blocksMissingGroups)
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
  @Getter subscriberPropertyFields: IContactPropertyOption[]
}

export default ImportFlow 

</script>

<style lang="scss">
  .tall-text {
    min-height: 200px
  }
</style>

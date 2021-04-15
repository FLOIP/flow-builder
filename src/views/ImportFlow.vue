<template>
  <div class="new-contents">
  //Take a look at login style for an example of how this well could look
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
                @input="debounceHandleFlowJsonTextChange"
                v-if="flowJsonText"
                label=""
                :placeholder="'flow-builder.edit-flow-json' | trans">
              </text-editor>
              <label v-if="languagesMissing">Matches for these languages could not be found</label>
              <div v-for="missingLanguage in missingLanguages">
                <div class="form-check form-check-inline">
                  <label class="form-check-label">{{missingLanguage.label || missingLanguage.id}}</label>
                  <select class="form-control" @change="updateLanguageMappings(missingLanguage, $event)"> 
                    <!-- Why isn't this working?-->
                    <option value="" :selected="languageMappingsEmpty">
                      {{ 'flow-builder.none-selected' | trans }}
                    </option>
                    <option v-for="language in existingLanguagesWithoutMatch" :value="JSON.stringify(language)">
                      {{ language }}
                    </option>
                  </select>
                  <button class="btn btn-primary"
                    @click="handleMatchLanguage(missingLanguage)">
                    {{'flow-builder.update' | trans}}
                  </button>
                </div>
              </div>
            </div>

            <br>
            <label class="mt-2 no-weight">
              <input type="radio" value="paste" v-model="uploadOrPaste"> {{'flow-builder.paste-json-directly' | trans}}
            </label>
            <text-editor :value="flowJson"
              @input="debounceHandleFlowJsonTextChange"
              v-if="uploadOrPaste === 'paste'"
              label=""
              :placeholder="'flow-builder.paste-flow-json' | trans">
            </text-editor>
              <label v-if="languagesMissing">Matches for these languages could not be found</label>
              <div v-for="missingLanguage in missingLanguages">
                <div class="form-check form-check-inline">
                  <label class="form-check-label">{{missingLanguage.label || missingLanguage.id}}</label>
                  <select class="form-control" @change="updateLanguageMappings(missingLanguage, $event)"> 
                    <option value="" :selected="languageMappingsEmpty">
                      {{ 'flow-builder.none-selected' | trans }}
                    </option>
                    <option v-for="language in existingLanguagesWithoutMatch" :value="JSON.stringify(language)">
                      {{ language }}
                    </option>
                  </select>
                  <button class="btn btn-primary"
                    @click="handleMatchLanguage(missingLanguage)">
                    {{'flow-builder.update' | trans}}
                  </button>
                </div>
              </div>

            <div class="mt-5 float-right">
              <a :href="route('trees.editTree', {treeId: flowUUID, component: 'interaction-designer', mode: 'edit'})"
                class="btn btn-primary"
                :class="{'disabled': disableContinue}"
                @click.prevent="handleImportFlow(route('trees.editTree', {treeId: flowUUID, component: 'interaction-designer', mode: 'edit'}))">
                {{'flow-builder.save-and-continue' | trans}}
              </a>
            </div>
            //cancel button - router link back or home is default
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

import TextEditor from '@/components/common/TextEditor.vue'

@Component(
  {
    components: {
      TextEditor
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
    async mounted() {
      //if(!this.activeFlowContainer) {
        //this.addEmptyFlowContainer()
        //langs, groups, props come from builder.config.json
        //flow or flow container imported?
        //can match against langs, groups and props
        //Do resolve ui when conflict
        //What do we do for lang matching in transfer contact?
      //}
    }
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
  flowError = null;
  languageMappings = {}

  get uploadOrPaste () {
    return this.uploadOrPasteSetting
  }
  set uploadOrPaste (value) {
    if(this.uploadOrPasteSetting === 'upload' && value === 'paste') {
      this.flowJsonText = ""
    }
    this.uploadOrPasteSetting = value
  }

  updateLanguageMappings(missingLanguage, event) {
    this.languageMappings[missingLanguage.id] = event.target.value
  }

  get languageMappingsEmpty() {
    return isEmpty(this.languageMappings)
  }

  get flowJson() {
    //TODO - check this is what we do elsewhere
    return this.flowJsonText
  }
  set flowJson(value) {
    this.flowJsonText = value
    let flowContainer
    try {
      //check valid json
      flowContainer = JSON.parse(this.flowJsonText)
    } catch (e) {
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
    //Probably no longer needed. Validations will be exclude fields, not just require.
    //this.flowContainer = this.cleanFlow(flowContainer) 

    if(this.detectedLanguageChanges(newFlowContainer, oldFlowContainer)) {
      this.languageMappings = {}
      this.validateLanguages(this.flowContainer)
    }
    this.flowJsonText = JSON.stringify(this.flowContainer, null, 2)
    //check languages
    //check props
    //check groups
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
    return !this.flowUUID || this.flowError || !isEmpty(this.missingLanguages)
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

  //cleanFlow(flowContainer) {
    ////clean languages or org specific stuff - we may be copying between accounts
    //if(get(flowContainer, 'flows[0].languages')) {
      //flowContainer.flows[0].languages = get(flowContainer, 'flows[0].languages', [])
        //.map((language) => {
          //return this.cleanLanguage(language)
      //})
    //}
    //return flowContainer
  //}

  //cleanLanguage(language) {
    //return pick(language, ['name', 'abbreviation', 'rightToLeft', 'code'])
  //}

  handleMatchLanguage(oldLanguage) {
    const matchingNewLanguageJson = get(this.languageMappings, oldLanguage.id)
    if(matchingNewLanguageJson) {
      const matchingNewLanguage = JSON.parse(matchingNewLanguageJson)
      //we should have given validation errors long before here if flowContainer.flows[0].languages is not present
      this.flowContainer.flows[0].languages.push(matchingNewLanguage)
      this.flowJsonText = JSON.stringify(this.flowContainer, null, 2)
      this.languageMappings = omit(this.languageMappings, oldLanguage.id)
      this.missingLanguages = reject(this.missingLanguages, (language) => {
        return isEqual(language, oldLanguage)
      })
      this.validateLanguages(this.flowContainer)
    }
  }

  get flowUUID() {
    return get(this.flowContainer, 'flows[0].uuid')
  }
  get languagesMissing() {
    return !isEmpty(this.missingLanguages) 
  }
  get propertiesMissing() {
  }
  get groupsMissing() {
  }


  async handleFileUpload(event) {
    const selectedFile = event.target.files[0]

    const reader = new FileReader()

    reader.onload = (readEvent) => {
      this.flowJson = readEvent.target.result.toString()
    }

    const contents = reader.readAsText(selectedFile, "UTF-8")
  }
  //In case someone is editing a language, let's give them a second to finish before we tell them it doesn't match
  debounceHandleFlowJsonTextChange = debounce(this.handleFlowJsonTextChange, 3000)
  async handleFlowJsonTextChange(value) {
    this.flowJson = value
  }
  async handleImportFlow(route) {
    this.flowError = null
    //TODO - ensure UUIDs generated?
    //const flowContainer = await this.flow_importFlow({
    //TODO - is this flow or flow container?
      //flow: this.flow
    //})
    if(flowContainer) {
      this.$router.push(route)
    } else {
      this.flowError = 'flow-builder.problem-importing-flow'
      //TODO - hook into validation system when we have it.
    }
  }

  @flowVuexNamespace.Action flow_importFlow!: ({flow: IFlow}) => Promise<IContext>
  @Mutation configure 
  @Getter isConfigured!: boolean
  @Getter languages!: ILanguage[] 
}

export default ImportFlow 

</script>

<style lang="scss">
</style>

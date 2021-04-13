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
              <text-editor v-model="flowJson"
                v-if="flowJsonText"
                label=""
                :placeholder="'flow-builder.edit-flow-json' | trans">
              </text-editor>
            </div>

            <br>
            <label class="mt-2 no-weight">
              <input type="radio" value="paste" v-model="uploadOrPaste"> {{'flow-builder.paste-json-directly' | trans}}
            </label>
            <text-editor v-model="flowJson"
                v-if="uploadOrPaste === 'paste'"
                label=""
                :placeholder="'flow-builder.paste-flow-json' | trans">
            </text-editor>

            <div class="mt-5 float-right">
              <a :href="route('trees.editTree', {treeId: flowUUID, component: 'interaction-designer', mode: 'edit'})"
                class="btn btn-primary"
                :class="{'disabled': !flowUUID || flowError}"
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
import { forEach, isEmpty, get } from 'lodash'
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
//[
  //{
    //"id": "22",
    //"name": "English",
    //"abbreviation": "EN",
    //"orgId": "1008107874829627392",
    //"rightToLeft": false,
    //"code": null,
    //"deletedAt": null
  //},
  //{
    //"id": "23",
    //"name": "Spanish",
    //"abbreviation": "ES",
    //"orgId": "1008107874829627392",
    //"rightToLeft": false,
    //"code": null,
    //"deletedAt": null
  //}
//]
  
//[
  //{
    //"id": "22",
    //"name": "English",
    //"abbreviation": "EN",
    //"orgId": "1008107874829627392",
    //"rightToLeft": false,
    //"code": null,
    //"deletedAt": null
  //}
//]

  validationErrors = {}

  get uploadOrPaste () {
    return this.uploadOrPasteSetting
  }
  set uploadOrPaste (value) {
    if(this.uploadOrPasteSetting === 'upload' && value === 'paste') {
      this.flowJsonText = ""
    }
    this.uploadOrPasteSetting = value
  }

  get flowJson() {
    //TODO - check this is what we do elsewhere
    return this.flowJsonText
  }
  set flowJson(value) {
    this.flowJsonText = value
    //check valid json
    try {
      this.flowContainer = JSON.parse(value)
    } catch (e) {
      this.flowError = "flow-builder.invalid-json-provided"
      return
    }
    //this.checkIfValidFlow(this.flow) //TODO - what should we use here?
    if(!this.checkSingleFlowOnly(this.flowContainer)) {
      this.flowError = 'flow-builder.importer-currently-supports-single-flow-only'
      return
    }
    this.validateLanguages(this.flowContainer)
    //check languages
    //check props
    //check groups
  }

  checkSingleFlowOnly(flowContainer) {
    console.log(flowContainer)
    if(flowContainer.flows.length !== 1) {
      return false
    }
    return true
  }

  validateLanguages(flowContainer) {
    const missingLanguages = []
    const matchingLanguages = []
    const existingLanguagesWithoutMatch = cloneDeep(this.languages)
    get(flowContainer, 'flows[0].languages', []).forEach((language) => {
      if(!includes(this.languages, language)) {
        missingLanguages.push(language)
      } else {
        matchingLanguages.push(language)
      }
      const existingLanguagesWithoutMatch = differenceWith(this.languages, matchingLanguages, isEqual);
    })
  }

  get flowUUID() {
    return get(this.flowContainer, 'flows[0].uuid')
  }

  async handleFileUpload(event) {
    const selectedFile = event.target.files[0]

    const reader = new FileReader()

    reader.onload = (readEvent) => {
      this.flowJson = readEvent.target.result.toString()
    }

    const contents = reader.readAsText(selectedFile, "UTF-8")
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

  flowError = null;

  @flowVuexNamespace.Action flow_importFlow!: ({flow: IFlow}) => Promise<IContext>
  @Mutation configure 
  @Getter isConfigured!: boolean
  @Getter languages!: ILanguage[] 
}

export default ImportFlow 

</script>

<style lang="scss">
</style>

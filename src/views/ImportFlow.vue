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
            <label class="mt-2 no-weight">
              <input type="radio" value="paste" v-model="uploadOrPaste"> {{'flow-builder.paste-json-directly' | trans}}
            </label>
            <text-editor v-model="flowJson"
                v-if="uploadOrPaste === 'paste'"
                :placeholder="'flow-builder.paste-flow-json' | trans">
            </text-editor>

            <div class="mt-5 float-right">
              <a :href="route('trees.editTree', {treeId: flowUUID, component: 'interaction-designer', mode: 'edit'})"
                class="btn btn-primary"
                :class="{'disabled': !flowUUID}"
                @click.prevent="handleImportFlow(route('trees.editTree', {treeId: flowUUID, component: 'interaction-designer', mode: 'edit'}))">
                {{'flow-builder.save-and-continue' | trans}}
              </a>
            </div>
            //cancel button - router link bank or home is default
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
  },
)
class ImportFlow extends Vue {
  @Prop({default: () => ({})}) readonly appConfig!: object
  @Prop({default: () => ({})}) readonly builderConfig!: object

  flow = null
  uploadOrPasteSetting = "upload"
  flowJsonText = ""

  get uploadOrPaste () {
    return this.uploadOrPasteSetting
  }
  set uploadOrPaste (value) {
    this.uploadOrPasteSetting = value
  }

  get flowJson() {
    //TODO - check this is what we do elsewhere
    return this.flowJsonText
  }
  set flowJson(value) {
    this.flowJsonText = value
  }

  get flowUUID() {
    return get(this.flow, 'uuid')
  }

  async handleImportFlow(route) {
    this.flowError = null
    const flowContainer = await this.flow_importFlow({
      flow: this.flow
    })
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
}

export default ImportFlow 

</script>

<style lang="scss">
</style>

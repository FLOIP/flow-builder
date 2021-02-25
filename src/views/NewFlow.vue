<template>
  <div class="new-contents">
    <div class="row">
      <div class="col-sm-8 offset-sm-2">
        <div class="card">
          <div class="card-body">
            <flow-editor :flow="activeFlow" flow-header="flow-builder.create-flow" :sidebar=false />
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label>Title</label>
                  <input type="text" placeholder="Untitled Tree" name="details[title]" class="form-control form-control-lg">
                </div>
                <div class="form-group">
                  <label>Description</label>
                  <textarea data-custom-data-field="description" rows="2" name="details[description]" class="form-control"></textarea>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label style="margin-bottom: 0px;">
                    Languages
                  </label>
                  <div class="form-check">
                    <label class="form-check-label">
                      <input type="checkbox" name="details[enabledLanguages][]" value="" checked="checked" class="form-check-input">
                      English
                      <div role="alert" class="alert alert-warning collapse">
                        At least one language must be checked.
                      </div>
                    </label>
                  </div>
                  <div class="form-check">
                    <label class="form-check-label">
                      <input type="checkbox" name="details[enabledLanguages][]" value="" class="form-check-input">
                      french
                      <div role="alert" class="alert alert-warning collapse">
                        At least one language must be checked.
                      </div>
                    </label>
                  </div>
                  <div class="form-check">
                    <label class="form-check-label">
                      <input type="checkbox" name="details[enabledLanguages][]" value="" class="form-check-input">
                      other
                      <div role="alert" class="alert alert-warning collapse">
                        At least one language must be checked.
                      </div>
                    </label>
                  </div>
                  <div class="form-check">
                    <label class="form-check-label">
                      <input type="checkbox" name="details[enabledLanguages][]" value="" class="form-check-input">
                      French
                      <div role="alert" class="alert alert-warning collapse">
                        At least one language must be checked.
                      </div>
                    </label>
                  </div>
                  <div class="form-check">
                    <label class="form-check-label">
                      <input type="checkbox" name="details[enabledLanguages][]" value="" class="form-check-input">
                      English
                      <div role="alert" class="alert alert-warning collapse">
                        At least one language must be checked.
                      </div>
                    </label>
                  </div>
                </div>
                <div class="form-group">
                  <label>Content type</label>
                  <div>
                    <label style="padding-right: 10px;">
                      <input type="checkbox" name="details[hasVoice]" value="" checked="checked">
                      Voice
                    </label>
                    <label style="padding-right: 10px;">
                      <input type="checkbox" name="details[hasSms]" value="">
                      SMS
                    </label>
                    <label style="padding-right: 10px;">
                      <input type="checkbox" name="details[hasUssd]" value="">
                      USSD
                    </label>
                    <label style="padding-right: 10px;">
                      <input type="checkbox" name="details[hasSocial]" value="">
                      Social messaging
                    </label>
                    <label style="padding-right: 10px;">
                      <input type="checkbox" name="details[hasClipboard]" value="">
                      Clipboard
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="float-right">
              <router-link to="/trees/1/interaction-designer/edit"
                           class="btn btn-primary">
                {{trans('flow-builder.save-and-continue')}}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import FlowEditor from '@/components/interaction-designer/flow-editors/FlowEditor.vue'
import lang from '@/lib/filters/lang'
import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import {Mutation, namespace} from 'vuex-class'
import lodash, {forEach, invoke} from 'lodash'
import {store} from '@/store'
const flowVuexNamespace = namespace('flow')

@Component<any>(
  {
    components: {
      FlowEditor,
    },
    mixins: [lang],
    async mounted() {
        await this.flow_addBlankFlow()
    },
    async created() {
      const {$store} = this

      forEach(store.modules, (v, k) =>
        !$store.hasModule(k) && $store.registerModule(k, v))

      this.configure({appConfig: this.appConfig, builderConfig: this.builderConfig});
    },
  },
)
class NewFlow extends Vue {
  @flowVuexNamespace.Action flow_addBlankFlow!: Promise<IFlow>
  @flowVuexNamespace.Getter activeFlow!: IFlow
  @Mutation configure 
}

export default NewFlow

</script>

<style lang="scss">
</style>

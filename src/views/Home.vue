<template>
  <div class="bg-light home-contents">
    <div class="container pt-5 bg-light">
      <div class="row">
        <div class="offset-2 col-8">
          <div class="card-deck mb-3">
            <div class="card mb-4 box-shadow">
              <div class="card-body">
                <h3>{{'flow-builder.flow-builder' | trans}}</h3>
                <div class="row mt-4 mb-5">
                  <div class="col-sm-5 border-right">
                    <div class="d-flex h-100 text-center">
                      <div class="cover-container d-flex w-100 h-100 mx-auto flex-column">
                        <main class="px-3">
                          <router-link
                            :to="route('flows.newFlow')"
                            title="trans('flow-builder.new-flow')"
                            class="btn btn-outline-secondary mr-2 active">
                            {{ 'flow-builder.new-flow' | trans }}
                          </router-link>
                          <div class="mt-4">
                            <router-link
                              :to="route('flows.importFlow')"
                              :title="trans('flow-builder.import-flow')"
                              class="mt-3 mr-2 active">
                              {{ 'flow-builder.import-flow' | trans }}
                            </router-link>
                          </div>
                          <div class="mt-4">
                            <h2>Existing Flows</h2>
                            <div v-for="flow in flows">
                              <router-link
                                :to="route('trees.editTree', {treeId: flow.uuid, component: 'interaction-designer', mode: 'edit'})"
                                title="trans('flow-builder.edit-flow')"
                                class="mt-3 btn btn-outline-secondary mr-2 active">
                                {{ flow.label || flow.uuid }}
                              </router-link>
                            </div>
                          </div>
                          <div class="mt-4">
                            <a
                              href="https://github.com/FLOIP/flow-builder"
                              :title="trans('flow-builder.flow-builder-documentation')"
                              class="mt-3 mr-2 active">
                              {{ 'flow-builder.flow-builder-documentation' | trans }}
                            </a>
                          </div>
                        </main>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-7">
                    <p>
                      The Community Flow Builder is an open-source reference front end application that can be used independently or embedded within web applications, to author and export Flow Content - compliant flow definitions. It provides a drag and drop environment for designing Flow Content. It is licensed under the permissive BSD license for ease of embedding in both commercial and open source applications.
                    </p>
                    <p>
                      The Community Flow Builder is an open-source reference front end application that can be used independently or embedded within web applications, to author and export Flow Content - compliant flow definitions.
                    </p>
                    <p>
                      For more information, please visit: <a href="https://flowinterop.org/">https://flowinterop.org/</a> and Flow Specification. <a href="#" @click="">Less</a>
                    </p>
                    <p>
                      Join the Flow Interoperability Community on Slack
                      <a href="https://flowinteroperability.slack.com">flowinteroperability.slack.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {lang} from '@/lib/filters/lang'
import Routes from '@/lib/mixins/Routes'
import {Component, Prop} from 'vue-property-decorator'
import Vue from 'vue'
import {forEach, isEmpty} from 'lodash'
import {store} from '@/store'
import {Getter, Mutation, namespace} from 'vuex-class'
import {IFlow} from '@floip/flow-runner'

const flowVuexNamespace = namespace('flow')

@Component(
  {
    mixins: [lang, Routes],
  },
)
class Home extends Vue {
  @Prop({default: () => ({})}) readonly appConfig!: object
  @Prop({default: () => ({})}) readonly builderConfig!: object

  @flowVuexNamespace.State flows!: IFlow[]
  @Mutation configure!: ({appConfig, builderConfig}: { appConfig: object, builderConfig: object }) => void
  @Getter isConfigured!: boolean

  async created() {
    const {$store} = this

    forEach(store.modules, (v, k) =>
      !$store.hasModule(k) && $store.registerModule(k, v))

    if ((!isEmpty(this.appConfig) && !isEmpty(this.builderConfig)) || !this.isConfigured) {
      this.configure({appConfig: this.appConfig, builderConfig: this.builderConfig})
    }
  }
}

export default Home

</script>
<style lang="scss">
</style>

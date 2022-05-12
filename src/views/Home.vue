<template>
  <div class="bg-light home">
    <div class="container pt-5 bg-light">
      <div class="row">
        <div class="offset-1 col-10">
          <div class="card-deck mb-3">
            <div class="card mb-4 box-shadow">
              <div class="card-body">
                <h3>{{ 'flow-builder.flow-builder' | trans }}</h3>
                <div class="row mt-5 mb-5">
                  <div class="col-sm-5 border-right">
                    <div class="d-flex h-100 text-center">
                      <div class="cover-container d-flex w-100 h-100 mx-auto flex-column">
                        <main class="px-3">
                          <router-link
                            :to="route('flows.newFlow')"
                            :title="trans('flow-builder.create-flow')"
                            class="btn btn-primary mr-2">
                            {{ 'flow-builder.create-flow' | trans }}
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
                            <language-adder v-slot="scope">
                              <button
                                class="btn btn-outline-primary"
                                @click="scope.showAddLanguageModal">
                                {{ 'flow-builder.add-language' | trans }}
                              </button>
                            </language-adder>
                          </div>
                          <div class="mt-4">
                            <h4 v-if="!!flows.length">
                              {{ 'flow-builder.existing-flows' | trans }}:
                            </h4>
                            <div
                              v-for="flow in flows"
                              :key="flow.uuid">
                              <router-link
                                :to="route('flows.editFlow', {flowId: flow.uuid, component: 'designer', mode: 'edit'})"
                                :title="trans('flow-builder.flow-details')"
                                class="mt-3 btn btn-outline-secondary mr-2 active">
                                {{ flow.label || flow.uuid }}
                              </router-link>
                            </div>
                          </div>
                        </main>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-7">
                    <p>
                      <span>
                        {{ 'flow-builder.flow-builder-info-1' | trans }}
                      </span>
                      <span>
                        <a
                          :class="{'d-none': !isExtraContentHidden}"
                          class="blue-link"
                          href="#"
                          @click="showExtraContent">{{ 'flow-builder.learn-more' | trans }}</a>
                      </span>
                      <span
                        ref="extra-content-1"
                        :class="{'d-none': isExtraContentHidden}">
                        {{ 'flow-builder.flow-builder-info-2' | trans }}
                      </span>
                    </p>
                    <p
                      ref="extra-content-2"
                      :class="{'d-none': isExtraContentHidden}">
                      <span>{{ 'flow-builder.flow-builder-info-3-pt-1' | trans }}</span>
                      <b><a href="https://flowinterop.org/">https://flowinterop.org/</a></b>
                      <span>{{ 'flow-builder.flow-builder-info-3-pt-2' | trans }}</span>
                      <a
                        href="#"
                        class="blue-link"
                        @click="hideExtraContent">{{ 'flow-builder.less' | trans }}</a>
                    </p>
                    <p>
                      <b>
                        <a
                          href="https://github.com/FLOIP/flow-builder"
                          :title="trans('flow-builder.flow-builder-documentation')"
                          class="mt-3 mr-2 active">
                          {{ 'flow-builder.flow-builder-documentation' | trans }}
                        </a>
                      </b>
                    </p>
                    <p>
                      {{ 'flow-builder.flow-builder-info-4' | trans }}
                      <b><a href="https://flowinteroperability.slack.com">flowinteroperability.slack.com</a></b>
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
import Lang from '@/lib/filters/lang'
import Routes from '@/lib/mixins/Routes'
import {Component, Prop} from 'vue-property-decorator'
import {forEach, isEmpty} from 'lodash'
import {mixins} from 'vue-class-component'
import {store} from '@/store'
import {Getter, Mutation, namespace} from 'vuex-class'
import {IFlow} from '@floip/flow-runner'

const flowVuexNamespace = namespace('flow')

@Component({})
class Home extends mixins(Lang, Routes) {
  @Prop({default: () => ({})}) readonly appConfig!: object
  @Prop({default: () => ({})}) readonly builderConfig!: object

  isExtraContentHidden = true

  showExtraContent(e: KeyboardEvent): void {
    e.preventDefault()
    this.isExtraContentHidden = false
  }

  hideExtraContent(e: KeyboardEvent): void {
    e.preventDefault()
    this.isExtraContentHidden = true
  }

  @flowVuexNamespace.State flows!: IFlow[]
  @Mutation configure!: ({appConfig, builderConfig}: { appConfig: object, builderConfig: object }) => void
  @Getter isConfigured!: boolean

  async beforeCreate(): Promise<void> {
    const {$store} = this

    forEach(store.modules, (v, k) => !$store.hasModule(k) && $store.registerModule(k, v))
  }

  async created(): Promise<void> {
    if ((!isEmpty(this.appConfig) && !isEmpty(this.builderConfig)) || !this.isConfigured) {
      this.configure({appConfig: this.appConfig, builderConfig: this.builderConfig})
    }
  }
}

export default Home

</script>
<style lang="scss">
  .blue-link {
    color: #007bff;
  }
  .home {
    height: 100vh;
  }
</style>

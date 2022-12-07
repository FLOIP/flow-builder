<template>
  <div class="new-flow">
    <div
      v-if="activeFlow"
      class="row">
      <div class="col-sm-12 m-2">
        <div class="card w-100 pb-3 bg-light">
          <div class="card-body">
            <div
              v-if="flowError"
              class="alert alert-danger"
              role="alert">
              {{ flowError | trans }}
            </div>
            <flow-editor
              :flow="activeFlow"
              :flow-header="createFlowTitle"
              :did-user-submit="didUserSubmit"
              :is-on-small-container="false" />
            <div class="float-right">
              <router-link
                :to="route('flows.cancelCreate')"
                class="btn btn-outline-secondary mr-2">
                {{ trans('flow-builder.cancel') }}
              </router-link>

              <a
                :href="route('flows.editFlow', {flowId: activeFlow.uuid, component: 'builder', mode: 'edit'})"
                class="btn btn-primary"
                @click.prevent="handlePersistFlow(route('flows.editFlow', {flowId: activeFlow.uuid, component: 'builder', mode: 'edit'}))">
                {{ 'flow-builder.create' | trans }}
              </a>
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
import {Component, Prop, Watch} from 'vue-property-decorator'
import Vue from 'vue'
import {Getter, Mutation, namespace, State} from 'vuex-class'
import {forEach, isEmpty} from 'lodash'
import {mixins} from 'vue-class-component'
import {store} from '@/store'
import {IContext, IFlow} from '@floip/flow-runner'
import {RawLocation} from 'vue-router'
import {IValidationStatus} from '@/store/validation'

const flowVuexNamespace = namespace('flow')
const validationVuexNamespace = namespace('validation')

@Component({})
class NewFlow extends mixins(Lang, Routes) {
  @Prop({default: () => ({})}) readonly appConfig!: object
  @Prop({default: () => ({})}) readonly builderConfig!: object

  didUserSubmit = false

  @Watch('activeFlow', {deep: true, immediate: true})
  async onActiveFlowChanged(newFlow: IFlow): Promise<void> {
    if (Boolean(newFlow) === true) {
      console.debug('watch/activeFlow:', 'active flow has changed from new flow flow page, validating ...')
      await this.validate_flow({flow: newFlow})
    }
  }

  get createFlowTitle(): string {
    if (this.hasCreateFlowTitle) {
      return 'flow-builder.create-flow'
    }
    return ''
  }

  async mounted(): Promise<void> {
    await this.flow_addBlankFlow()
  }

  async beforeCreate(): Promise<void> {
    const {$store} = this

    forEach(store.modules, (v, k) => !$store.hasModule(k) && $store.registerModule(k, v))
  }

  async created(): Promise<void> {
    if ((!isEmpty(this.appConfig) && !isEmpty(this.builderConfig)) || !this.isConfigured) {
      this.configure({appConfig: this.appConfig, builderConfig: this.builderConfig})
    }
  }

  async handlePersistFlow(route: RawLocation): Promise<void> {
    this.didUserSubmit = true
    if (!this.isActiveFlowConsideredValidOnCreationForm) {
      return
    }

    this.flowError = null
    const flowContainer = await this.flow_persist({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore TODO: Would need to switch mixins to class components to fix this - https://class-component.vuejs.org/guide/extend-and-mixins.html#mixins
      persistRoute: this.route('flows.persistFlow', {}),
      flowContainer: this.activeFlowContainer,
    })
    if (flowContainer) {
      await this.$router.push(route)
    } else {
      this.flowError = 'flow-builder.problem-creating-flow'
      //TODO - hook into validation system when we have it.
    }
  }

  flowError: string | null = null

  @State(({trees: {ui}}) => ui) ui!: any

  @Getter hasCreateFlowTitle!: boolean

  @flowVuexNamespace.Action flow_addBlankFlow!: () => Promise<IFlow>
  @flowVuexNamespace.Action flow_persist!: ({
    persistRoute,
    flowContainer,
  }: { persistRoute: any, flowContainer: IContext }) => Promise<IContext | null>
  @flowVuexNamespace.Getter activeFlow!: IFlow
  @flowVuexNamespace.Getter isActiveFlowConsideredValidOnCreationForm?: boolean
  @flowVuexNamespace.Getter activeFlowContainer!: IContext
  @Mutation configure!: ({appConfig, builderConfig}: { appConfig: object, builderConfig: object }) => void
  @Getter isConfigured!: boolean

  @validationVuexNamespace.Action validate_flow!: ({flow}: { flow: IFlow }) => Promise<IValidationStatus>
}

export default NewFlow

</script>

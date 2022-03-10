<template>
  <div class="new-flow">
    <div
      v-if="activeFlow"
      class="row">
      <div class="col-sm-8 offset-sm-2">
        <div class="card">
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
              :is-on-small-container="false" />
            <div class="float-right">
              <a
                :href="route('flows.editFlow', {flowId: activeFlow.uuid, component: 'designer', mode: 'edit'})"
                class="btn btn-primary"
                @click.prevent="handlePersistFlow(route('flows.editFlow', {flowId: activeFlow.uuid, component: 'designer', mode: 'edit'}))">
                {{ 'flow-builder.save-and-continue' | trans }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import FlowEditor from '@/components/interaction-designer/flow-editors/FlowEditor.vue'
import {lang} from '@/lib/filters/lang'
import Routes from '@/lib/mixins/Routes'
import {Component, Prop, Watch} from 'vue-property-decorator'
import Vue from 'vue'
import {Getter, Mutation, namespace} from 'vuex-class'
import {forEach, isEmpty} from 'lodash'
import {store} from '@/store'
import {IContext, IFlow} from '@floip/flow-runner'
import {RawLocation} from 'vue-router'
import {IValidationStatus} from "@/store/validation";

const flowVuexNamespace = namespace('flow')
const validationVuexNamespace = namespace('validation')

@Component(
  {
    components: {
      FlowEditor,
    },
    mixins: [lang, Routes],
  },
)
class NewFlow extends Vue {
  @Prop({default: () => ({})}) readonly appConfig!: object
  @Prop({default: () => ({})}) readonly builderConfig!: object

  @Watch('activeFlow', {deep: true, immediate: true})
  async onActiveFlowChanged(newFlow: IFlow) {
    if (newFlow) {
      console.debug('watch/activeFlow:', 'active flow has changed from new flow flow page, validating ...');
      await this.validate_flow({flow: newFlow})
    }
  }

  get createFlowTitle() {
    return this.$store.state.trees.ui.title.createFlow
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

  @flowVuexNamespace.Action flow_addBlankFlow!: () => Promise<IFlow>
  @flowVuexNamespace.Action flow_persist!: ({
    persistRoute,
    flowContainer,
  }: { persistRoute: any, flowContainer: IContext }) => Promise<IContext | null>
  @flowVuexNamespace.Getter activeFlow!: IFlow
  @flowVuexNamespace.Getter activeFlowContainer!: IContext
  @Mutation configure!: ({appConfig, builderConfig}: { appConfig: object, builderConfig: object }) => void
  @Getter isConfigured!: boolean

  @validationVuexNamespace.Action validate_flow!: ({flow}: { flow: IFlow }) => Promise<IValidationStatus>
}

export default NewFlow

</script>

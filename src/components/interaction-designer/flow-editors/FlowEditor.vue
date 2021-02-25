<template>
  <div>
    <h3 class="no-room-above">
      {{flowHeader | trans}}
    </h3>

    <div class="row">
        <div :class="{'col-12': sidebar, 'col-6': !sidebar}">
          <flow-name-editor :flow="flow"/>
          <flow-label-editor :flow="flow"/>
          <flow-interaction-timeout-editor :flow="flow"/>
        </div>
        <div :class="{'col-12': sidebar, 'col-6': !sidebar}">
          <flow-languages-editor :flow="flow" @commitFlowLanguagesChange="updateFlowLanguages"/>
          <flow-modes-editor :flow="flow" @commitFlowModesChange="updateFlowModes"/>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component, Prop} from 'vue-property-decorator'
  import {IFlow} from '@floip/flow-runner'
  import FlowNameEditor from './NameEditor.vue'
  import FlowLabelEditor from './LabelEditor.vue'
  import FlowInteractionTimeoutEditor from './InteractionTimeoutEditor.vue'
  import FlowLanguagesEditor from './LanguagesEditor.vue'
  import FlowModesEditor from './ModesEditor.vue'
  import {namespace} from 'vuex-class'
  import lang from '@/lib/filters/lang'

  const flowVuexNamespace = namespace('flow')

  @Component<any>({
      components: {
        FlowNameEditor,
        FlowLabelEditor,
        FlowInteractionTimeoutEditor,
        FlowLanguagesEditor,
        FlowModesEditor
      },
      mixins: [lang],
    }
  )
  class FlowEditor extends Vue {
    @Prop() readonly flow!: IFlow
    @Prop({default: 'flow-builder.edit-flow'}) readonly flowHeader!: string
    @Prop({default: true}) readonly sidebar!: boolean

    updateFlowLanguages(value) {
      this.flow_setLanguages({flowId: this.flow.uuid, value})
    }

    updateFlowModes(value) {
      this.flow_setSupportedMode({flowId: this.flow.uuid, value})
    }

    @flowVuexNamespace.Mutation flow_setLanguages
    @flowVuexNamespace.Mutation flow_setSupportedMode
  }

  export default FlowEditor
</script>

<template>
  <div class="form-group flow-interaction-timeout">
    <numeric-editor v-model.number="interactionTimeout"
        :is-editable="isEditable"
        :regex-numeric-filtering="'[0-9]'"
        :label="'flow-builder.Interaction-timeout' | trans"
        :placeholder="'flow-builder.enter-value' | trans">
    </numeric-editor>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component, Prop} from 'vue-property-decorator'
  import {IFlow} from '@floip/flow-runner'
  import NumericEditor from '@/components/common/NumericEditor'
  import {namespace} from 'vuex-class'
  import lang from '@/lib/filters/lang'

  const flowVuexNamespace = namespace('flow')

  @Component<any>({
    components: {
      NumericEditor,
    },
    mixins: [lang],
  })
  class InteractionTimeoutEditor extends Vue {
    @Prop({default: true}) readonly isEditable!: boolean
    @Prop() readonly flow!: IFlow

    get interactionTimeout(): number {
      return this.flow.interactionTimeout || ''
    }

    set interactionTimeout(value: number) {
      this.flow_setInteractionTimeout({flowId:this.flow.uuid, value})
    }

    @flowVuexNamespace.Mutation flow_setInteractionTimeout
  }

  export default InteractionTimeoutEditor
</script>

<template>
  <div class="form-group flow-interaction-timeout">
    <numeric-editor v-model.number="interactionTimeout"
        :regex-numeric-filtering="'[0-9]'"
        :label="'flow-builder.Interaction-timeout' | trans"
        :placeholder="'flow-builder.enter-value' | trans">
    </numeric-editor>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { IFlow } from '@floip/flow-runner'
import NumericEditor from '@/components/common/NumericEditor.vue'
import { namespace } from 'vuex-class'
import Lang from '@/lib/filters/lang'
import { mixins } from "vue-class-component";

const flowVuexNamespace = namespace('flow')

@Component({
  components: {
    NumericEditor,
  },
})
class InteractionTimeoutEditor extends mixins(Lang) {
    @Prop() readonly flow!: IFlow

    get interactionTimeout(): number {
      // 30 comes from src/store/flow/flow.ts
      return this.flow.interactionTimeout || 30
    }

    set interactionTimeout(value: number) {
      this.flow_setInteractionTimeout({ flowId: this.flow.uuid, value })
    }

    @flowVuexNamespace.Mutation flow_setInteractionTimeout!: ({ flowId, value }: { flowId: IFlow['uuid']; value: IFlow['interactionTimeout']}) => void
  }

export default InteractionTimeoutEditor
</script>

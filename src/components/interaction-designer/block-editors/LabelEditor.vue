<template>
  <validation-message :message-key="`block/${block.uuid}/.label`" #input-control="{ isValid }">
    <div class="block-label">
      <text-editor v-model="label"
                   :label="'flow-builder.block-label' | trans"
                   :placeholder="'flow-builder.enter-block-label' | trans"
                   :validationState="!isValid"/>
    </div>
  </validation-message>
</template>

<script lang="ts">
import TextEditor from '@/components/common/TextEditor.vue'
import Lang from '@/lib/filters/lang'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IBlock } from '@floip/flow-runner'
import { namespace } from 'vuex-class'
import { mixins } from "vue-class-component";
import ValidationMessage from '@/components/common/ValidationMessage.vue';

const flowVuexNamespace = namespace('flow')

@Component({
  components: {
    TextEditor,
    ValidationMessage
  },
})
export default class LabelEditor extends mixins(Lang) {
  @Prop() block!: IBlock

  get label(): IBlock['label'] {
    return this.block.label
  }

  set label(value: IBlock['label']) {
    this.block_setLabel({ blockId: this.block.uuid, value })
  }

  @flowVuexNamespace.Mutation block_setLabel!: ({ blockId, value }: { blockId: IBlock['uuid'], value: IBlock['label'] }) => void
}
</script>

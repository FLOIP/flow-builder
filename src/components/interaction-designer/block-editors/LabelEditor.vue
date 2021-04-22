<template>
  <div class="block-label">
    <text-editor v-model="label"
                 :label="'flow-builder.block-label' | trans"
                 :placeholder="'flow-builder.enter-block-label' | trans"
                 :validationState="validationState"/>
  </div>
</template>

<script lang="ts">
import TextEditor from '@/components/common/TextEditor.vue'
import Lang from '@/lib/filters/lang'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IBlock } from '@floip/flow-runner'
import { namespace } from 'vuex-class'
import { mixins } from "vue-class-component";

const flowVuexNamespace = namespace('flow')

@Component({
  components: {
    TextEditor,
  },
})
export default class LabelEditor extends mixins(Lang) {
  @Prop() block!: IBlock
  @Prop() validationState?: boolean

  get label(): IBlock['label'] {
    return this.block.label
  }

  set label(value: IBlock['label']) {
    this.block_setLabel({ blockId: this.block.uuid, value })
  }

  @flowVuexNamespace.Mutation block_setLabel!: ({ blockId, value }: { blockId: IBlock['uuid'], value: IBlock['label'] }) => void
}
</script>

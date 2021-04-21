<template>
  <div class="block-label">
    <text-editor v-model="label"
        :label="'flow-builder.block-label' | trans"
        :placeholder="'flow-builder.enter-block-label' | trans"/>
  </div>
</template>

<script lang="ts">
import TextEditor from '@/components/common/TextEditor.vue'
import lang from '@/lib/filters/lang'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IBlock } from '@floip/flow-runner'
import { namespace } from 'vuex-class'

const flowVuexNamespace = namespace('flow')

@Component({
  components: {
    TextEditor,
  },
  mixins: [lang],
})
export default class LabelEditor extends Vue {
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

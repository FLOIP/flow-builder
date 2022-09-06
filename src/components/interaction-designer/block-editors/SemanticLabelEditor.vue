<template>
  <validation-message
    :message-key="`block/${block.uuid}/semantic_label`">
    <template #input-control="{ isValid }">
      <div class="semantic-label-editor">
        <text-editor
          v-model="semanticLabel"
          :label="trans('flow-builder.block-exit-semantic-label')"
          :placeholder="trans('flow-builder.enter-block-semantic-label')"
          :valid-state="isValid" />
      </div>
    </template>
  </validation-message>
</template>

<script lang="ts">
import {mixins, Options} from 'vue-class-component'
import {namespace} from 'vuex-class'
import {Prop} from 'vue-property-decorator'
import {IBlock} from '@floip/flow-runner'
import {Lang} from '@/lib/filters/lang'

const flowVuexNamespace = namespace('flow')

@Options({})
export class SemanticLabelEditor extends mixins(Lang) {
  @Prop({type: Object, required: true}) readonly block!: IBlock

  get semanticLabel(): IBlock['semantic_label'] {
    return this.block.semantic_label ?? ''
  }

  set semanticLabel(value: IBlock['semantic_label']) {
    this.block_setSemanticLabel({blockId: this.block.uuid, value})
  }

  @flowVuexNamespace.Mutation block_setSemanticLabel!:
    ({blockId, value}: {blockId: IBlock['uuid'], value: IBlock['semantic_label']}) => void
}

export default SemanticLabelEditor
</script>

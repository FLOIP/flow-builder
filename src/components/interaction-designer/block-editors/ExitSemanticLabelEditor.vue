<template>
  <div class="exit-semantic-label-editor">
    <text-editor
      v-model="semanticLabel"
      :is-editable="isEditable"
      :label="trans('flow-builder.block-exit-semantic-label')"
      :placeholder="trans('flow-builder.enter-block-exit-semantic-label')" />
  </div>
</template>

<script lang="ts">
import {mixins, Options} from 'vue-class-component'
import {Prop} from 'vue-property-decorator'
import {Lang} from '@/lib/filters/lang'
import {IBlockExit} from '@floip/flow-runner'

@Options({})
export class ExitSemanticLabelEditor extends mixins(Lang) {
  @Prop({type: Boolean, default: true}) readonly isEditable!: boolean
  @Prop({type: Object, required: true}) readonly exit!: IBlockExit

  get semanticLabel(): string {
    return this.exit.semantic_label ?? ''
  }

  set semanticLabel(value: string) {
    this.exit.semantic_label = value
    this.$emit('commitSemanticLabel', value)
  }
}

export default ExitSemanticLabelEditor
</script>

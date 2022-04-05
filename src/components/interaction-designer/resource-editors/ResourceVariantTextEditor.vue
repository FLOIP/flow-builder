<template>
  <validation-message
    #input-control="{ isValid }"
    :message-key="`resource/${resourceId}/values/${index}/value`">
    <div class="resource-variant-text-editor">
      <expression-input
        ref="input"
        :label="label"
        :placeholder="placeholder || `flow-builder.enter-${resourceVariant.modes[0].replace('_', '-').toLowerCase()}-content` | trans"
        :current-expression="content"
        :rows="rows"
        @commitExpressionChange="commitExpressionChange" />
    </div>
  </validation-message>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'
import Lang from '@/lib/filters/lang'
import {IResource, IResourceValue} from '@floip/flow-runner'
import {namespace} from 'vuex-class'
import ExpressionInput from '@/components/common/ExpressionInput.vue'

const flowVuexNamespace = namespace('flow')

@Component({
  components: {ExpressionInput},
})
class AdvancedExitEditor extends mixins(Lang) {
  @Prop({default: null}) readonly index!: number
  @Prop() readonly resourceId!: IResource['uuid']
  @Prop({default: ''}) readonly label!: string
  @Prop() readonly placeholder!: string
  @Prop() readonly resourceVariant!: IResourceValue
  @Prop() readonly mode!: string
  @Prop({default: 2}) readonly rows!: number

  get content(): string {
    return this.resourceVariant.value
  }

  commitExpressionChange(value: string): void {
    const {resourceId, mode, resourceVariant} = this
    const {language_id: languageId, content_type: contentType} = resourceVariant

    this.$emit('beforeResourceVariantChanged', {variant: resourceVariant, resourceId})
    this.resource_setOrCreateValueModeSpecific({
      resourceId,
      filter: {language_id: languageId, content_type: contentType, modes: [mode]},
      value,
    })
    this.$emit('afterResourceVariantChanged', {variant: resourceVariant, resourceId})
  }

  @flowVuexNamespace.Action resource_setOrCreateValueModeSpecific!:
    ({resourceId, filter, value}: { resourceId: IResource['uuid'], filter: {}, value: string }) => void
}

export default AdvancedExitEditor
</script>

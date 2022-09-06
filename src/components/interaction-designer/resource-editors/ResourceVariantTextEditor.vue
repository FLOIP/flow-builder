<template>
  <validation-message
    :message-key="`resource/${resourceId}/values/${index}/value`">
    <template #input-control="{ isValid }">
      <div class="resource-variant-text-editor">
        <expression-input
          ref="input"
          :label="label"
          :placeholder="placeholder || `flow-builder.enter-${resourceVariant.modes[0].replace('_', '-').toLowerCase()}-content` | trans"
          :current-expression="content"
          :rows="rows"
          :valid-state="isValid"
          @commitExpressionChange="commitExpressionChange" />
      </div>
    </template>
  </validation-message>
</template>

<script lang="ts">
import {Prop} from 'vue-property-decorator'
import {mixins, Options} from 'vue-class-component'
import {Lang} from '@/lib/filters/lang'
import {IResource, IResourceValue} from '@floip/flow-runner'
import {namespace} from 'vuex-class'
import ExpressionInput from '@/components/common/ExpressionInput.vue'
import {SupportedMode} from '@floip/flow-runner/src/flow-spec/SupportedMode'

const flowVuexNamespace = namespace('flow')

@Options({
  components: {ExpressionInput},
})
export class ResourceVariantTextEditor extends mixins(Lang) {
  @Prop({default: null}) readonly index!: number
  @Prop() readonly resourceId!: IResource['uuid']
  @Prop({default: ''}) readonly label!: string
  @Prop() readonly placeholder!: string
  @Prop() readonly resourceVariant!: IResourceValue
  @Prop() readonly mode!: SupportedMode
  @Prop({default: 2}) readonly rows!: number

  get content(): string {
    return this.resourceVariant.value
  }

  commitExpressionChange(value: string): void {
    const {resourceId, mode, resourceVariant} = this
    const {language_id: languageId, content_type: contentType, mime_type: mimeType} = resourceVariant

    const filter: Partial<IResourceValue> = {
      language_id: languageId,
      content_type: contentType,
      modes: [mode],
    }

    if (mimeType !== undefined) {
      filter.mime_type = mimeType
    }

    this.$emit('beforeResourceVariantChanged', {variant: resourceVariant, resourceId})
    this.resource_setOrCreateValueModeSpecific({
      resourceId,
      filter,
      value,
    })
    this.$emit('afterResourceVariantChanged', {variant: resourceVariant, resourceId})
  }

  @flowVuexNamespace.Action resource_setOrCreateValueModeSpecific!:
    ({resourceId, filter, value}: { resourceId: IResource['uuid'], filter: {}, value: string }) => void
}

export default ResourceVariantTextEditor
</script>

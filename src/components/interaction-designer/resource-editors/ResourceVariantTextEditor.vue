<template>
  <div class="resource-variant-text-editor mb-0">
    <validation-message :message-key="`resource/${resourceId}/values/${index}/value`">
      <template #input-control="{ isValid }">
        <expression-input
          ref="input"
          :label="label"
          :prepend-text="prependText"
          :placeholder="pPlaceholder"
          :current-expression="content"
          :rows="rows"
          :valid-state="isValid"
          :disabled-auto-complete="disabledAutoComplete"
          class="mb-0"
          @commitExpressionChange="commitExpressionChange" />
        <div
          v-if="isSms || isUssd"
          class="content-length-info">
          {{ contentLengthInfo }}
        </div>
      </template>
    </validation-message>
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'
import Lang from '@/lib/filters/lang'
import {IResource, IResourceValue} from '@floip/flow-runner'
import {namespace} from 'vuex-class'
import ExpressionInput from '@/components/common/ExpressionInput.vue'
import {SupportedMode} from '@floip/flow-runner/src/flow-spec/SupportedMode'

const flowVuexNamespace = namespace('flow')

@Component({
  components: {ExpressionInput},
})
export class ResourceVariantTextEditor extends mixins(Lang) {
  @Prop({default: null}) readonly index!: number
  @Prop() readonly resourceId!: IResource['uuid']
  @Prop({default: ''}) readonly label!: string
  @Prop({type: String, default: ''}) readonly prependText!: string
  @Prop() readonly placeholder: string
  @Prop() readonly resourceVariant!: IResourceValue
  @Prop() readonly mode: SupportedMode
  @Prop({default: 2}) readonly rows!: number
  @Prop({type: Boolean, default: false}) readonly disabledAutoComplete!: boolean

  get pPlaceholder(): string {
    return this.placeholder || this.trans(`flow-builder.enter-${this.mode.toLowerCase()}-content`)
  }

  get content(): string {
    return this.resourceVariant.value
  }

  get contentLengthInfo(): string {
    const charCount = this.content.length
    const smsPagesCount = Math.ceil(this.content.length / 160)

    if (smsPagesCount > 1 && this.isSms) {
      return this.trans('flow-builder.x-characters-y-pages', {charCount, smsPagesCount})
    } else {
      return this.trans('flow-builder.x-characters', {charCount})
    }
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

    this.$emit('beforeResourceVariantChanged', {variant: resourceVariant, resourceId, value})
    this.resource_setOrCreateValueModeSpecific({
      resourceId,
      filter,
      value,
    })
    this.$emit('afterResourceVariantChanged', {variant: resourceVariant, resourceId, value})
  }

  get isSms(): boolean {
    return this.mode === SupportedMode.SMS
  }

  get isUssd(): boolean {
    return this.mode === SupportedMode.USSD
  }

  @flowVuexNamespace.Action resource_setOrCreateValueModeSpecific!:
    ({resourceId, filter, value}: { resourceId: IResource['uuid'], filter: {}, value: string }) => void
}

export default ResourceVariantTextEditor
</script>

<style scoped lang="scss">
@import "../../../scss/custom_variables";
.content-length-info {
  color: $neutral-900;
}
</style>

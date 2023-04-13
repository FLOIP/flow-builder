<template>
  <div class="resource-variant-text-editor mb-0">
    <validation-message :message-key="`resource/${resourceId}/values/${index}/value`">
      <template #input-control="{ isValid }">
        <expression-input
          ref="input"
          :label="label"
          :prepend-text="prependText"
          :placeholder="placeholder || defaultPlaceholder"
          :current-expression="content"
          :rows="rows"
          :valid-state="isValid"
          :disabled-auto-complete="disabledAutoComplete"
          class="mb-0"
          @commitExpressionChange="commitExpressionChange" />
        <div
          v-if="isSms || isUssd"
          class="content-length-info"
          :class="{'font-weight-bold': isSms && smsCharInfo.bytes > 0}">
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
// noinspection TypeScriptCheckImport
import SplitSms from 'split-sms'
import ExpressionInput from '@/components/common/ExpressionInput.vue'
import {SupportedMode} from '@floip/flow-runner/src/flow-spec/SupportedMode'

const flowVuexNamespace = namespace('flow')

type SplitSmsResult = {
  characterSet: 'GSM' | 'Unicode',
  parts: {
    content: undefined | string,
    length: number,
    bytes: number,
  }[],
  bytes: number,
  length: number,
  remainingInPart: number,
}

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

  get defaultPlaceholder(): string {
    return this.trans(`flow-builder.enter-${this.mode.toLowerCase()}-content`)
  }

  get content(): string {
    return this.resourceVariant.value
  }

  get contentLengthInfo(): string {
    const charCount = this.smsCharInfo.bytes
    const isUnicode = this.smsCharInfo.characterSet === 'Unicode'
    const smsPagesCount = this.smsCharInfo.parts.length

    const charInfo = this.trans('flow-builder.x-characters', {charCount})
    const pagesInfo = isUnicode
      ? this.trans('flow-builder.x-unicode-pages', {smsPagesCount})
      : this.trans('flow-builder.x-pages', {smsPagesCount})

    if (this.isSms && smsPagesCount > 1) {
      return `${charInfo} (${pagesInfo})`
    } else {
      return charInfo
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

  get smsCharInfo(): SplitSmsResult {
    return SplitSms.split(this.content)
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

<template>
  <div
    :id="messageKey"
    class="validation-message form-group">
    <slot
      name="input-control"
      :isValid="isValid" />
    <small
      v-if="!shouldHideValidation"
      class="text-danger">
      {{ errorMessage }}
    </small>
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'
import Lang from '@/lib/filters/lang'
import {BAlert} from 'bootstrap-vue'
import {namespace} from 'vuex-class'
import {IIndexedString} from '@/store/validation'

const validationVuexNamespace = namespace('validation')

@Component({
  components: {
    BAlert,
  },
})
export class ValidationMessage extends mixins(Lang) {
  @Prop() messageKey!: string
  @Prop({default: false}) shouldHideValidation!: boolean
  @Prop() readonly overrides?: Record<string, string>

  get errorMessage(): string {
    // get value by property (not by path like with lodash.get()), as the messageKey can contain `.` chars
    if (!Object.prototype.hasOwnProperty.call(this.flattenErrorMessages, this.messageKey)) {
      return ''
    }

    const message = this.flattenErrorMessages[this.messageKey]

    return this.messageOverrides.has(message)
      ? this.messageOverrides.get(message)!
      : message
  }

  get messageOverrides(): Map<string, string> {
    return Object.entries(this.overrides ?? {}).reduce((map, [lookupKey, replaceKey]) => {
      map.set(
        this.trans(`flow-builder-validation.${lookupKey}`),
        this.trans(`flow-builder-validation.${replaceKey}`),
      )
      return map
    }, new Map<string, string>())
  }

  get isValid(): boolean {
    return !this.errorMessage
  }

  @validationVuexNamespace.Getter flattenErrorMessages!: IIndexedString
}

export default ValidationMessage
</script>

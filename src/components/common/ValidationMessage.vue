<template>
  <div
    :id="messageKey"
    class="validation-message form-group">
    <slot
      name="input-control"
      :isValid="isValid" />
    <small class="text-danger">{{ errorMessage }}</small>
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'
import Lang from '@/lib/filters/lang'
import {BAlert} from 'bootstrap-vue'
import {namespace} from 'vuex-class'
import {IIndexedString} from '@/store/validation'
import {ErrorObject} from 'ajv'

const validationVuexNamespace = namespace('validation')

@Component({
  components: {
    BAlert,
  },
})
class ValidationMessage extends mixins(Lang) {
  @Prop() messageKey!: string

  get errorMessage(): string {
    let ajvErrorMessage = ''
    // get value by property (not by path like with lodash.get()), as the messageKey can contain `.` chars
    if (Object.prototype.hasOwnProperty.call(this.flattenErrorMessages, this.messageKey)) {
      ajvErrorMessage = this.flattenErrorMessages[this.messageKey]
    }

    const ajvError: ErrorObject = this.validationStatusForMessageKey(this.messageKey)!
    const entity = this.messageKey.startsWith('flow') ? 'flows' : 'blocks'
    const property = ajvError.dataPath.replaceAll('/', '-')
    const validationMessageKey = `validation.${entity}.${property.substring(1)}-${ajvError.keyword}`
    let localizedValidationMessage = this.trans(`flow-builder.${validationMessageKey}`)
    if (localizedValidationMessage === `flow-builder.${validationMessageKey}`) {
      localizedValidationMessage = null
    }
    // Falling back to AJV error message in case we do not find a localized message for a key.
    return localizedValidationMessage ?? ajvErrorMessage
  }

  get isValid(): boolean {
    return !this.errorMessage
  }

  @validationVuexNamespace.Getter flattenErrorMessages!: IIndexedString
  @validationVuexNamespace.Getter validationStatusForMessageKey!: (messageKey: string) => ErrorObject | undefined
}

export default ValidationMessage
</script>

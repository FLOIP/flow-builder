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

  get errorMessage(): string | undefined {
    const ajvErrorObject = this.validationStatusForMessageKey(this.messageKey)
    if (ajvErrorObject) {
      const entity = this.messageKey.startsWith('flow') ? 'flows' : 'blocks'
      const property = ajvErrorObject.dataPath.replaceAll('/', '-')
      const validationMessageKey = `${entity}-${property.substring(1)}-${ajvErrorObject.keyword}`
      const localizedValidationMessage = this.trans(`flow-builder-validation.${validationMessageKey}`)
      if (localizedValidationMessage === `flow-builder-validation.${validationMessageKey}`) {
        console.debug(`Validation ${localizedValidationMessage} key not found in localization data`)
        return ajvErrorObject.message
      }

      return localizedValidationMessage
    }
    return ''
  }

  get isValid(): boolean {
    return !this.errorMessage
  }

  @validationVuexNamespace.Getter validationStatusForMessageKey!: (messageKey: string) => ErrorObject | undefined
}

export default ValidationMessage
</script>

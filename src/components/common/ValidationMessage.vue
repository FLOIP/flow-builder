<template>
  <div
    :id="messageKey"
    class="validation-message form-group" @mousedown="onFocusEvent">
    <slot
      name="input-control"
      :isValid="isValid" />
    <small v-if="dirtyStatusForKey(messageKey)" class="text-danger">{{ errorMessage }}</small>
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
    const ajvErrorObject: ErrorObject | undefined = this.validationStatusForMessageKey[this.messageKey]
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
    return !(this.errorMessage && this.dirtyStatusForKey(this.messageKey))
  }

  mounted() {
    this.setDirtyStatusForKey({
      messageKey: this.messageKey,
      value: false,
    })
  }

  onFocusEvent(): void {
    this.setDirtyStatusForKey({
      messageKey: this.messageKey,
      value: true,
    })
  }

  @validationVuexNamespace.Getter validationStatusForMessageKey!: {[key: string]: ErrorObject | undefined}
  @validationVuexNamespace.Getter dirtyStatusForKey!: (messageKey: string) => boolean
  @validationVuexNamespace.Action setDirtyStatusForKey!: ({messageKey, value}: {messageKey: string, value: boolean}) => void
}

export default ValidationMessage
</script>

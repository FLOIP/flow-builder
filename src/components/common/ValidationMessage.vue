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

  get errorMessage(): string {
    const ajvErrorObject = this.validationStatusForMessageKey(this.messageKey)
    if (ajvErrorObject) {
      const entity = this.messageKey.startsWith('flow') ? 'flows' : 'blocks'
      const property = ajvErrorObject.dataPath.replaceAll('/', '-')
      const validationMessageKey = `validation.${entity}.${property.substring(1)}-${ajvErrorObject.keyword}`
      let localizedValidationMessage = this.trans(`flow-builder.${validationMessageKey}`)
      if (localizedValidationMessage === `flow-builder.${validationMessageKey}`) {
        localizedValidationMessage = null
      }

      return localizedValidationMessage ?? ajvErrorObject.message
    }
    return ''
  }

  get isValid(): boolean {
    return !(this.errorMessage && this.dirtyStatusForKey(this.messageKey))
  }

  mounted() {
    this.setDirtyStatusForKey({
      key: this.messageKey,
      value: false,
    })
  }

  onFocusEvent(): void {
    this.setDirtyStatusForKey({
      messageKey: this.messageKey,
      value: true,
    })
  }

  @validationVuexNamespace.Getter validationStatusForMessageKey!: (messageKey: string) => ErrorObject | undefined
  @validationVuexNamespace.Getter dirtyStatusForKey!: (messageKey: string) => boolean
  @validationVuexNamespace.Action setDirtyStatusForKey!: ({key, value}: {messageKey: string, value: boolean}) => void
}

export default ValidationMessage
</script>

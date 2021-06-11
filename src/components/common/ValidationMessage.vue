<template>
  <div class="validation-message">
    <slot
      name="input-control"
      :isValid="isValid"
    />
    <b-alert
      variant="warning"
      fade
      :show="!isValid"
    >
      {{ errorMessage }} <a
        v-if="showFixAction"
        :href="messageKey"
        class="alert-link float-right"
      >{{ trans('flow-builder.fix-it') }}</a>
    </b-alert>
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
class ValidationMessage extends mixins(Lang) {
  @Prop() messageKey!: string
  @Prop({default: false}) showFixAction?: boolean

  get errorMessage() {
    return this.flattenErrorMessages[this.messageKey] || ''
  }

  get isValid() {
    return !this.errorMessage
  }

  @validationVuexNamespace.Getter flattenErrorMessages!: IIndexedString
}
export default ValidationMessage
</script>

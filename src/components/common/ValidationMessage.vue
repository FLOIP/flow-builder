<template>
  <div class="validation-message">
    <b-alert
      variant="warning"
      fade
      :show="shouldShowMessage"
    >
      {{ errorMessage }}
    </b-alert>
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { Lang } from "@/lib/filters/lang";
import { BAlert } from 'bootstrap-vue'
import { namespace } from "vuex-class";
import { IIndexedString } from "@/store/validation";

const validationVuexNamespace = namespace('validation')

@Component({
  components: {
    BAlert
  }
})
class ValidationMessage extends mixins(Lang) {
  @Prop() messageKey!: string
  @Prop() showFixAction?: boolean

  shouldShowMessage = true

  get errorMessage() {
    return this.indexedErrorMessages[messageKey]
  }

  @validationVuexNamespace.State indexedErrorMessages!: IIndexedString
}
export default ValidationMessage
</script>

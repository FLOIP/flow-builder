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
import {namespace} from "vuex-class";
import {IValidationStatus} from "@/store/validation";

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
    // TODO: get the message text in flowValidationStatus/blockValidationStatuses by messageKey
    return 'Lorem ipsum dolor sit amet, consectetur adipisicing elit'
  }

  @validationVuexNamespace.State flowValidationStatus!: IValidationStatus
  @validationVuexNamespace.State blockValidationStatuses!: { [key:string]: IValidationStatus }
}
export default ValidationMessage
</script>

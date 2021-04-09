<template>
  <div class="validation-message">
    <b-alert
      variant="warning"
      fade
      :show="showMessage"
    >
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad commodi,
    </b-alert>
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { Lang } from "@/lib/filters/lang";
import { BAlert } from 'bootstrap-vue'

@Component({
  components: {
    BAlert
  }
})
class ValidationMessage extends mixins(Lang) {
  @Prop() messageKey!: string
  @Prop() showFixAction?: boolean

  showMessage = true
}
export default ValidationMessage
</script>

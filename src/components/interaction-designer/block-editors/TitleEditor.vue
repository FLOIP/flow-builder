<template>
  <section class="mb-3">
    <label class="text-primary">{{'flow-builder.title' | trans}}</label>
    <validation-message
      #input-control="{ isValid: isLabelValid }"
      :message-key="`block/${block.uuid}/label`">
      <div class="d-flex">
        <input
          v-model="blockLabel"
          type="text"
          class="form-control w-100"
          :class="{ 'is-invalid': isLabelValid === false }">
        <span class="btn btn-outline-primary btn-xs align-self-center ml-2">
          <svg-icon icon="settings" />
        </span>
      </div>
    </validation-message>
  </section>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import TextEditor from '@/components/common/TextEditor.vue'
import ValidationMessage from '@/components/common/ValidationMessage.vue'
import {mixins} from 'vue-class-component'
import Lang from '@/lib/filters/lang'
import {IBlock} from '@floip/flow-runner'
import {namespace} from 'vuex-class'
import SvgIcon from '@/components/common/SvgIcon.vue'

const flowVuexNamespace = namespace('flow')

@Component({
  components: {
    TextEditor,
    ValidationMessage,
    SvgIcon,
  },
})
class TitleEditor extends mixins(Lang) {
  @Prop() readonly block!: IBlock

  get blockLabel(): string {
    return this.block.label ?? ''
  }

  set blockLabel(value: string) {
    this.block_setLabel({blockId: this.block.uuid, value})
  }

  @flowVuexNamespace.Action block_setLabel!: ({blockId, value}: {blockId: string, value: string}) => void
}
export default TitleEditor
</script>

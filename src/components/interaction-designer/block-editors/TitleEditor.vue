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
        <span
          class="btn btn-outline-primary"
          @click="editBlockName = true">
          <svg-icon icon="settings" />
        </span>
      </div>
    </validation-message>
    <div class="mt-3">
      <validation-message
        #input-control="{ isValid: isNameValid }"
        :message-key="`block/${block.uuid}/name`">
        <div v-if="editBlockName || isNameValid === false">
          <label>{{ 'flow-builder.edit-block-code' | trans }}</label>
          <div class="d-flex">
            <input
              v-model="blockName"
              type="text"
              class="form-control w-100"
              :class="{ 'is-invalid': isNameValid === false }"
              @keydown="filterName">
            <span
              class="btn btn-primary"
              @click="editBlockName = false">
              <svg-icon icon="check" />
            </span>
          </div>
        </div>
        <div v-else>
          <strong>{{'flow-builder.code' | trans}}:</strong>
          <span class="block-code"> {{ blockName }} </span>
        </div>
      </validation-message>
    </div>
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
  editBlockName = false

  @Prop() readonly block!: IBlock

  get blockLabel(): string {
    return this.block.label ?? ''
  }

  set blockLabel(value: string) {
    this.block_setLabel({blockId: this.block.uuid, value})
  }

  get blockName(): string {
    return this.block.name
  }

  set blockName(value: string) {
    this.block_setName({blockId: this.block.uuid, value})
  }

  filterName(e: KeyboardEvent): void {
    if (e.key.match(/\W+|Enter/g)) {
      e.preventDefault()
    }
  }

  @flowVuexNamespace.Action block_setLabel!: ({blockId, value}: {blockId: string, value: string}) => void
  @flowVuexNamespace.Mutation block_setName!: ({blockId, value}: {blockId: string, value: string}) => void
}
export default TitleEditor
</script>

<style scoped>
.block-code {
  word-wrap: break-word;
}
</style>

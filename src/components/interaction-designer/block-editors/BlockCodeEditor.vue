<template>
  <div class="mt-3">
    <validation-message
      #input-control="{ isValid }"
      :message-key="`block/${block.uuid}/name`">
      <div v-if="editBlockName || isValid === false">
        <label>{{ 'flow-builder.edit-block-code' | trans }}</label>
        <div class="d-flex">
          <small-text-editor
            v-model="blockName"
            class="w-100"
            :placeholder="'flow-builder.enter-block-code' | trans"
            :valid-state="isValid"
            @keydown="filterName" />
          <span
            class="btn btn-primary btn-xs align-self-center ml-2"
            @click="editBlockName = false">
            <svg-icon icon="check" />
          </span>
        </div>
      </div>
      <div v-else class="d-flex justify-content-between">
        <div class="block-code align-self-center">
          <strong>{{'flow-builder.code' | trans}}:</strong>
          <span class=""> {{ blockName }} </span>
        </div>
        <span class="btn btn-primary btn-xs align-self-baseline ml-2" @click="editBlockName = true">
          <svg-icon icon="edit" @click="editBlockName = true" />
        </span>
      </div>
    </validation-message>
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import ValidationMessage from '@/components/common/ValidationMessage.vue'
import {mixins} from 'vue-class-component'
import Lang from '@/lib/filters/lang'
import {IBlock} from '@floip/flow-runner'
import {namespace} from 'vuex-class'
import SvgIcon from '@/components/common/SvgIcon.vue'
import SmallTextEditor from '@/components/common/SmallTextEditor.vue'

const flowVuexNamespace = namespace('flow')

@Component({
  components: {
    SmallTextEditor,
    ValidationMessage,
    SvgIcon,
  },
})
class BlockCodeEditor extends mixins(Lang) {
  editBlockName = false

  @Prop() readonly block!: IBlock

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

  @flowVuexNamespace.Mutation block_setName!: ({blockId, value}: {blockId: string, value: string}) => void
}
export default BlockCodeEditor
</script>

<style scoped>
.block-code {
  word-break: break-all;
}
</style>

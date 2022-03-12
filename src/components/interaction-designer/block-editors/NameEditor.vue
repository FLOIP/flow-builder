<template>
  <div class="mt-3">
    <validation-message
      #input-control="{ isValid }"
      :message-key="`block/${block.uuid}/name`">
      <div v-if="editBlockName || isValid === false">
        <h6>{{ 'flow-builder.edit-block-code' | trans }}</h6>
        <div class="d-flex">
          <text-editor
            v-model="blockName"
            class="w-100"
            :label="''"
            :placeholder="'flow-builder.enter-block-code' | trans"
            :valid-state="isValid"
            @keydown="filterName" />
          <span
            class="btn btn-primary btn-xs align-self-center ml-2"
            @click="editBlockName = false">
            <font-awesome-icon
              :icon="['fas', 'check']"
              class="fa-btn" />
          </span>
        </div>
      </div>
      <div v-else class="d-flex justify-content-between">
        <div class="block-code align-self-center">
          <h6 class="d-inline">{{'flow-builder.code' | trans}}:</h6>
          <span> {{ blockName }} </span>
        </div>
        <span class="btn btn-primary btn-xs align-self-baseline ml-2" @click="editBlockName = true">
          <font-awesome-icon
            :icon="['far', 'edit']"
            class="fa-btn" />
        </span>
      </div>
    </validation-message>
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'
import Lang from '@/lib/filters/lang'
import {IBlock} from '@floip/flow-runner'
import {namespace} from 'vuex-class'
import {TextEditor, ValidationMessage} from '@/components/common/'

const flowVuexNamespace = namespace('flow')

@Component({
  components: {
    ValidationMessage,
    TextEditor,
  }
})
class NameEditor extends mixins(Lang) {
  editBlockName = false

  @Prop() readonly block!: IBlock

  get blockName(): IBlock['name'] {
    return this.block.name
  }

  set blockName(value: IBlock['name']) {
    this.block_setName({blockId: this.block.uuid, value})
  }

  filterName(e: KeyboardEvent): void {
    if (e.key.match(/\W+|Enter/g)) {
      e.preventDefault()
    }
  }

  @flowVuexNamespace.Mutation block_setName!: ({blockId, value}: {blockId: IBlock['uuid'], value: IBlock['name']}) => void
}
export default NameEditor
</script>

<style scoped>
.block-code {
  word-break: break-all;
}
</style>

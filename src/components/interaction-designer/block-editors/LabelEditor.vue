<template>
  <div class="label-editor">
    <section class="mb-3">
      <label class="text-primary">{{ 'flow-builder.title' | trans }}</label>
      <validation-message :message-key="`block/${block.uuid}/label`">
        <template #input-control="{ isValid }">
          <div class="d-flex">
            <text-editor
              class="w-100"
              :label="''"
              :placeholder="'flow-builder.enter-title' | trans"
              :valid-state="isValid"
              :value="blockLabel"
              @input="setBlockLabel" />
            <span
              class="btn btn-outline-primary btn-xs align-self-center ml-2"
              @click="emitGearClickedEvent">
              <font-awesome-icon
                :icon="['fac', 'settings']"
                class="fa-btn" />
            </span>
          </div>
        </template>
      </validation-message>
    </section>
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'
import Lang from '@/lib/filters/lang'
import {IBlock} from '@floip/flow-runner'
import {namespace} from 'vuex-class'

const flowVuexNamespace = namespace('flow')
const undoRedoVuexNamespace = namespace('undoRedo')

@Component
export class LabelEditor extends mixins(Lang) {
  @Prop() readonly block!: IBlock

  get blockLabel(): IBlock['label'] {
    return this.block.label
  }

  async setBlockLabel(value: IBlock['label']): Promise<void> {
    await this.block_setLabel({blockId: this.block.uuid, value})
    await this.takeSnapshot()
  }

  emitGearClickedEvent(): void {
    this.$emit('gearClicked')
  }

  @flowVuexNamespace.Action block_setLabel!: ({blockId, value}: { blockId: IBlock['uuid'], value: IBlock['label'] }) => Promise<void>
  @undoRedoVuexNamespace.Action takeSnapshot!: () => Promise<void>
}
export default LabelEditor
</script>

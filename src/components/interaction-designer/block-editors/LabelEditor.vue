<template>
  <div class="label-editor">
    <section class="mb-3">
      <label class="text-primary">{{ 'flow-builder.title' | trans }}</label>
      <validation-message
        #input-control="{ isValid }"
        :message-key="`block/${block.uuid}/label`">
        <div class="d-flex">
          <text-editor
            v-model="blockLabel"
            class="w-100"
            :label="''"
            :placeholder="'flow-builder.enter-title' | trans"
            :valid-state="isValid" />
          <span
            class="btn btn-outline-primary btn-xs align-self-center ml-2"
            @click="emitGearClickedEvent">
            <font-awesome-icon
              :icon="['fac', 'settings']"
              class="fa-btn" />
          </span>
        </div>
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

@Component
export class LabelEditor extends mixins(Lang) {
  @Prop() readonly block!: IBlock

  get blockLabel(): IBlock['label'] {
    return this.block.label
  }

  set blockLabel(value: IBlock['label']) {
    this.block_setLabel({blockId: this.block.uuid, value})
  }

  emitGearClickedEvent(): void {
    this.$emit('gearClicked')
  }

  @flowVuexNamespace.Action block_setLabel!: ({blockId, value}: { blockId: IBlock['uuid'], value: IBlock['label'] }) => void
}
export default LabelEditor
</script>

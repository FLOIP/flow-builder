<template>
  <section class="mb-3">
    <label class="text-primary">{{ 'flow-builder.title' | trans }}</label>
    <validation-message
      #input-control="{ isValid }"
      :message-key="`block/${block.uuid}/label`">
      <div class="d-flex">
        <small-text-editor
          class="w-100"
          v-model="blockLabel"
          :placeholder="'flow-builder.enter-title' | trans"
          :valid-state="isValid"/>
        <span class="btn btn-outline-primary btn-xs align-self-center ml-2" @click="emitGearClickedEvent">
          <font-awesome-icon
            :icon="['fac', 'settings']"
            class="fa-btn text-primary" />
        </span>
      </div>
    </validation-message>
  </section>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import SmallTextEditor from '@/components/common/SmallTextEditor.vue'
import ValidationMessage from '@/components/common/ValidationMessage.vue'
import {mixins} from 'vue-class-component'
import Lang from '@/lib/filters/lang'
import {IBlock} from '@floip/flow-runner'
import {namespace} from 'vuex-class'

const flowVuexNamespace = namespace('flow')

@Component({
  components: {
    SmallTextEditor,
    ValidationMessage,
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

  emitGearClickedEvent() {
    this.$emit('gearClicked')
  }

  @flowVuexNamespace.Action block_setLabel!: ({blockId, value}: {blockId: string, value: string}) => void
}
export default TitleEditor
</script>

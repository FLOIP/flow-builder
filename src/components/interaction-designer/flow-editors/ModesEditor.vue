<template>
  <div class="form-group flow-modes">
    <label class="text-primary">{{ 'flow-builder.modes' | trans }}</label>
    <vue-multiselect
      v-model="flowSelectedModes"
      :placeholder="'flow-builder.select-modes' | trans"
      :options="supportedModes"
      :multiple="true"
      :show-labels="false"
      :searchable="true" />
  </div>
</template>

<script lang="ts">
import VueMultiselect from 'vue-multiselect'
import {Component, Prop} from 'vue-property-decorator'
import {IFlow, SupportedMode} from '@floip/flow-runner'
import NumericEditor from '@/components/common/NumericEditor.vue'

import Lang from '@/lib/filters/lang'
import {mixins} from 'vue-class-component'
import {Getter} from 'vuex-class'

@Component({
  components: {
    NumericEditor,
    VueMultiselect,
  },
})
class ModeEditor extends mixins(Lang) {
  @Prop() readonly flow!: IFlow

  get flowSelectedModes(): SupportedMode[] {
    return this.flow.supported_modes
  }

  set flowSelectedModes(value: SupportedMode[]) {
    this.$emit('commitFlowModesChange', value)
  }

  @Getter supportedModes!: SupportedMode[]
}

export default ModeEditor
</script>

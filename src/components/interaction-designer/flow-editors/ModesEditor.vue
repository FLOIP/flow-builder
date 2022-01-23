<template>
  <div class="form-group flow-modes">
    <label class="text-primary">{{ 'flow-builder.modes' | trans }}</label>
    <div
      v-for="mode in supportedModes"
      :key="mode"
      class="checkbox">
      <label class="font-weight-normal">
        <input
          v-model="flowSelectedModes"
          :value="mode"
          type="checkbox"
          class="flow-mode-toggle-checkbox">
        {{ trans(`flow-builder.${mode.toLowerCase()}`) }}
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator'
import {SupportedMode} from '@floip/flow-runner'
import NumericEditor from '@/components/common/NumericEditor.vue'

import Lang from '@/lib/filters/lang'
import {mixins} from 'vue-class-component'
import {namespace} from 'vuex-class'

const treesVuexNamespace = namespace('trees')

@Component({
  components: {
    NumericEditor,
  },
})
class ModeEditor extends mixins(Lang) {
  get flowSelectedModes(): SupportedMode[] {
    return this.flow.supported_modes
  }

  set flowSelectedModes(value: SupportedMode[]) {
    this.$emit('commitFlowModesChange', value)
  }

  @treesVuexNamespace.Getter supportedModes: SupportedMode[]
}

export default ModeEditor
</script>

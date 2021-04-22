<template>
  <div class="form-group flow-modes">
    <label>{{'flow-builder.modes' | trans}}</label>
    <div v-for="mode in availableModes"
        :key="mode"
        class="checkbox">
      <label class="font-weight-normal">
        <input
            v-model="flowSelectedModes"
            :value="mode"
            type="checkbox"
            class="flow-mode-toggle-checkbox"/>
        {{mode}}
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { IFlow, SupportedMode } from '@floip/flow-runner'
import NumericEditor from '@/components/common/NumericEditor.vue'

import Lang from '@/lib/filters/lang'
import { mixins } from "vue-class-component";

@Component({
  components: {
    NumericEditor,
  },
})
class ModeEditor extends mixins(Lang) {
    @Prop() readonly flow!: IFlow

    private availableModes = Object.values(SupportedMode)

    get flowSelectedModes(): SupportedMode[] {
      return this.flow.supported_modes
    }

    set flowSelectedModes(value: SupportedMode[]) {
      this.$emit('commitFlowModesChange', value)
    }
  }

export default ModeEditor
</script>

<template>
  <div class="modes-editor form-group">
    <label class="text-primary">{{ trans('flow-builder.modes') }}</label>
    <vue-multiselect
      v-model="flowSelectedModes"
      :placeholder="trans('flow-builder.select-modes')"
      :options="supportedModes"
      :multiple="true"
      :show-labels="false"
      :searchable="true" />
  </div>
</template>

<script lang="ts">
import VueMultiselect from 'vue-multiselect'
import {Prop} from 'vue-property-decorator'
import {IFlow, SupportedMode} from '@floip/flow-runner'

import {Lang} from '@/lib/filters/lang'
import {mixins, Options} from 'vue-class-component'
import {Getter} from 'vuex-class'

@Options({
  components: {
    VueMultiselect,
  },
})
export class ModesEditor extends mixins(Lang) {
  @Prop() readonly flow!: IFlow

  get flowSelectedModes(): SupportedMode[] {
    return this.flow.supported_modes
  }

  set flowSelectedModes(value: SupportedMode[]) {
    this.$emit('commitFlowModesChange', value)
  }

  @Getter supportedModes!: SupportedMode[]
}

export default ModesEditor
</script>

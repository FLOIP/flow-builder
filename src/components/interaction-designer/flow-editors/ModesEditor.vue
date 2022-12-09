<template>
  <div class="modes-editor form-group">
    <label class="text-primary">{{ 'flow-builder.modes' | trans }}</label>
    <vue-multiselect
      v-model="selectedModes"
      :placeholder="'flow-builder.select-modes' | trans"
      :options="allModes"
      :multiple="true"
      :show-labels="false"
      :searchable="true" />
  </div>
</template>

<script lang="ts">
import VueMultiselect from 'vue-multiselect'
import {Component, Prop} from 'vue-property-decorator'
import {IFlow, SupportedMode} from '@floip/flow-runner'
import Lang from '@/lib/filters/lang'
import {mixins} from 'vue-class-component'
import {namespace, State} from 'vuex-class'
import {orderModes} from '@/store/flow/flow'

const flowNamespace = namespace('flow')

@Component({
  components: {
    VueMultiselect,
  },
})
export class ModesEditor extends mixins(Lang) {
  @Prop() readonly flow!: IFlow

  get allModes(): SupportedMode[] {
    return orderModes(this.availableModes ?? [])
  }

  get selectedModes(): SupportedMode[] {
    return orderModes(this.flow.supported_modes ?? [])
  }

  set selectedModes(newModes: SupportedMode[]) {
    this.flow_updateModes({flowId: this.flow.uuid, newModes})
  }

  @State(state => state.trees.ui.supportedModes) availableModes: SupportedMode[]
  @flowNamespace.Action flow_updateModes!: (value: SupportedMode[]) => void
}

export default ModesEditor
</script>

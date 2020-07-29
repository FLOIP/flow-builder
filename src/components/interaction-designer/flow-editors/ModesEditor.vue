<template>
  <div class="form-group flow-modes">
    <label>{{'flow-builder.modes' | trans}}</label>
    <div v-for="mode in supportedModes"
        :key="mode"
        class="checkbox">
      <label>
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
  import Vue from 'vue'
  import {Component, Prop} from 'vue-property-decorator'
  import {IFlow} from '@floip/flow-runner'
  import NumericEditor from '@/components/common/NumericEditor'
  import {SupportedMode} from '@floip/flow-runner'

  @Component<any>({
    components: {
      NumericEditor,
    },
  })
  class ModeEditor extends Vue {
    @Prop({default: true}) readonly isEditable!: boolean
    @Prop() readonly flow!: IFlow

    private supportedModes: SupportedMode[] =  [
      SupportedMode.IVR,
      SupportedMode.SMS,
      SupportedMode.USSD,
      SupportedMode.OFFLINE,
      SupportedMode.RICH_MESSAGING
    ]

    get flowSelectedModes(): SupportedMode[] {
      return this.flow.supportedModes
    }

    set flowSelectedModes(value: SupportedMode[]) {
      this.$emit('commitFlowModesChange', value)
    }
  }

  export default ModeEditor
</script>

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
            :disabled="!isEditable"
            type="checkbox"
            class="flow-mode-toggle-checkbox"/>
        {{mode}}
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IFlow, SupportedMode } from '@floip/flow-runner';
import NumericEditor from '@/components/common/NumericEditor.vue';

import lang from '@/lib/filters/lang';

  @Component<any>({
    components: {
      NumericEditor,
    },
    mixins: [lang],
  })
class ModeEditor extends Vue {
    @Prop({ default: true }) readonly isEditable: boolean

    @Prop() readonly flow!: IFlow

    private availableModes = Object.values(SupportedMode)

    get flowSelectedModes(): SupportedMode[] {
      return this.flow.supportedModes;
    }

    set flowSelectedModes(value: SupportedMode[]) {
      this.$emit('commitFlowModesChange', value);
    }
  }

export default ModeEditor;
</script>

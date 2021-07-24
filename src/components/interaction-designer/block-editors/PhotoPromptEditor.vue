<template>
  <div class="photo-prompt-editor">
    <label class="text-primary">{{ 'flow-builder.photo-response-prompt' | trans }}</label>
    <div class="custom-control custom-checkbox">
      <input
        id="shouldIncludePrompt"
        :value="shouldSetContactProperty"
        :checked="shouldSetContactProperty"
        type="checkbox"
        name="includePrompt"
        class="custom-control-input"
        @change="toggleIncludePrompt">
      <label
        class="custom-control-label font-weight-normal"
        for="shouldIncludePrompt">
        {{ 'flow-builder.include-photo-response-prompt' | trans }}
      </label>
    </div>
    <resource-editor
      v-if="promptResource"
      :resource="promptResource"
      :block="block"
      :flow="flow" />
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'
import Lang from '@/lib/filters/lang'
import {IBlock, IFlow, IResource} from '@floip/flow-runner'
import {namespace} from 'vuex-class'
import ResourceEditor from '../resource-editors/ResourceEditor.vue'

const flowVuexNamespace = namespace('flow')

@Component({
  components: {
    ResourceEditor,
  },
})
class LabelEditor extends mixins(Lang) {
  @Prop() readonly block!: IBlock
  @Prop() readonly flow!: IFlow

  shouldSetContactProperty = false

  created(): void {
    this.shouldSetContactProperty = this.block.config.prompt !== ''
  }

  async toggleIncludePrompt(): Promise<void> {
    this.shouldSetContactProperty = !this.shouldSetContactProperty
    if (!this.shouldSetContactProperty) {
      this.resource_delete({
        resourceId: this.block.config.prompt,
      })
      this.block.config.prompt = ''
    } else {
      const blankMessageResource = await this.flow_addBlankResourceForEnabledModesAndLangs()
      this.block_updateConfigByPath({
        blockId: this.block.uuid,
        path: 'prompt',
        value: blankMessageResource.uuid,
      })
    }
  }

  get promptResource(): IResource {
    return this.resourcesByUuid[this.block.config.prompt]
  }

  @flowVuexNamespace.Getter resourcesByUuid!: { [key: string]: IResource }

  @flowVuexNamespace.Action flow_addBlankResourceForEnabledModesAndLangs!: () => Promise<IResource>

  @flowVuexNamespace.Mutation resource_delete!: ({resourceId}: { resourceId: string }) => void

  @flowVuexNamespace.Mutation block_updateConfigByPath!: (
    {blockId, path, value}: { blockId: string, path: string, value: string | object }
  ) => void
}
export default LabelEditor
</script>

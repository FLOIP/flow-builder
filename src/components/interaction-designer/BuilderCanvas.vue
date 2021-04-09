<template>
  <div v-if="activeFlow"
       class="builder-canvas no-select">

    <block v-for="block in activeFlow.blocks"
           :key="block.uuid"
           :id="`block/${block.uuid}`"
           :block="block"
           :x="block.vendor_metadata.io_viamo.uiData.xPosition"
           :y="block.vendor_metadata.io_viamo.uiData.yPosition" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Block from '@/components/interaction-designer/Block.vue'
import { namespace } from "vuex-class";
import {IBlock, IFlow} from "@floip/flow-runner";
import { IValidationStatus, debugValidationStatus } from "@/store/validation";
import { find, isEqual, cloneDeep } from 'lodash'

const flowVuexNamespace = namespace('flow')
const validationVuexNamespace = namespace('validation')

@Component({
  components: {
    Block,
  },
})
export default class BuilderCanvas extends Vue {
  mounted() {
    this.$store.dispatch('builder/loadFlow')
  }

  @Watch('activeFlow', { deep: true, immediate: true })
  async onActiveFlowChanged(newFlow: IFlow) {
    console.debug('active flow has changed, validating ...')
    await this.validate_flow({ flow: newFlow })
    debugValidationStatus(this.flowValidationStatus, 'flow validation status')
  }

  @Watch('blocksOnActiveFlowForWatcher', { deep: true, immediate: true })
  async onBlocksInActiveFlowChanged(newBlocks: IBlock[], oldBlocks: IBlock[]) {
    if (!!newBlocks && newBlocks.length > 0) {
      console.debug('blocks inside active flow have changed, validating ...');
      for (let i = 0;  i < newBlocks.length; i++) {
        const currentNewBlock = newBlocks[i]
        const currentOldBlock = find(oldBlocks, { 'uuid': currentNewBlock.uuid })

        if (isEqual(currentNewBlock, currentOldBlock)) {
          continue; // no changes found
        }

        await this.validate_block({ block: currentNewBlock });
        debugValidationStatus(this.blockValidationStatuses[currentNewBlock.uuid], `validation status for block ${currentNewBlock.uuid}`)
      }
    }
  }

  get blocksOnActiveFlowForWatcher() {
    return cloneDeep(this.activeFlow.blocks) // needed to make comparison between new & old values on watcher
  }

  @flowVuexNamespace.State flows?: IFlow[]
  @flowVuexNamespace.Getter activeFlow!: IFlow

  @validationVuexNamespace.State flowValidationStatus!: IValidationStatus
  @validationVuexNamespace.State blockValidationStatuses!: { [key: string]: IValidationStatus }

  @validationVuexNamespace.Action validate_flow!: ({ flow } : { flow: IFlow }) => Promise<IValidationStatus>
  @validationVuexNamespace.Action validate_block!: ({ block } : { block: IBlock }) => Promise<IValidationStatus>
}

export { BuilderCanvas }
</script>

<style scoped>
  .noselect * {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently supported by Chrome, Opera and Firefox */
  }

  .builder-canvas {
    width: 9999px;
    height: 9999px;
  }
</style>

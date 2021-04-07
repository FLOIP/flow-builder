<template>
  <div v-if="flows.length"
       class="builder-canvas no-select">

    <block v-for="block in flows[0].blocks"
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
import { IFlow } from "@floip/flow-runner";
import { IValidationStatus, debutValidationStatus } from "@/store/validation";

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

  @Watch('activeFlow', { deep: true })
  onActiveFlowChanged(newFlow: IFlow) {
    console.debug('active flow has changed, validating ...')
    this.validate_flow({ flow: newFlow })
    debutValidationStatus(this.flowValidationStatus)
  }

  @flowVuexNamespace.State flows: IFlow[]
  @flowVuexNamespace.Getter activeFlow!: IFlow

  @validationVuexNamespace.State flowValidationStatus!: IValidationStatus
  @validationVuexNamespace.Action validate_flow: ({ flow } : { flow: IFlow }) => Promise<IValidationStatus>
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

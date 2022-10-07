<template>
  <div class="resource-viewer">
    <div class="resource-viewer-contents">
      <resource-viewer-block
        v-for="block in activeFlow.blocks"
        :id="`block/${block.uuid}`"
        :key="block.uuid"
        :block="block"
        @change="debounce_persistFlow" />
    </div>
  </div>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component'
import {Component} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import Lang from '@/lib/filters/lang'
import {IContext, IFlow} from '@floip/flow-runner'
import {debounce} from 'lodash'

const flowVuexNamespace = namespace('flow')
const builderVuexNamespace = namespace('builder')

export const DEBOUNCE_FLOW_PERSIST_MS = 1500

@Component({})
export class ResourceViewer extends mixins(Lang) {
  @flowVuexNamespace.Getter activeFlow!: IFlow

  mounted(): void {
    console.debug('VueJS flow resources viewer mounted!')
  }

  get id(): string {
    return this.$route.params.id
  }

  debounce_persistFlow = debounce(this.persistFlowAndHandleUiState.bind(this), DEBOUNCE_FLOW_PERSIST_MS)

  // this should go after debounce_persistFlow
  @builderVuexNamespace.Action persistFlowAndHandleUiState!: () => Promise<IContext | undefined>
}

export default ResourceViewer
</script>

<style lang="scss">
.resource-viewer {
  .block-content-filter {
    margin-top: 5px;
    padding-right: 15px;
  }

  .block-content-filter-warning {
    margin-left: 1em;
    margin-right: 1em;
  }

  .label {
    transition: all 200ms ease-in-out;

    .small, small {
      color: inherit !important;
    }
  }

  .tree-block-container {
    min-height: 0;
    padding-bottom: 0;
  }
}
</style>

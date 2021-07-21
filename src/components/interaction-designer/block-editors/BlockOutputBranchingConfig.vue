<template>
  <div class="block-output-branching-config">
    <div class="form-group">
      <label class="d-block">{{'flow-builder.output-branching' | trans}}</label>

      <div class="btn-group">
        <button
          :class="{
            active: isBranchingTypeExitPerChoice,
            'btn-primary': isBranchingTypeExitPerChoice,
            'btn-outline-primary': !isBranchingTypeExitPerChoice,
          }"
          :title="'flow-builder.separate-output-for-each-choice' | trans"
          class="btn btn-sm"
          data-placement="bottom"
          data-toggle="tooltip"
          @click="selectedBranchingType = OutputBranchingType.EXIT_PER_CHOICE">

          <i class="v5icon-branching-on v5icon-2x" />
        </button>

        <button
          :class="{
            active: isBranchingTypeUnified,
            'btn-primary': isBranchingTypeUnified,
            'btn-outline-primary': !isBranchingTypeUnified,
          }"
          :title="'flow-builder.one-output-for-all-choices' | trans"
          class="btn btn-sm"
          data-placement="bottom"
          data-toggle="tooltip"
          @click="selectedBranchingType = OutputBranchingType.UNIFIED">

          <i class="v5icon-branching-off v5icon-2x" />
        </button>

        <button
          :class="{
            active: isBranchingTypeAdvanced,
            'btn-primary': isBranchingTypeAdvanced,
            'btn-outline-primary': !isBranchingTypeAdvanced,
          }"
          :title="'flow-builder.advanced-configuration-of-outputs' | trans"
          class="btn btn-sm"
          data-placement="bottom"
          data-toggle="tooltip"
          @click="selectedBranchingType = OutputBranchingType.ADVANCED">

          <i class="v5icon-branching-off v5icon-2x" />
        </button>
      </div>
    </div>

    <advanced-exits-builder
      v-if="isBranchingTypeAdvanced"
      :block="block" />

    <div class="form-group">
      <h6>When no valid response/all exit expressions evaluate to false</h6>

      <div class="form-check">
        <input
          :id="NoValidResponseHandler.END_CALL"
          v-model="noValidResponse"
          class="form-check-input"
          type="radio"
          :value="NoValidResponseHandler.END_CALL" />

        <label
          class="form-check-label"
          :for="NoValidResponseHandler.END_CALL">
          End the call/session
        </label>
      </div>

      <div class="form-check">
        <input
          :id="NoValidResponseHandler.CONTINUE_THRU_EXIT"
          v-model="noValidResponse"
          class="form-check-input"
          type="radio"
          :value="NoValidResponseHandler.CONTINUE_THRU_EXIT" />

        <label
          class="form-check-label"
          :for="NoValidResponseHandler.CONTINUE_THRU_EXIT">
          Continue through Default exit
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {get, isEmpty, isNil} from 'lodash'
  import {Component, Prop} from 'vue-property-decorator'
  import {IBlock} from '@floip/flow-runner'
  import {mixins} from 'vue-class-component'
  import AdvancedExitsBuilder from '@/components/interaction-designer/block-editors/AdvancedExitsBuilder.vue'
  import Lang from '@/lib/filters/lang'
  import {namespace} from 'vuex-class'

  const flowVuexNamespace = namespace('flow')

  export enum OutputBranchingType {
    UNIFIED = 'UNIFIED',
    EXIT_PER_CHOICE = 'EXIT_PER_CHOICE',
    ADVANCED = 'ADVANCED',
  }

  export enum NoValidResponseHandler {
    END_CALL = 'END_CALL',
    CONTINUE_THRU_EXIT = 'CONTINUE_THRU_EXIT',
  }

  export interface IVendorMetadataWithBranchingType {
    io_viamo: {
      branchingType: OutputBranchingType
    }
  }

  export interface IBlockWithBranchingType extends IBlock {
    vendor_metadata: IVendorMetadataWithBranchingType
  }

  @Component({
    components: {
      AdvancedExitsBuilder,
    },
  })
  export default class BlockOutputBranchingConfig extends mixins(Lang) {
    @Prop() readonly block!: IBlock

    OutputBranchingType = OutputBranchingType
    NoValidResponseHandler = NoValidResponseHandler

    mounted(): void {
      if (isEmpty(this.selectedBranchingType)) {
        // todo: should this be EXIT_PER_CHOICE for SelectOne block?
        this.selectedBranchingType = OutputBranchingType.UNIFIED
      }

      if (isEmpty(this.noValidResponse)) {
        this.noValidResponse = NoValidResponseHandler.END_CALL
      }
    }

    get selectedBranchingType(): OutputBranchingType {
      return get(this.block.vendor_metadata, 'io_viamo.branchingType')
    }

    set selectedBranchingType(value: OutputBranchingType) {
      const {uuid: blockId} = this.block
      this.block_updateVendorMetadataByPath({blockId, path: 'io_viamo.branchingType', value})

      switch (value) {
        case OutputBranchingType.UNIFIED:
          this.block_convertExitFormationToUnified({blockId})
          break
        case OutputBranchingType.EXIT_PER_CHOICE:
          // handled via change event from SelectOne; felt awkward importing SelectOne store here
          // should likely make branching types extendable
          //this.reflowExitsFromChoices({blockId})
          break
        case OutputBranchingType.ADVANCED:
          // todo: restore from cache
          break
        default:
          console.warn('block-editors/BlockOutputBranchingConfig',
            'Unknown branching type received.',
            {branchingType: value})
      }

      this.$emit('branchingTypeChanged', {branchingType: value})
    }

    get noValidResponse(): NoValidResponseHandler {
      return get(this.block.vendor_metadata, 'io_viamo.noValidResponse')
    }

    set noValidResponse(value: NoValidResponseHandler) {
      const {uuid: blockId} = this.block
      this.block_updateVendorMetadataByPath({blockId, path: 'io_viamo.noValidResponse', value})
    }

    get isBranchingTypeExitPerChoice(): boolean {
      return this.selectedBranchingType === OutputBranchingType.EXIT_PER_CHOICE
    }

    get isBranchingTypeUnified(): boolean {
      return this.selectedBranchingType === OutputBranchingType.UNIFIED
    }

    get isBranchingTypeAdvanced(): boolean {
      return this.selectedBranchingType === OutputBranchingType.ADVANCED
    }

    @flowVuexNamespace.Mutation block_updateVendorMetadataByPath!:
      ({blockId, path, value}: { blockId: string, path: string, value: object | string }) => void
    @flowVuexNamespace.Action block_convertExitFormationToUnified!:
      ({blockId}: {blockId: IBlock['uuid']}) => Promise<void>
  }
</script>

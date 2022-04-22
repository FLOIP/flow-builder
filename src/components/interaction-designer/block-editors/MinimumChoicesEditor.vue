<template>
  <validation-message
    #input-control="{ isValid }"
    :message-key="`block/${block.uuid}/config/minimum_choices`">
    <div class="minimum-choices-editor block-validation-min-choices">
      <numeric-editor
        v-model.number="minChoices"
        :regex-numeric-filtering="'[0-9]'"
        :label="'flow-builder.minimum-choices' | trans"
        :placeholder="'flow-builder.enter-value' | trans"
        :valid-state="isValid" />
    </div>
  </validation-message>
</template>

<script lang="ts">

import {mixins} from 'vue-class-component'
import Lang from '@/lib/filters/lang'
import {Component, Prop} from 'vue-property-decorator'
import {ISelectManyResponseBlock} from '@floip/flow-runner/src/model/block/ISelectManyResponseBlock'
import {namespace} from 'vuex-class'
import {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_SelectManyResponseBlockStore'
import {isNumber} from 'lodash'
import {IBlock} from '@floip/flow-runner'
// import {ISelectManyResponseBlockConfig} from '@floip/flow-runner'

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const builderVuexNamespace = namespace('builder')

@Component({})
export class MinimumChoicesEditor extends mixins(Lang) {
  @Prop() readonly block!: ISelectManyResponseBlock

  mounted(): void {
    // todo: dispatch default value onto block
  }

  // eslint-disable-next-line line-comment-position
  get minChoices(): number | string { //ISelectManyResponseBlockConfig['minimum_choices'] {
    const min = this.block.config.minimum_choices
    return isNumber(min) ? min : ''
  }

  // eslint-disable-next-line line-comment-position
  set minChoices(value: number | string) { //ISelectManyResponseBlockConfig['minimum_choices']) {
    const {uuid: blockId} = this.block
    this.setMinChoices({blockId, value: isNumber(value) ? value : undefined})
  }

  @blockVuexNamespace.Action setMinChoices!: ({blockId, value}: {blockId: IBlock['uuid'], value?: number}) => void
}

export default MinimumChoicesEditor
</script>

<template>
  <validation-message
    #input-control="{ isValid }"
    :message-key="`block/${block.uuid}/config/maximum_choices`">
    <div class="maximum-choices-editor block-validation-max-choices">
      <numeric-editor
        v-model.number="maxChoices"
        :regex-numeric-filtering="'[0-9]'"
        :label="'flow-builder.maximum-choices' | trans"
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
export class MaximumChoicesEditor extends mixins(Lang) {
  @Prop() readonly block!: ISelectManyResponseBlock

  mounted(): void {
    // todo: dispatch default value onto block
  }

  // eslint-disable-next-line line-comment-position
  get maxChoices(): number | string { //ISelectManyResponseBlockConfig['minimum_choices'] {
    const max = this.block.config.maximum_choices
    return isNumber(max) ? max : ''
  }

  // eslint-disable-next-line line-comment-position
  set maxChoices(value: number | string) { //ISelectManyResponseBlockConfig['minimum_choices']) {
    const {uuid: blockId} = this.block
    this.setMaxChoices({blockId, value: isNumber(value) ? value : undefined})
  }

  @blockVuexNamespace.Action setMaxChoices!: ({blockId, value}: {blockId: IBlock['uuid'], value?: number}) => void
}

export default MaximumChoicesEditor
</script>

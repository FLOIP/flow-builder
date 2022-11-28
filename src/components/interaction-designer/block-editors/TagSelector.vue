<template>
  <validation-message
    #input-control="{isValid}"
    :message-key="`block/${block.uuid}/tags`">
    <div class="tag-selector">
      <label v-if="!noLabel">{{ 'flow-builder.tags-label' | trans }}</label>
      <vue-multiselect
        v-model="selectedTags"
        track-by="name"
        label="name"
        :class="{invalid: isValid === false}"
        :multiple="true"
        :placeholder="'flow-builder.tags-selector-placeholder' | trans"
        :options="availableTagOptions"
        :searchable="true"
        :show-labels="false"
        :close-on-select="false"
        :taggable="taggable"
        :tag-placeholder="taggable ? trans('flow-builder.create-a-tag-prompt') : ''"
        :disabled="!isEditable"
        @tag="addTag">
        <template #clear>
          <div
            v-if="selectedTags.length"
            v-b-tooltip.hover="trans('flow-builder.clear-all')"
            class="multiselect__clear-all"
            @click="clearAll()">
            <font-awesome-icon :icon="['fas', 'times-circle']" />
          </div>
        </template>
        <template #tag="{ remove, option, search }">
          <slot
            name="tag"
            :remove="remove"
            :option="option"
            :search="search" />
        </template>
      </vue-multiselect>
    </div>
  </validation-message>
</template>

<script lang="ts">
import VueMultiselect from 'vue-multiselect'
import {IBlock} from '@floip/flow-runner'
import {Component, Prop} from 'vue-property-decorator'
import {State, namespace} from 'vuex-class'
import Lang from '@/lib/filters/lang'
import {map, uniq} from 'lodash'
import {mixins} from 'vue-class-component'

const flowVuexNamespace = namespace('flow')
const builderVuexNamespace = namespace('builder')

type Option = {
  id: string,
  name: string,
}

@Component({
  components: {
    VueMultiselect,
  },
})
export class TagSelector extends mixins(Lang) {
  @Prop() readonly block!: IBlock
  @Prop({default: true}) readonly taggable!: boolean
  @Prop({default: false}) readonly noLabel!: boolean
  @builderVuexNamespace.Getter isEditable!: boolean

  get selectedTags(): Option[] {
    return this.stringListToOptions(this.block.tags || [])
  }

  set selectedTags(value) {
    this.block_setTags({
      blockId: this.block.uuid,
      value: map(value, 'name'),
    })
  }

  get availableTagOptions(): Option[] {
    return this.stringListToOptions(this.blockTags)
  }

  stringListToOptions(list: string[]): Option[] {
    return map(uniq(list), (value) => ({id: value, name: value}))
  }

  addTag(newTag: string): void {
    this.blockTags.push(newTag)
    this.block_addTag({
      blockId: this.block.uuid,
      value: newTag,
    })
  }

  clearAll(): void {
    this.selectedTags = []
  }

  @flowVuexNamespace.Mutation block_setTags!: ({blockId, value}: {blockId: IBlock['uuid'], value: string[]}) => void
  @flowVuexNamespace.Mutation block_addTag!: ({blockId, value}: {blockId: IBlock['uuid'], value: string}) => void

  @State(({trees: {ui: {blockTags}}}) => blockTags) blockTags!: string[]
}

export default TagSelector
</script>

<style lang="css" scoped>
.invalid >>> .multiselect__tags {
  border-color: #dc3545;
}
.multiselect >>> .multiselect__clear-all {
  position: absolute;
  right: 41px;
  top: 1px;
  box-sizing: border-box;
  width: 18px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>

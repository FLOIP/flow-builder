<template>
  <validation-message :message-key="`block/${block.uuid}/tags`">
    <template #input-control="{isValid}">
      <div class="tag-selector">
        <label v-if="!noLabel">{{ 'flow-builder.tags-label' | trans }}</label>
        <vue-multiselect
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
          :value="selectedTags"
          @input="setSelectedTags"
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
    </template>
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
const undoRedoVuexNamespace = namespace('undoRedo')

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

  async setSelectedTags(tagOptions: Option[]): Promise<void> {
    this.block_setTags({
      blockId: this.block.uuid,
      value: tagOptions.map(option => option.name),
    })
    await this.takeSnapshot()
  }

  get availableTagOptions(): Option[] {
    return this.stringListToOptions(this.blockTags)
  }

  stringListToOptions(list: string[]): Option[] {
    return map(uniq(list), (value) => ({id: value, name: value}))
  }

  async addTag(newTag: string): Promise<void> {
    this.blockTags.push(newTag)
    this.block_addTag({
      blockId: this.block.uuid,
      value: newTag,
    })
    await this.takeSnapshot()
  }

  clearAll(): void {
    this.setSelectedTags([])
  }

  @flowVuexNamespace.Mutation block_setTags!: ({blockId, value}: {blockId: IBlock['uuid'], value: string[]}) => void
  @flowVuexNamespace.Mutation block_addTag!: ({blockId, value}: {blockId: IBlock['uuid'], value: string}) => void
  @undoRedoVuexNamespace.Action takeSnapshot!: () => Promise<void>

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

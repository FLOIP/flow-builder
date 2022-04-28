<template>
  <validation-message
    #input-control="{isValid}"
    :message-key="`block/${block.uuid}/tags`">
    <div class="tag-selector">
      <label>{{ 'flow-builder.tags-label' | trans }}</label>
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
        @tag="addTag" />
    </div>
  </validation-message>
</template>

<script lang="ts">
import VueMultiselect from 'vue-multiselect'
import {IBlock} from '@floip/flow-runner'
import {Component, Prop} from 'vue-property-decorator'
import {State, namespace} from 'vuex-class'
import Lang from '@/lib/filters/lang'
import {map} from 'lodash'
import {mixins} from 'vue-class-component'

const flowVuexNamespace = namespace('flow')

@Component({
  components: {
    VueMultiselect,
  },
})
export class TagSelector extends mixins(Lang) {
  @Prop() readonly block!: IBlock
  @Prop({default: true}) readonly taggable!: boolean

  get selectedTags() {
    return this.stringListToOptions(this.block.tags || [])
  }

  set selectedTags(value) {
    this.block_setTags({
      blockId: this.block.uuid,
      value: map(value, 'name'),
    })
  }

  get availableTagOptions() {
    return this.stringListToOptions(this.blockTags)
  }

  stringListToOptions(list: string[]) {
    return map(list, (value) => ({id: value, name: value}))
  }

  addTag(newTag: string) {
    this.blockTags.push(newTag)
    this.block_addTag({
      blockId: this.block.uuid,
      value: newTag,
    })
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
</style>

<template>
  <validation-message
    #input-control="{isValid}"
    :message-key="`block/${block.uuid}/tags`">
    <div class="block-group">
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
import {IBlock, ISetGroupMembershipBlockConfig} from '@floip/flow-runner'
import {Component, Prop} from 'vue-property-decorator'
import {Getter, namespace} from 'vuex-class'
import Lang from '@/lib/filters/lang'
import {find, includes, map} from 'lodash'
import {mixins} from 'vue-class-component'
import ValidationMessage from '@/components/common/ValidationMessage.vue'

const flowVuexNamespace = namespace('flow')

@Component({
  components: {
    VueMultiselect,
    ValidationMessage,
  },
})
class TagSelector extends mixins(Lang) {
  @Prop() readonly block!: IBlock
  @Prop({default: true}) readonly taggable!: boolean

  get selectedTags() {
    return this.stringListToOptions(this.block.tags)
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

  addTag(event) {
    //TODO: implement this from voto5/resources/assets/js/trees/components/block-editors/BlockLabelTagsInput.vue:addTag
    this.$emit('add-tag', event)
  }

  @flowVuexNamespace.Mutation block_setTags!: ({blockId, value}: {blockId: IBlock['uuid'], value: string[]}) => void
  @Getter blockTags!: string[]
}

// TODO: reset /Users/rs/Documents/Voto/floip/flow-builder/builder.config.json:blockTags from master to remove tags sample
export default TagSelector
</script>

<style lang="css" scoped>
.invalid >>> .multiselect__tags {
  border-color: #dc3545;
}
</style>

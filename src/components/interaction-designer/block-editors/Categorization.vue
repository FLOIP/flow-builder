<template>
  <div class="categorization">
    <hr>
    <label class="text-primary">{{ trans('flow-builder.categorization') }}</label>
    <tag-selector :block="block" />
  </div>
</template>

<script lang="ts">
import {IBlock} from '@floip/flow-runner'
import {Prop} from 'vue-property-decorator'
import {Lang} from '@/lib/filters/lang'
import {mixins, Options} from 'vue-class-component'

@Options({})
export class Categorization extends mixins(Lang) {
  @Prop() readonly block!: IBlock
}

export default Categorization
</script>

<template>
  <div class="categorization">
    <hr>
    <label class="text-primary">{{ 'flow-builder.categorization' | trans }}</label>
    <tag-selector :block="block" />
  </div>
</template>

<script lang="ts">
import {IBlock} from '@floip/flow-runner'
import {Component, Prop} from 'vue-property-decorator'
import Lang from '@/lib/filters/lang'
import {mixins} from 'vue-class-component'

@Component({})
export class Categorization extends mixins(Lang) {
  @Prop() readonly block!: IBlock
}

export default Categorization
</script>

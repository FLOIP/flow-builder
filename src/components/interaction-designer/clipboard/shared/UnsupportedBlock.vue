<template>
  <div class="unsupported-block card">
    <div class="card-body sm-padding-below font-roboto">
      {{ blockName }} {{ 'flow-builder.simulator-unsupported-block' | trans }}
    </div>
  </div>
</template>

<script lang="ts">
import Lang from '@/lib/filters/lang'
import {mixins} from 'vue-class-component'
import {Component, Prop} from 'vue-property-decorator'

@Component({})
export class UnsupportedBlock extends mixins(Lang) {
  @Prop(String) readonly blockName: string | undefined
}

export default UnsupportedBlock
</script>

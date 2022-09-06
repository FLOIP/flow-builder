<template>
  <div class="unsupported-block card">
    <div class="card-body sm-padding-below font-roboto">
      {{ blockName }} {{ trans('flow-builder.simulator-unsupported-block') }}
    </div>
  </div>
</template>

<script lang="ts">
import {Lang} from '@/lib/filters/lang'
import {mixins, Options} from 'vue-class-component'
import {Prop} from 'vue-property-decorator'

@Options({})
export class UnsupportedBlock extends mixins(Lang) {
  @Prop(String) readonly blockName?: string
}

export default UnsupportedBlock
</script>

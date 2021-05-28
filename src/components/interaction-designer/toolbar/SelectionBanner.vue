<template>
  <div class="selection-banner">
    <div class="alert alert-primary mb-0 d-flex" role="alert">
      <div class="mr-3">
        You have selected x blocks
      </div>
      <button class="btn btn-outline-dark btn-sm">Clear selection</button>
    </div>
  </div>
</template>

<script lang="ts">
import Lang from '@/lib/filters/lang'
import Component, { mixins } from "vue-class-component";

@Component({})
export default class SelectionBanner extends mixins(Lang) {

}
</script>

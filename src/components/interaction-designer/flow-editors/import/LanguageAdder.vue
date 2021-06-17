<template>
  <p class="my-4">Hello from modal!</p>
</template>

<script lang="ts">

import { BModal } from 'bootstrap-vue'
import Lang from '@/lib/filters/lang'
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'

@Component({
  components: { BModal },
})
class LanguageAdder extends mixins(Lang) {
}

export default LanguageAdder

</script>

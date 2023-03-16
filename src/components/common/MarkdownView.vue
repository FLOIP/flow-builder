<template>
  <!-- eslint-disable vue/no-v-html -->
  <!-- eslint-disable vue/no-v-text-v-html-on-component -->
  <component
    :is="tag"
    class="markdown-view"
    v-html="html" />
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {markdownToHtml} from '@/lib/markdown'

export const MarkdownView = defineComponent({
  name: 'MarkdownView',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    markdown: {
      type: String,
      required: true,
    },
  },
  computed: {
    html(): string {
      return markdownToHtml(this.markdown)
    },
  },
})

export default MarkdownView
</script>

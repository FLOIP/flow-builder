<!-- v-html is required for displaying markdown -->
<!-- eslint-disable vue/no-v-html -->
<template>
  <dl
    v-if="definitions"
    class="block-config-explanations">
    <template v-for="(definition, i) in definitions">
      <dt :key="`${i}-dt`">
        {{ definition.title }}
      </dt>
      <dd
        :key="`${i}-dd`"
        v-html="definition.description" />
    </template>
  </dl>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {lang} from '@/lib/filters/lang'
import {marked} from 'marked'
import {IBlockClass, IExplanatoryText} from '@/lib/types'

export const BlockConfigExplanations = defineComponent({
  name: 'BlockConfigExplanations',
  props: {
    blockType: {
      type: String,
      required: true,
    },
    branchingType: {
      type: String,
      required: true,
    },
  },
  computed: {
    blockClasses(): Record<string, IBlockClass> {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (this as any).$store.state.trees.ui.blockClasses
    },
    blockClass(): IBlockClass {
      return this.blockClasses[this.blockType]
    },
    explanatoryTexts(): IExplanatoryText[] {
      return this.blockClass.explanatory_texts
    },
    definitions() {
      const definitions = []

      for (let i = 0; i < this.explanatoryTexts.length; i += 1) {
        const text: IExplanatoryText = this.explanatoryTexts[i]

        if (
          text.branching_type === undefined
          || text.branching_type === this.branchingType
        ) {
          definitions.push({
            title: lang.trans(text.title),
            description: marked.parse(lang.trans(text.description) as string),
          })
        }
      }

      return definitions
    },
  },
})

export default BlockConfigExplanations
</script>

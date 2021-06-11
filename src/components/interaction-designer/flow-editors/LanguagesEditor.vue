<template>
  <div
    :id="`${flow.uuid}.languages`"
    class="form-group flow-languages"
  >
    <label>{{ 'flow-builder.languages' | trans }}</label>
    <div
      v-for="language in languages"
      :key="language.id"
      class="checkbox"
    >
      <label class="font-weight-normal">
        <input
          v-model="flowSelectedLanguages"
          :value="language"
          type="checkbox"
          class="flow-language-toggle-checkbox"
        >

        {{ language.label }}
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {IFlow} from '@floip/flow-runner'
import NumericEditor from '@/components/common/NumericEditor.vue'
import {ILanguage} from '@floip/flow-runner/dist/flow-spec/ILanguage'
import Lang from '@/lib/filters/lang'
import {mixins} from 'vue-class-component'

@Component({
  components: {
    NumericEditor,
  },
})
class LanguagesEditor extends mixins(Lang) {
    @Prop() readonly flow!: IFlow

    get languages(): ILanguage[] {
      return this.$store.state.trees.ui.languages
    }

    get flowSelectedLanguages(): ILanguage[] {
      return this.flow.languages || []
    }

    set flowSelectedLanguages(value: ILanguage[]) {
      this.$emit('commitFlowLanguagesChange', value)
    }
  }

export default LanguagesEditor
</script>

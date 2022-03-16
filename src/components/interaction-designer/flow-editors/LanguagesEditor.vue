<template>
  <div class="form-group flow-languages">
    <label class="text-primary">{{ 'flow-builder.languages' | trans }}</label>
    <div
      v-for="language in languages"
      :key="language.id"
      class="checkbox">
      <label class="font-weight-normal">
        <input
          v-model="flowSelectedLanguages"
          :value="language"
          type="checkbox"
          class="flow-language-toggle-checkbox">

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
import {sortBy} from 'lodash'

@Component({})
export class LanguagesEditor extends mixins(Lang) {
  @Prop() readonly flow!: IFlow

  get languages(): ILanguage[] {
    // Make sure to follow order when populating languages, because the order may affect indexes during resource validation
    return sortBy(this.$store.state.trees.ui.languages, ['label'])
  }

  get flowSelectedLanguages(): ILanguage[] {
    return this.flow.languages ?? []
  }

  set flowSelectedLanguages(value: ILanguage[]) {
    this.$emit('commitFlowLanguagesChange', value)
  }
}

export default LanguagesEditor
</script>

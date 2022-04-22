<template>
  <div class="languages-editor form-group flow-languages">
    <label class="text-primary">{{ 'flow-builder.languages' | trans }}</label>
    <vue-multiselect
      v-model="flowSelectedLanguages"
      track-by="id"
      label="label"
      :placeholder="'flow-builder.select-languages' | trans"
      :options="languages"
      :multiple="true"
      :show-labels="false"
      :searchable="true" />
  </div>
</template>

<script lang="ts">
import VueMultiselect from 'vue-multiselect'
import {Component, Prop} from 'vue-property-decorator'
import {IFlow} from '@floip/flow-runner'
import {ILanguage} from '@floip/flow-runner/dist/flow-spec/ILanguage'
import Lang from '@/lib/filters/lang'
import {mixins} from 'vue-class-component'
import {sortBy} from 'lodash'
import {State} from 'vuex-class'

@Component({
  components: {
    VueMultiselect,
  },
})
export class LanguagesEditor extends mixins(Lang) {
  @Prop() readonly flow!: IFlow

  get languages(): ILanguage[] {
    // Make sure to follow order when populating languages, because the order may affect indexes during resource validation
    return sortBy(this.ui.languages, ['label'])
  }

  get flowSelectedLanguages(): ILanguage[] {
    return this.flow.languages ?? []
  }

  set flowSelectedLanguages(value: ILanguage[]) {
    this.$emit('commitFlowLanguagesChange', value)
  }

  @State(({trees: {ui}}) => ui) ui!: any
}

export default LanguagesEditor
</script>

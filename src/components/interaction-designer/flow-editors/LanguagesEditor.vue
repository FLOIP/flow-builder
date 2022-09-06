<template>
  <div class="languages-editor form-group">
    <label class="text-primary">{{ trans('flow-builder.languages') }}</label>
    <vue-multiselect
      v-model="flowSelectedLanguages"
      track-by="id"
      label="label"
      :placeholder="trans('flow-builder.select-languages')"
      :options="languages"
      :multiple="true"
      :show-labels="false"
      :searchable="true" />
  </div>
</template>

<script lang="ts">
import VueMultiselect from 'vue-multiselect'
import {Prop} from 'vue-property-decorator'
import {IFlow} from '@floip/flow-runner'
import {ILanguage} from '@floip/flow-runner/dist/flow-spec/ILanguage'
import {Lang} from '@/lib/filters/lang'
import {mixins, Options} from 'vue-class-component'
import {sortBy} from 'lodash'
import {State} from 'vuex-class'

@Options({
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

<template>
  <div class="languages-editor form-group" data-cy="flow-languages--editor">
    <label class="text-primary">{{ 'flow-builder.languages' | trans }}</label>
    <vue-multiselect
      v-model="selectedLanguages"
      track-by="id"
      label="label"
      :placeholder="'flow-builder.select-languages' | trans"
      :options="allLanguages"
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
import {namespace, State} from 'vuex-class'
import {orderLanguages} from '@/store/flow/flow'

const flowNamespace = namespace('flow')

@Component({
  components: {
    VueMultiselect,
  },
})
export class LanguagesEditor extends mixins(Lang) {
  @Prop() readonly flow!: IFlow

  get allLanguages(): ILanguage[] {
    return orderLanguages(this.availableLanguages ?? [])
  }

  get selectedLanguages(): ILanguage[] {
    return orderLanguages(this.flow.languages ?? [])
  }

  set selectedLanguages(newLanguages: ILanguage[]) {
    this.flow_updateLanguages({flowId: this.flow.uuid, newLanguages})
  }

  @State(state => state.trees.ui.languages) availableLanguages: ILanguage[]
  @flowNamespace.Action flow_updateLanguages: ({flowId, newLanguages}: {flowId: string, newLanguages: ILanguage[]}) => void
}

export default LanguagesEditor
</script>

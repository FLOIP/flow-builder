<template>
  <div class="form-group flow-languages">
    <label>{{'flow-builder.languages' | trans}}</label>
    <div v-for="language in languages"
        :key="language.id"
        class="checkbox">
      <label>
        <input
            v-model="flowSelectedLanguages"
            :value="language"
            type="checkbox"
            class="flow-language-toggle-checkbox"/>

        {{language.name}}
      </label>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component, Prop} from 'vue-property-decorator'
  import {IFlow} from '@floip/flow-runner'
  import NumericEditor from '@/components/common/NumericEditor'
  import ILanguage from '@floip/flow-runner/dist/flow-spec/ILanguage'

  @Component<any>({
    components: {
      NumericEditor,
    },
  })
  class LanguagesEditor extends Vue {
    @Prop({default: true}) readonly isEditable!: boolean
    @Prop() readonly flow!: IFlow

    private availableLanguages: ILanguage[] =  [
      {
        id: '1',
        name: "English",
        abbreviation: "EN",
        orgId:"",
        rightToLeft:true,
      },
      {
        id: '2',
        name: "French",
        abbreviation: "FR",
        orgId:"",
        rightToLeft:true,
      }
    ]

    get languages(): ILanguage[] {
      return this.availableLanguages // TODO: get from valid source (eg: store) once merged in flow-builder
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

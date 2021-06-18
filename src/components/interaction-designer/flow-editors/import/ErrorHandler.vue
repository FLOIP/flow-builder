<template>
  <div>
    <div v-if="updating">
      <br>
      <div
        class="spinner-border"
        role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div
      v-if="flowError"
      class="alert alert-danger"
      role="alert">
      {{ flowError | trans }}
    </div>
    <div
      v-if="hasUnsupportedBlockClasses"
      class="alert alert-danger"
      role="alert">
      {{ `${trans('flow-builder.unsupported-blocks-detected')}: ${unsupportedBlockClassesList}` }}
    </div>
    <import-matcher
      v-if="languagesMissing"
      class="mt-2"
      :missing-matches="missingLanguages"
      type-id="id"
      type-label="label"
      :existing-options-without-match="existingLanguagesWithoutMatch"
      match-not-found-text="flow-builder.match-for-languages-not-found"
      @reactToMatch="handleMatchLanguage" />
    <import-matcher
      v-if="propertiesMissing"
      class="mt-2"
      :missing-matches="missingProperties"
      type-id="name"
      type-label="name"
      :existing-options-without-match="existingPropertiesWithoutMatch"
      match-not-found-text="flow-builder.match-for-properties-not-found"
      @reactToMatch="handleMatchProperty" />
    <import-matcher
      v-if="groupsMissing"
      class="mt-2"
      :missing-matches="missingGroups"
      type-id="id"
      type-label="group_name"
      :existing-options-without-match="existingGroupsWithoutMatch"
      match-not-found-text="flow-builder.match-for-groups-not-found"
      @reactToMatch="handleMatchGroup" />
  </div>
</template>

<script lang="ts">
import lang from '@/lib/filters/lang'
import {Component} from 'vue-property-decorator'
import Vue from 'vue'
import {Getter, namespace} from 'vuex-class'
import {IContext} from '@floip/flow-runner'
import {ILanguage} from '@floip/flow-runner/dist/flow-spec/ILanguage'
import ImportMatcher from '@/components/interaction-designer/flow-editors/import/ImportMatcher.vue'
import {IContactPropertyOption} from '@/store/flow/block-types/Core_SetContactPropertyStore'
import {IGroupOption} from '@/store/flow/block-types/Core_SetGroupMembershipStore'

const importVuexNamespace = namespace('flow/import')

@Component(
  {
    components: {
      ImportMatcher,
    },
    mixins: [lang],
  },
)
class ErrorHandler extends Vue {
  handleMatchLanguage(oldLanguage: ILanguage, matchingNewLanguage: ILanguage) {
    this.matchLanguage({oldLanguage, matchingNewLanguage})
  }

  handleMatchProperty(
    oldProperty: { name: string, blockIds: string[] },
    matchingNewProperty: IContactPropertyOption,
  ) {
    this.matchProperty({oldProperty, matchingNewProperty})
  }

  handleMatchGroup(
    oldGroup: { id: string, group_name: string, blockIds: string[] },
    matchingNewGroup: IGroupOption,
  ) {
    this.matchGroup({oldGroup, matchingNewGroup})
  }

  @Getter blockClasses!: string[]

  @importVuexNamespace.Action matchLanguage!: (
    {oldLanguage, matchingNewLanguage}: { oldLanguage: ILanguage, matchingNewLanguage: ILanguage },
  ) => Promise<void>

  @importVuexNamespace.Action matchProperty!: (
    {oldProperty, matchingNewProperty}: { oldProperty: object, matchingNewProperty: object },
  ) => Promise<void>

  @importVuexNamespace.Action matchGroup!: (
    {oldGroup, matchingNewGroup}: { oldGroup: object, matchingNewGroup: object },
  ) => Promise<void>

  @importVuexNamespace.Getter hasUnsupportedBlockClasses!: boolean

  @importVuexNamespace.Getter unsupportedBlockClassesList!: string

  @importVuexNamespace.Getter languagesMissing!: boolean

  @importVuexNamespace.Getter groupsMissing!: boolean

  @importVuexNamespace.Getter propertiesMissing!: boolean

  @importVuexNamespace.State flowError!: string

  @importVuexNamespace.State flowContainer!: IContext

  @importVuexNamespace.State missingLanguages!: ILanguage[]

  @importVuexNamespace.State existingLanguagesWithoutMatch!: ILanguage[]

  @importVuexNamespace.State missingProperties!: { name: string, blockIds: string[] }[]

  @importVuexNamespace.State existingPropertiesWithoutMatch!: IContactPropertyOption[]

  @importVuexNamespace.State missingGroups!: { id: string, group_name: string, blockIds: string[] }[]

  @importVuexNamespace.State existingGroupsWithoutMatch!: IGroupOption[]

  @importVuexNamespace.State updating!: boolean
}

export default ErrorHandler

</script>

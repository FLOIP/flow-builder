<template>
  <div class="error-handler">
    <div v-if="updating">
      <br>
      <div
        class="spinner-border"
        role="status">
        <span class="sr-only">{{ 'flow-builder.loading' | trans }}</span>
      </div>
    </div>
    <div
      v-if="!flowError && !!flowJsonText"
      class="alert alert-success mt-3"
      role="alert">
      <font-awesome-icon :icon="['far', 'check-circle']" />
      {{ 'flow-builder.import-success' | trans }}
    </div>
    <div
      v-if="flowError"
      class="alert alert-danger mt-3"
      role="alert">
      <i class="glyphicon glyphicon-exclamation-sign" />
      {{ flowError | trans(flowErrorInterpolations) }}
    </div>
    <div
      v-if="hasUnsupportedBlockClasses"
      class="alert alert-danger mt-3"
      role="alert">
      <i class="glyphicon glyphicon-exclamation-sign" />
      {{ `${trans('flow-builder.unsupported-blocks-detected')}: ${unsupportedBlockClassesList}` }}
    </div>
    <import-matcher
      v-if="languagesMissing"
      class="mt-2"
      :missing-matches="missingLanguages"
      type-id="id"
      type-label="label"
      type="language"
      :existing-options-without-match="existingLanguagesWithoutMatch"
      match-not-found-text="flow-builder.match-for-languages-not-found"
      @reactToMatch="handleMatchLanguage" />
    <import-matcher
      v-if="propertiesMissing"
      class="mt-2"
      :missing-matches="missingProperties"
      type-id="name"
      type-label="name"
      type="property"
      :existing-options-without-match="existingPropertiesWithoutMatch"
      match-not-found-text="flow-builder.match-for-properties-not-found"
      @reactToMatch="handleMatchProperty" />
    <import-matcher
      v-if="groupsMissing"
      class="mt-2"
      :missing-matches="missingGroups"
      type-id="id"
      type-label="group_name"
      type="group"
      :existing-options-without-match="existingGroupsWithoutMatch"
      match-not-found-text="flow-builder.match-for-groups-not-found"
      @reactToMatch="handleMatchGroup" />
  </div>
</template>

<script lang="ts">
import Lang from '@/lib/filters/lang'
import {Component} from 'vue-property-decorator'
import Vue from 'vue'
import {Getter, namespace} from 'vuex-class'
import {mixins} from 'vue-class-component'
import {IContext} from '@floip/flow-runner'
import {ILanguage} from '@floip/flow-runner/dist/flow-spec/ILanguage'
import {IContactPropertyOption} from '@/store/flow/block-types/Core_SetContactPropertyStore'
import {IGroupOption} from '@/store/flow/block-types/Core_SetGroupMembershipStore'
import {BlockClasses} from '@/lib/types'

const importVuexNamespace = namespace('flow/import')

@Component({})
export class ErrorHandler extends mixins(Lang) {
  handleMatchLanguage(oldLanguage: ILanguage, matchingNewLanguage: ILanguage): void {
    this.matchLanguage({oldLanguage, matchingNewLanguage})
  }

  handleMatchProperty(
    oldProperty: { name: string, blockIds: string[] },
    matchingNewProperty: IContactPropertyOption,
  ): void {
    this.matchProperty({oldProperty, matchingNewProperty})
  }

  handleMatchGroup(
    oldGroup: { id: string, group_name: string, blockIds: string[] },
    matchingNewGroup: IGroupOption,
  ): void {
    this.matchGroup({oldGroup, matchingNewGroup})
  }

  @Getter blockClasses!: BlockClasses

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

  @importVuexNamespace.State flowErrorInterpolations!: object | null

  @importVuexNamespace.State flowContainer!: IContext

  @importVuexNamespace.State missingLanguages!: ILanguage[]

  @importVuexNamespace.State existingLanguagesWithoutMatch!: ILanguage[]

  @importVuexNamespace.State missingProperties!: { name: string, blockIds: string[] }[]

  @importVuexNamespace.State existingPropertiesWithoutMatch!: IContactPropertyOption[]

  @importVuexNamespace.State missingGroups!: { id: string, group_name: string, blockIds: string[] }[]

  @importVuexNamespace.State existingGroupsWithoutMatch!: IGroupOption[]

  @importVuexNamespace.State updating!: boolean

  @importVuexNamespace.State flowJsonText!: string
}

export default ErrorHandler

</script>

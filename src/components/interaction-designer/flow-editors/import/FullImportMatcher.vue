<template>
  <div class="error-handler-v2">
    <import-matcher
      v-if="languagesMissing"
      :existing-options-without-match="existingLanguagesWithoutMatch"
      :missing-matches="missingLanguages"
      class="mt-2"
      match-not-found-text="flow-builder.match-for-languages-not-found"
      type="language"
      type-id="id"
      type-label="label"
      @reactToMatch="handleMatchLanguage" />
    <import-matcher
      v-if="propertiesMissing"
      :existing-options-without-match="existingPropertiesWithoutMatch"
      :missing-matches="missingProperties"
      class="mt-2"
      match-not-found-text="flow-builder.match-for-properties-not-found"
      type="property"
      type-id="name"
      type-label="name"
      @reactToMatch="handleMatchProperty" />
    <import-matcher
      v-if="groupsMissing"
      :existing-options-without-match="existingGroupsWithoutMatch"
      :missing-matches="missingGroups"
      class="mt-2"
      match-not-found-text="flow-builder.match-for-groups-not-found"
      type="group"
      type-id="id"
      type-label="group_name"
      @reactToMatch="handleMatchGroup" />
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'
import Lang from '@/lib/filters/lang'
import ImportMatcher from './ImportMatcher.vue'

export default {
  name: 'FullImportMatcher',
  components: {
    ImportMatcher,
  },
  mixins: [Lang],
  computed: {
    ...mapState('flow/import', [
      'missingLanguages',
      'missingProperties',
      'missingGroups',
      'existingLanguagesWithoutMatch',
      'existingPropertiesWithoutMatch',
      'existingGroupsWithoutMatch',
    ]),
    ...mapGetters('flow/import', [
      'languagesMissing',
      'propertiesMissing',
      'groupsMissing',
    ]),
  },
  methods: {
    ...mapActions('flow/import', [
      'matchLanguage',
      'matchProperty',
      'matchGroup',
    ]),
    handleMatchLanguage(oldLanguage, matchingNewLanguage) {
      this.matchLanguage({oldLanguage, matchingNewLanguage})
    },
    handleMatchProperty(oldProperty, matchingNewProperty) {
      this.matchProperty({oldProperty, matchingNewProperty})
    },

    handleMatchGroup(oldGroup, matchingNewGroup) {
      this.matchGroup({oldGroup, matchingNewGroup})
    },
  },
}
</script>

<style scoped>

</style>

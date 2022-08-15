<template>
  <div v-if="hasSomethingToImport" class="error-handler-v2">
    <div class="mt-4 ml-4 mr-4 mb-4">
      <h5>{{ trans('flow-builder.results') }}</h5>
      <div
        v-if="isSafeToImport && hasWarnings"
        class="alert alert-success mt-3"
        role="alert">
        <font-awesome-icon :icon="['fa', 'exclamation-triangle']" />
        {{ trans('flow-builder.success-with-warnings') }}
      </div>
      <div
        v-if="isSafeToImport && !hasWarnings"
        class="alert alert-success mt-3"
        role="alert">
        <font-awesome-icon :icon="['far', 'check-circle']" />
        {{ trans('flow-builder.import-success') }}
      </div>
      <div v-if="!isSafeToImport">
        <div
          class="alert alert-danger mt-3"
          role="alert">
          <i class="glyphicon glyphicon-exclamation-sign" />
          {{ trans('flow-builder.failure') }}
        </div>

        <h5>{{ trans('flow-builder.errors') }}</h5>
        <p>{{ trans('flow-builder.please-fix-errors-first') }}</p>
        <full-import-matcher />
        <tech-error-notifications
          :validation-errors="containerImportValidationTrueErrors"
          error-type="error"/>
      </div>

      <div v-if="hasWarnings"
           class="mt-4">
        <h5>{{ trans('flow-builder.warnings') }}</h5>
        <p>{{ trans('flow-builder.warnings-hint-on-import') }}</p>
        <tech-error-notifications
          :validation-errors="containerImportValidationWarningErrors"
          error-type="warning"/>
      </div>
    </div>
  </div>
</template>

<script>
import TechErrorNotifications from '@/components/interaction-designer/flow-editors/import/TechErrorNotifications.vue'
import FullImportMatcher from '@/components/interaction-designer/flow-editors/import/FullImportMatcher.vue'
import {mapGetters, mapState} from 'vuex'
import Lang from '@/lib/filters/lang'

export default {
  name: 'ErrorHandlerV2',
  components: {
    TechErrorNotifications,
    FullImportMatcher,
  },
  mixins: [Lang],
  computed: {
    ...mapState('flow/import', [
      'missingLanguages',
      'missingProperties',
      'missingGroups',
    ]),
    ...mapGetters('flow/import', [
      'hasSomethingToImport',
      'isSafeToImport',
      'hasWarnings',
      'containerImportValidationTrueErrors',
      'containerImportValidationWarningErrors',
      'containerImportValidationErrors',
      'languagesMissing',
      'propertiesMissing',
      'groupsMissing',
    ]),
  },
}
</script>

<style scoped>

</style>

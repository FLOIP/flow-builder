<template>
  <div v-if="hasSomethingToImport" class="error-handler-v2">
    <div class="mt-4 ml-4 mr-4 mb-4">
      <full-import-matcher />

      <h5>Result</h5>
      <div
        v-if="isSafeToImport && hasWarnings"
        class="alert alert-success mt-3"
        role="alert">
        <font-awesome-icon :icon="['fa', 'exclamation-triangle']" />
        Success, with warnings
      </div>
      <div
        v-if="isSafeToImport && !hasWarnings"
        class="alert alert-success mt-3"
        role="alert">
        <font-awesome-icon :icon="['far', 'check-circle']" />
        {{ trans('flow-builder.import-success') }}
      </div>
      <div
        v-if="!isSafeToImport"
        class="alert alert-danger mt-3"
        role="alert">
        <i class="glyphicon glyphicon-exclamation-sign" />
        Failure {{ }}
        <!--TODO: check why we use this in previous handler {{ flowError | trans(flowErrorInterpolations) }}-->
      </div>
      <div v-if="!isSafeToImport">
        <h5>Errors</h5>
        <p>Please fix these errors first</p>
        <tech-error-notifications
          :validation-errors="containerImportValidationTrueErrors"
          error-type="error"/>
      </div>

      <div v-if="hasWarnings"
           class="mt-4">
        <h5>Warning</h5>
        <p>These won't block you to import the flow, but you will need to fix them once imported</p>
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

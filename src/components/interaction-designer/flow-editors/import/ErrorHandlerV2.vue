<template>
  <div class="error-handler-v2">
    <div class="mt-4 ml-4 mr-4 mb-4">
      <h5>Result</h5>
      <div
        v-if="isSafeToImportValid && hasWarnings"
        class="alert alert-success mt-3"
        role="alert">
        <font-awesome-icon :icon="['far', 'check-circle']" />
        Success, with warnings
      </div>
      <div
        v-if="isSafeToImportValid && !hasWarnings"
        class="alert alert-success mt-3"
        role="alert">
        <font-awesome-icon :icon="['far', 'check-circle']" />
        {{ trans('flow-builder.import-success') }}
      </div>
      <div
        v-if="!isSafeToImportValid"
        class="alert alert-danger mt-3"
        role="alert">
        <i class="glyphicon glyphicon-exclamation-sign" />
        Failure
        <!--TODO: check why we use this in previous handler {{ flowError | trans(flowErrorInterpolations) }}-->
      </div>
<!--  TODO: handle this    <div-->
<!--        v-if="hasUnsupportedBlockClasses"-->
<!--        class="alert alert-danger mt-3"-->
<!--        role="alert">-->
<!--        <i class="glyphicon glyphicon-exclamation-sign" />-->
<!--        {{ `${trans('flow-builder.unsupported-blocks-detected')}: ${unsupportedBlockClassesList}` }}-->
<!--      </div>-->
      <div v-if="!isSafeToImportValid">
        <h5>Errors</h5>
        <p>Please fix these errors first</p>
        <tech-error-notifications
          :validation-errors="wholeContainerValidationTrueErrors"
          error-type="error"/>
      </div>

      <div v-if="hasWarnings"
           class="mt-4">
        <h5>Warning</h5>
        <p>These won't block you to import the flow, but you will need to fix them once imported</p>
        <tech-error-notifications
          :validation-errors="wholeContainerValidationWarningErrors"
          error-type="warning"/>
      </div>
    </div>
  </div>
</template>

<script>
import TechErrorNotifications from '@/components/interaction-designer/flow-editors/import/TechErrorNotifications.vue'
import {mapState} from 'vuex'
import Lang from '@/lib/filters/lang'

const TRUE_ERROR_KEY_WORDS = ['required', 'additionalProperties', 'error']

export default {
  name: 'ErrorHandlerV2',
  components: {
    TechErrorNotifications,
  },
  mixins: [Lang],
  computed: {
    ...mapState('validation', ['validationStatuses']),
    ...mapState('flow', ['container_uuid']),
    isSafeToImportValid() {
      return Array.isArray(this.wholeContainerValidationTrueErrors) && this.wholeContainerValidationTrueErrors.length === 0
    },
    hasWarnings() {
      return this.wholeContainerValidationWarningErrors !== undefined && this.wholeContainerValidationWarningErrors.length > 0
    },
    wholeContainerValidationTrueErrors() {
      return this.wholeContainerValidationErrors?.filter(ajvError => TRUE_ERROR_KEY_WORDS.includes(ajvError.keyword))
    },
    wholeContainerValidationWarningErrors() {
      return this.wholeContainerValidationErrors?.filter(ajvError => !TRUE_ERROR_KEY_WORDS.includes(ajvError.keyword))
    },
    wholeContainerValidationErrors() {
      if (this.container_uuid !== undefined) {
        return this.validationStatuses?.whole_container?.ajvErrors ?? []
      } else {
        return []
      }
    },
  },
}
</script>

<style scoped>

</style>

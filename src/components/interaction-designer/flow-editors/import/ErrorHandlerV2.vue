<template>
  <div class="error-handler-v2">
    <div class="mt-4 ml-4 mr-4 mb-4">
      <h5>Result</h5>
      <div
        v-if="isSafeToImport && hasWarnings"
        class="alert alert-success mt-3"
        role="alert">
        <font-awesome-icon :icon="['far', 'check-circle']" />
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
      <div v-if="!isSafeToImport">
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
import {mapGetters} from 'vuex'
import Lang from '@/lib/filters/lang'

export default {
  name: 'ErrorHandlerV2',
  components: {
    TechErrorNotifications,
  },
  mixins: [Lang],
  computed: {
    ...mapGetters('flow/import', [
      'isSafeToImport',
      'hasWarnings',
      'wholeContainerValidationTrueErrors',
      'wholeContainerValidationWarningErrors',
      'wholeContainerValidationErrors',
    ]),
  },
}
</script>

<style scoped>

</style>

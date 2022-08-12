<template>
  <div class="tech-error-notification">
    <div v-for="(ajvError, key) in wholeContainerValidationErrors" :key="key">
      <a aria-controls="collapseExample" aria-expanded="false" data-toggle="collapse" href="#collapseExample" role="button">
        Link with href {{ ajvError }}
      </a>
      <div id="collapseExample" class="collapse">
        <div class="card card-body">
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'

export default {
  name: 'TechErrorNotifications',
  computed: {
    ...mapState('validation', ['validationStatuses']),
    ...mapState('flow', ['container_uuid']),
    wholeContainerValidationErrors() {
      if (this.container_uuid !== undefined) {
        return this.validationStatuses[`whole_container/${this.container_uuid}`]?.ajvErrors
      } else {
        return []
      }
    },
  },
}
</script>

<style scoped>

</style>

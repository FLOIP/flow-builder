<template>
  <div class="notifications-panel alert alert-danger row d-flex" role="alert">
    <span class="align-self-center">You have 1 block that has validation issue.</span>
    <div class="dropdown">
      <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
        Locate blocks to fix issue
        <span class="caret"></span>
      </button>
      <ul class="notification dropdown-menu" aria-labelledby="dropdownMenu1">
        <li v-for="(error, key) in flattenErrorMessages">
          <div class="card">
            <div class="card-body">
              {{error}}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Lang from '@/lib/filters/lang';
import { mapGetters, mapState } from 'vuex';

export default {
  mixins: [Lang],
  computed: {
    ...mapGetters('validation', ['flattenErrorMessages']),
    ...mapState('validation', ['validationStatuses'])
  }

}
</script>

<style scoped>
.notifications-panel {
  position: fixed;
  width: 100vw;
  top: 60px;
}
.notification {
  width: 500px;
  padding: 0;
}
</style>

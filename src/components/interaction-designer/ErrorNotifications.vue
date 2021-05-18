<template>
  <div class="notifications-panel alert alert-danger row d-flex" role="alert">
    <span class="align-self-center">You have 1 block that has validation issue.</span>
    <div class="dropdown">
      <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
        Locate blocks to fix issue
        <span class="caret"></span>
      </button>
      <ul class="notification dropdown-menu" aria-labelledby="dropdownMenu1">
        <li v-for="(status, key) in statuses">
          <div class="card card-deck" v-for="error in status.ajvErrors">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <b>{{status.type}}</b>
                <button type="button" class="btn btn-link" @click="fixIssue(key, error.dataPath, status)">
                  Fix Issue
                </button>
              </div>
              {{error.dataPath}} - {{error.message}}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Lang from '@/lib/filters/lang';
import { mapGetters } from 'vuex';

export default {
  mixins: [Lang],
  computed: {
    ...mapGetters('validation', ['validationStatuses']),

    statuses() {
      return this.validationStatuses
    }
  },
  methods: {
    fixIssue(key, dataPath, status) {
      const field = key + dataPath
      if (status.type === 'flow') {
        this.$router.push({
          name: 'flow-details',
        })
      } else {
        const blockId = key.replace('block/','')
        this.$router.push({
          name: 'block-scroll-to-anchor',
          params: { blockId, field },
        })
      }
    }
  }

}
</script>

<style scoped lang="scss">
.notifications-panel {
  position: fixed;
  width: 100vw;
  top: 60px;
  z-index: 2 * 10;
}
.notification {
  width: 500px;
  padding: 0;
  max-height: 500px;
  overflow-y: scroll;
}
</style>

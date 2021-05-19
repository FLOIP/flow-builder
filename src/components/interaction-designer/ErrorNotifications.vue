<template>
  <main>
    <section class="notifications-panel alert alert-danger row d-flex mb-0" role="alert">
      <span class="align-self-center ml-2">You have a validation issue with your flow</span>
      <button type="button" class="btn btn-link text-dark" @click="fixIssue(key, error.dataPath, status)">
        Fix Issue
      </button>
    </section>
    <section class="notifications-panel alert alert-danger row d-flex" role="alert">
      <span class="align-self-center ml-2">You have 1 block(s) that has validation issue.</span>
      <div class="dropdown">
        <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="true">
          Locate blocks to fix issue
          <span class="caret"></span>
        </button>
        <ul class="notification dropdown-menu" aria-labelledby="dropdownMenu1">
          <li v-for="(status, key) in statuses">
            <div class="card card-deck" v-for="error in status.ajvErrors">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <b>{{ status.type }}</b>
                  <button type="button" class="btn btn-link text-dark" @click="fixIssue(key, error.dataPath, status)">
                    Fix Issue
                  </button>
                </div>
                <span class="error-message">{{ error.dataPath }} - {{ error.message }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import Lang from '@/lib/filters/lang'
import { mapGetters } from 'vuex'

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
      if (status.type === 'flow') {
        this.$router.push({
          name: 'flow-details',
        });
      } else {
        const blockId = key.replace('block/', '');
        this.$router.push({
          name: 'block-scroll-to-anchor',
          params: {
            blockId,
            field: dataPath
          },
        })
      }
    }
  }

};
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

.card {
  background: #F8F2F2;
}

.error-message {
  color: #f96b6d;
}
</style>

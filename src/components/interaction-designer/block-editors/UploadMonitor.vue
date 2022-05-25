<template>
  <div class="upload-monitor">
    <div
      v-if="hasProgress"
      class="upload-monitor-progress">
      <h6>{{ 'flow-builder.uploading' | trans }}&hellip; {{ upload.file.name }}</h6>

      <div class="progress">
        <b-progress
          :value="progress * 1"
          show-value
          animated
          class="mb-3" />
      </div>
    </div>

    <p
      v-if="isFailure"
      class="text-danger small">
      {{ 'flow-builder.error-uploading-file-try-again' | trans }}
      <span
        v-if="upload.message"
        class="details">({{ upload.message }})</span>
    </p>

    <slot v-if="!hasProgress" />
  </div>
</template>

<script lang="js">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions,@typescript-eslint/unbound-method */
import {lang} from '@/lib/filters/lang'
import {forEach, get} from 'lodash'

import {mapState} from 'vuex'
import {BProgress} from 'bootstrap-vue'
import multimediaUpload, {Statuses as UploadStatuses} from '@/store/trees/multimediaUpload'

export const UploadMonitor = {
  components: {BProgress},
  mixins: [lang],
  props: ['uploadKey'],

  computed: {
    ...mapState('multimediaUpload', ['uploadsById', 'uploadIdsByKey']),

    upload() {
      return this.uploadsById[this.uploadIdsByKey[this.uploadKey]]
    },

    hasProgress() {
      return this.upload
        && this.upload.status !== UploadStatuses.SUCCESS
        && this.upload.status !== UploadStatuses.FAILURE
    },

    isFailure() {
      return this.upload && this.upload.status === UploadStatuses.FAILURE
    },

    progress() {
      return get(this.upload, 'progress', 0) * 100
    },
  },

  created() {
    const {$store} = this
    const modules = {
      multimediaUpload,
    }

    forEach(modules, (v, k) => !$store.hasModule(k) && $store.registerModule(k, v))
  },
}
export default UploadMonitor
</script>

<style lang="scss">
.progress {
  margin-bottom: 0.5em;
}
</style>

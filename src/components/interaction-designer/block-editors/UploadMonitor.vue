<template>
  <div class="upload-monitor">
    <div v-if="hasProgress" class="upload-monitor-progress">
      <h6>{{ 'trees.uploading' | trans }}&hellip; {{ upload.file.name }}</h6>

      <div class="progress">
        <progress-bar :now="progress.toFixed(1) * 1" label type="default" striped animated/>
      </div>
    </div>

    <p v-if="isFailure" class="text-danger small">
      {{ 'trees.error-uploading-file-try-again'|trans }}
      <span v-if="upload.message" class="details">({{ upload.message }})</span>
    </p>

    <slot v-if="!hasProgress"/>
  </div>
</template>

<script>
import lang from '@/lib/filters/lang';
import lodash, { forEach } from 'lodash';

import { mapState } from 'vuex';
import { progressbar as ProgressBar } from 'vue-strap';
import multimediaUpload, { Statuses as UploadStatuses } from '@/store/trees/multimediaUpload';

export default {
  props: ['uploadKey'],

  mixins: [lang],

  components: { ProgressBar },

  computed: {
    ...mapState('multimediaUpload', ['uploadsById', 'uploadIdsByKey']),

    upload() {
      return this.uploadsById[this.uploadIdsByKey[this.uploadKey]];
    },

    hasProgress() {
      return this.upload
          && this.upload.status !== UploadStatuses.SUCCESS
          && this.upload.status !== UploadStatuses.FAILURE;
    },

    isFailure() {
      return this.upload && this.upload.status === UploadStatuses.FAILURE;
    },

    progress() {
      return lodash.get(this.upload, 'progress', 0) * 100;
    },
  },

  created() {
    const {$store} = this
    const modules = {
      multimediaUpload,
    }

    forEach(modules, (v, k) => !$store.hasModule(k) && $store.registerModule(k, v))
  }
};
</script>

<style lang="scss">
.progress {
  margin-bottom: 0.5em;
}
</style>

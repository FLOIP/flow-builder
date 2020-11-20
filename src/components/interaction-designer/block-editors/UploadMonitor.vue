<template>
  <div class="upload-monitor">
    <div v-if="hasProgress" class="upload-monitor-progress">
      <h6>Uploading&hellip; {{upload.file.name}}</h6>

      <div class="progress">
        <progress-bar :now="progress.toFixed(1)" label type="default" striped animated />
      </div>
    </div>

    <p v-if="isFailure" class="text-danger small">
      {{'trees.error-uploading-file-try-again'|trans}}
      <span v-if="upload.message" class="details">({{upload.message}})</span>
    </p>

    <slot v-if="!hasProgress" />
  </div>
</template>

<script>
  import lang from 'lib/filters/lang'
  import lodash from 'lodash'

  import {mapState} from 'vuex'
  import {progressbar as ProgressBar} from 'vue-strap'
  import {Statuses as UploadStatuses} from '../../stores/multimediaUpload'

  export default {
    props: ['uploadKey'],

    mixins: [lang],

    components: {ProgressBar},

    computed: {
      ...mapState({
        uploadsById: ({multimediaUpload: {uploadsById}}) => uploadsById,
        uploadIdsByKey: ({multimediaUpload: {uploadIdsByKey}}) => uploadIdsByKey,
      }),

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
        return lodash.get(this.upload, 'progress', 0) * 100
      },
    },
  }
</script>

<style lang="scss">
  .progress {
    margin-bottom: 0.5em;
  }
</style>

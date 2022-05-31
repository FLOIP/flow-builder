<template>
  <div class="upload-monitor">
    <div
      v-if="hasProgress"
      class="upload-monitor-progress">
      <h6>{{ 'trees.uploading' | trans }}&hellip; {{ upload.file.name }}</h6>

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
      {{ 'trees.error-uploading-file-try-again'|trans }}
      <span
        v-if="upload.message"
        class="details">({{ upload.message }})</span>
    </p>

    <slot v-if="!hasProgress" />
  </div>
</template>

<script lang="ts">
import Lang from '@/lib/filters/lang'
import {get} from 'lodash'
import {mixins} from 'vue-class-component'
import {Component, Prop} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import {BProgress} from 'bootstrap-vue'
import multimediaUpload, {Statuses as UploadStatuses} from '@/store/trees/multimediaUpload'

const multimediaUploadNamespace = namespace('multimediaUpload')

type Upload = {
  progress: number,
  status: Map<string, number>,
}

@Component({
  components: {
    BProgress,
  },
})
export class UploadMonitor extends mixins(Lang) {
  @Prop({type: String, required: true}) readonly uploadKey!: string

  @multimediaUploadNamespace.State uploadsById!: Record<string, Upload>
  @multimediaUploadNamespace.State uploadIdsByKey!: Record<string, string>

  get upload(): Upload | null {
    return this.uploadsById[this.uploadIdsByKey[this.uploadKey]] ?? null
  }

  get hasProgress(): boolean {
    return this.upload !== null
      && this.upload.status !== UploadStatuses.SUCCESS
      && this.upload.status !== UploadStatuses.FAILURE
  }

  get isFailure(): boolean {
    return this.upload !== null && this.upload.status === UploadStatuses.FAILURE
  }

  get progress(): number {
    return get(this.upload, 'progress', 0) * 100
  }

  created(): void {
    const $store = this.$store
    const moduleName = 'multimediaUpload'

    if (!$store.hasModule(moduleName)) {
      $store.registerModule(moduleName, multimediaUpload)
    }
  }
}

export default UploadMonitor
</script>

<style lang="scss">
.progress {
  margin-bottom: 0.5em;
}
</style>

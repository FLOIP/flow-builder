<template>
  <div
    v-if="isFeatureCallToRecordEnabled"
    class="phone-recorder">
    <phone-recording-recorder-selector
      v-model="callConfig"
      :is-modal-visible="isRecorderSelectorVisible"
      @input="handleRecorderSelectionChanged" />
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component'
import {Prop} from 'vue-property-decorator'
import {Getter, State} from 'vuex-class'
import {Recorder} from '@/components/interaction-designer/block-editors/PhoneRecordingRecorderSelector.vue'

@Options({})
export class PhoneRecorder extends Vue {
  @Prop({type: String, required: true}) readonly recordingKey!: string

  /*
   * This is set by hooking into the v-model property of <phone-recording-recorder-selector v-model="callConfig">
   * which $emits a new value that results in setting this variable by reference.
   */
  callConfig: Partial<{ recorder: Recorder, description: string }> = {}

  handleRecorderSelectionChanged(): void {
    this.$store.commit('setAudioRecordingConfigVisibilityForSelectedBlock', {isVisible: false})

    if (this.callConfig.recorder === null) {
      return
    }

    // noinspection PointlessBooleanExpressionJS
    const callConfig = {
      key: this.recordingKey,
      description: this.callConfig.description,
      ...this.callConfig.recorder,
    }

    this.$store.dispatch('startAudioRecordingFor', callConfig)
  }

  // TODO: Deprecate (this + setAudioRecordingConfigVisibilityForSelectedBlock) in favor of modal + local state
  @State(({audio: {recording: {isRecorderSelectorVisible}}}) => isRecorderSelectorVisible) isRecorderSelectorVisible!: boolean
  @Getter isFeatureCallToRecordEnabled!: boolean
}

export default PhoneRecorder
</script>

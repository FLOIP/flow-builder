<template>
  <div v-if="isFeatureCallToRecordEnabled" class="phone-recorder">
    <phone-recording-recorder-selector
        v-model="callConfig"
        @input="handleRecorderSelectionChanged"
        :isModalVisible="isRecorderSelectorVisible"/>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import PhoneRecordingRecorderSelector from './PhoneRecordingRecorderSelector'

export default {
  components: {
    PhoneRecordingRecorderSelector,
  },

  props: ['recordingKey'],

  data() {
    return {
      // this is set by hooking into the v-model property of <phone-recording-recorder-selector v-model="callConfig">
      // which $emits a new value that results in setting this variable by reference.
      callConfig: null,
    }
  },

  computed: {
    ...mapState({
      // todo: deprecate (this + setAudioRecordingConfigVisibilityForSelectedBlock) in favor of modal + local state
      isRecorderSelectorVisible: ({ audio: { recording: { isRecorderSelectorVisible } } }) => isRecorderSelectorVisible,
    }),

    ...mapGetters(['isFeatureCallToRecordEnabled']),
  },

  methods: {
    handleRecorderSelectionChanged() {
      this.$store.commit('setAudioRecordingConfigVisibilityForSelectedBlock', { isVisible: false })

      if (!this.callConfig.recorder) {
        return
      }

      const callConfig = {
        key: this.recordingKey,
        description: this.callConfig.description,
        ...this.callConfig.recorder,
      }

      this.$store.dispatch('startAudioRecordingFor', callConfig)
    },
  },
}
</script>

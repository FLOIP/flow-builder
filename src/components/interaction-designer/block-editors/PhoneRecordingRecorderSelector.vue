<template>
  <b-modal
    size="lg"
    class="phone-recording-recorder-selector"
    no-close-on-backdrop
    no-close-on-esc
    :title="'flow-builder.select-a-caller-from-the-list-below' | trans"
    :visible="isModalVisible"
    :ok-title="'flow-builder.call-this-phone-number' | trans"
    :cancel-title="'flow-builder.close' | trans"
    @ok="handleModalClosed"
    @cancel="handleModalCancelled"
    @close="handleModalCancelled"
  >
    <div class="call-to-record-modal-table-container">
      <table class="table table-striped">
        <thead>
          <tr>
            <th class="recorder-selector-field"></th>
            <th>{{ "flow-builder.name" | trans }}</th>
            <th>{{ "flow-builder.phone-number" | trans }}</th>
          </tr>
        </thead>
        <tbody id="call-to-record-modal-list">
          <tr v-for="recorder in recorders" class="call-to-record-item">
            <td class="recorder-selector-field">
              <input
                v-model="selectedRecorder"
                type="radio"
                x-name="calltorecord_caller_select"
                :id="`call-to-record-caller-${recorder.id}`"
                :value="recorder"
              />
            </td>
            <td>
              <label
                :for="`call-to-record-caller-${recorder.id}`"
                @click="setSelectedRecorder(recorder)"
                >{{ recorder.name }}</label
              >
            </td>
            <td>
              <label
                :for="`call-to-record-caller-${recorder.id}`"
                @click="setSelectedRecorder(recorder)"
                >{{ recorder.phone }}</label
              >
            </td>
          </tr>
        </tbody>
      </table>

      <h4>{{ "flow-builder.add-a-description-to-this-recording" | trans }}</h4>
      <input
        v-model="description"
        type="text"
        class="form-control"
        rows="2"
        :placeholder="'flow-builder.optional-description' | trans"
      />

      <h4>{{ "flow-builder.add-a-new-recorder" | trans }}</h4>
      <table class="table">
        <tbody>
          <tr>
            <td class="recorder-selector-field">
              <input
                v-model="selectedRecorder"
                type="radio"
                name="calltorecord_caller_select"
                id="new_recorder_radio"
                :value="draft"
              />
            </td>
            <td>
              <input
                v-model="draft.name"
                type="text"
                :placeholder="'flow-builder.name' | trans"
                @click="selectNewRecorder"
                class="form-control"
              />
            </td>
            <td>
              <input
                v-model="draft.phone"
                type="text"
                :placeholder="'flow-builder.phone-number' | trans"
                @click="selectNewRecorder"
                class="form-control"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </b-modal>
</template>

<script>
import lang from '@/lib/filters/lang'
import lodash from 'lodash'
import {mapState} from 'vuex'
import {BModal} from 'bootstrap-vue'

export default {
  components: {
    BModal,
  },

  props: {
    isModalVisible: Boolean,
  },

  mixins: [lang],

  data() {
    return {
      selectedRecorder: null,
      description: null,
      draft: null,
    }
  },

  created() {
    this.reset()
  },

  computed: {
    ...mapState({
      recorders: ({
        audio: {
          recording: {recorders},
        },
      }) => recorders,
    }),
  },

  methods: {
    selectNewRecorder() {
      this.draft.isNew = true
      this.selectedRecorder = this.draft
    },
    setSelectedRecorder(recorder) {
      this.selectedRecorder = recorder
    },
    reset() {
      this.draft = {
        name: null,
        phone: null,
        isNew: true,
      }
      this.description = null
      this.selectedRecorder = null
    },

    handleModalClosed() {
      const {description} = this
      const value = lodash.clone(this.selectedRecorder)

      this.reset()
      this.$emit('input', {
        value,
        recorder: value,
        description,
      })
    },

    handleModalCancelled() {
      this.reset()

      const {description} = this
      const value = lodash.clone(this.selectedRecorder)

      this.$emit('input', {
        value,
        recorder: value,
        description,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.phone-recording-recorder-selector {
  padding-top: 3em;

  .modal-body {
    h4,
    .h4 {
      margin-top: 2em;
    }
  }

  .table {
    .recorder-selector-field {
      width: 3em;
      text-align: center;
      vertical-align: middle;
    }
  }
}
</style>

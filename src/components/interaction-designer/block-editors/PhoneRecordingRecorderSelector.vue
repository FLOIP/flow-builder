<template>
  <b-modal
    size="lg"
    class="phone-recording-recorder-selector"
    no-close-on-backdrop
    no-close-on-esc
    :title="'flow-builder.select-a-caller-from-the-list-below'|trans"
    :visible="isModalVisible"
    :ok-title="'flow-builder.call-this-phone-number'|trans"
    :cancel-title="'flow-builder.close'|trans"
    @ok="handleModalClosed"
    @cancel="handleModalCancelled"
    @close="handleModalCancelled">
    <div class="call-to-record-modal-table-container">
      <table class="table table-striped">
        <thead>
          <tr>
            <th class="recorder-selector-field" />
            <th>{{ 'flow-builder.name'|trans }}</th>
            <th>{{ 'flow-builder.phone-number'|trans }}</th>
          </tr>
        </thead>
        <tbody id="call-to-record-modal-list">
          <tr
            v-for="(recorder, i) in recorders"
            :key="i"
            class="call-to-record-item">
            <td class="recorder-selector-field">
              <input
                :id="`call-to-record-caller-${recorder.id}`"
                v-model="selectedRecorder"
                type="radio"
                x-name="calltorecord_caller_select"
                :value="recorder">
            </td>
            <td>
              <label
                :for="`call-to-record-caller-${recorder.id}`"
                @click="setSelectedRecorder(recorder)">{{ recorder.name }}</label>
            </td>
            <td>
              <label
                :for="`call-to-record-caller-${recorder.id}`"
                @click="setSelectedRecorder(recorder)">{{ recorder.phone }}</label>
            </td>
          </tr>
        </tbody>
      </table>

      <h4>{{ 'flow-builder.add-a-description-to-this-recording'|trans }}</h4>
      <input
        v-model="description"
        type="text"
        class="form-control"
        rows="2"
        :placeholder="'flow-builder.optional-description'|trans">

      <h4>{{ 'flow-builder.add-a-new-recorder'|trans }}</h4>
      <table class="table">
        <tbody>
          <tr>
            <td class="recorder-selector-field">
              <input
                id="new_recorder_radio"
                v-model="selectedRecorder"
                type="radio"
                name="calltorecord_caller_select"
                :value="draft">
            </td>
            <td>
              <input
                v-model="draft.name"
                type="text"
                :placeholder="'flow-builder.name'|trans"
                class="form-control"
                @click="selectNewRecorder">
            </td>
            <td>
              <input
                v-model="draft.phone"
                type="text"
                :placeholder="'flow-builder.phone-number'|trans"
                class="form-control"
                @click="selectNewRecorder">
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </b-modal>
</template>

<script lang="ts">
import {BModal} from 'bootstrap-vue'
import {clone} from 'lodash'
import {mixins} from 'vue-class-component'
import {Component, Prop} from 'vue-property-decorator'
import {State} from 'vuex-class'
import Lang from '@/lib/filters/lang'

type Recorder = {
  name: string | null,
  phone: string | null,
  isNew: boolean,
} | null

@Component({
  components: {BModal},
})
export class PhoneRecordingRecorderSelector extends mixins(Lang) {
  @Prop({type: Boolean, required: true}) readonly isModalVisible!: boolean

  description = null
  draft: Recorder = null
  selectedRecorder: Recorder = null

  created(): void {
    this.reset()
  }

  selectNewRecorder(): void {
    this.draft!.isNew = true
    this.selectedRecorder = this.draft
  }

  setSelectedRecorder(recorder: Recorder): void {
    this.selectedRecorder = recorder
  }

  reset(): void {
    this.draft = {
      name: null,
      phone: null,
      isNew: true,
    }
    this.description = null
    this.selectedRecorder = null
  }

  handleModalClosed(): void {
    const
      {description} = this
    const value = clone(this.selectedRecorder)

    this.reset()
    this.$emit('input', {
      value,
      recorder: value,
      description,
    })
  }

  handleModalCancelled(): void {
    this.reset()

    const
      {description} = this
    const value = clone(this.selectedRecorder)

    this.$emit('input', {
      value,
      recorder: value,
      description,
    })
  }

  @State(({audio: {recording: {recorders}}}) => recorders) recorders: any
}

export default PhoneRecordingRecorderSelector
</script>

<style lang="scss" scoped>
.phone-recording-recorder-selector {
  padding-top: 3em;

  .modal-body {
    h4, .h4 {
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

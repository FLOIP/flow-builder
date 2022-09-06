<template>
  <BModal
    size="lg"
    class="phone-recording-recorder-selector"
    no-close-on-backdrop
    no-close-on-esc
    :title="trans('flow-builder.select-a-caller-from-the-list-below')"
    :visible="isModalVisible"
    :ok-title="trans('flow-builder.call-this-phone-number')"
    :cancel-title="trans('flow-builder.close')"
    @ok="handleModalClosed"
    @cancel="handleModalCancelled"
    @close="handleModalCancelled">
    <div class="call-to-record-modal-table-container">
      <table class="table table-striped">
        <thead>
          <tr>
            <th class="recorder-selector-field" />
            <th>{{ trans('flow-builder.name') }}</th>
            <th>{{ trans('flow-builder.phone-number') }}</th>
          </tr>
        </thead>
 
      </table>
    </div>
  </BModal>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, onBeforeMount } from 'vue'
import {BModal} from 'bootstrap-vue-3'
import {clone} from 'lodash'
// import {mixins, Options} from 'vue-class-component'
// import {Prop} from 'vue-property-decorator'
// import {State} from 'vuex-class'
import Lang from '@/lib/filters/lang'

export type Recorder = {
  name: string | null,
  phone: string | null,
  isNew: boolean,
} | null

export default defineComponent({
  props: {
    isModalVisible: {
      required: true,
      default: Boolean,
    }
  },
  emits: ["input"],
  components: {BModal},
  mixins: [Lang],
  setup(props, { emit }){
    let description: any = ref<any>(null)
    let selectedRecorder:any = reactive<any>({
      name: "",
      phone: "",
      isNew: true,
    })
    let draft = reactive<any>({
      name: "",
      phone: "",
      isNew: true,
    })

    function reset() {
      draft = {
        name: "",
        phone: "",
        isNew: true,
      }
      description = 
      selectedRecorder = ""
      }

    onBeforeMount(() => {
      reset()
    })

    function selectNewRecorder(): void {
      draft!.isNew = true
      selectedRecorder = draft
    }

    function setSelectedRecorder(recorder: Recorder): void {
      selectedRecorder = recorder
    }

    function handleModalClosed(): void {
      const value = clone(selectedRecorder)

      reset()
      emit('input', {
        value,
        recorder: value,
        description,
      })
    }

    function handleModalCancelled(){
      reset()
      const value = clone(selectedRecorder)

      emit('input', {
        value,
        recorder: value,
        description,
      })
    }

    return {
      description,
      selectedRecorder,
      selectNewRecorder,
      setSelectedRecorder,
      handleModalClosed,
      handleModalCancelled
    }
  },
});

// @Options({
//   data(){
//     return {
//       draft: null
//     }
//   },
//   components: {BModal},
// })
// export class PhoneRecordingRecorderSelector extends mixins(Lang) {
//   // description = null
//   // selectedRecorder: Recorder = null

//   created(): void {
//     this.reset()
//   }

//   selectNewRecorder(): void {
//     this.draft!.isNew = true
//     this.selectedRecorder = this.draft
//   }

//   setSelectedRecorder(recorder: Recorder): void {
//     this.selectedRecorder = recorder
//   }

//   reset(): void {
//     this.draft = {
//       name: null,
//       phone: null,
//       isNew: true,
//     }
//     this.description = null
//     this.selectedRecorder = null
//   }

//   handleModalClosed(): void {
//     const
//       {description} = this
//     const value = clone(this.selectedRecorder)

//     this.reset()
//     this.$emit('input', {
//       value,
//       recorder: value,
//       description,
//     })
//   }

//   handleModalCancelled(): void {
//     this.reset()

//     const
//       {description} = this
//     const value = clone(this.selectedRecorder)

//     this.$emit('input', {
//       value,
//       recorder: value,
//       description,
//     })
//   }
  
//   // @State(({audio: {recording: {recorders}}}) => recorders) recorders: unknown
// }

// export default PhoneRecordingRecorderSelector
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

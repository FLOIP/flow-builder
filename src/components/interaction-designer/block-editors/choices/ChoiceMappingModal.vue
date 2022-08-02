<template>
   <div class="mcq-choice-mapping-modal">
     <div class="form-group">
       <label>{{ trans('flow-builder.choice-options') }}</label><br>
       <button class="btn btn-primary btn-sm" @click="showModal">
         {{ trans('flow-builder.set-choice-options') }}
       </button>
     </div>

     <b-modal
       ref="edit-choice-mapping-modal"
       :ok-title="trans('flow-builder.confirm')"
       :title="trans('flow-builder.choice-options')"
       ok-only>
       <div>
         Lorem ipsum dolor sit amet !
       </div>
     </b-modal>
   </div>
</template>

<script>
import {BModal} from 'bootstrap-vue'
import Lang from '@/lib/filters/lang'

export default {
  comments: {
    BModal,
  },
  mixins: [Lang],

  methods: {
    showModal() {
      const editFlowModal = this.$refs['edit-choice-mapping-modal']
      if (editFlowModal !== undefined) {
        editFlowModal.show()
      } else {
        console.error('showModal', 'ref `edit-choice-mapping-modal` not found')
      }
    },
    hideModal() {
      const editFlowModal = this.$refs['edit-choice-mapping-modal']
      if (editFlowModal !== undefined) {
        editFlowModal.hide()
      } else {
        console.error('hideModal', 'ref `edit-choice-mapping-modal` not found')
      }
    },
  },

}
</script>

<style scoped>

</style>

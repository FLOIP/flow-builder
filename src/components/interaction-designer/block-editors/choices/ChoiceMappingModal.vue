<template>
   <div class="choice-mapping-modal">
     <div class="form-group">
       <label>{{ trans('flow-builder.choice-options') }}</label><br>
       <button class="btn btn-primary btn-sm" @click="showModal">
         {{ trans('flow-builder.set-choice-options') }}
       </button>
     </div>

     <b-modal
       ref="edit-choice-mapping-modal"
       :ok-title="trans('flow-builder.confirm')"
       size="lg"
       :title="trans('flow-builder.choice-options')"
       ok-only>
       <div class="choice-mapping-navs">
         <nav>
           <div id="choice-options-nav-tab" class="nav nav-tabs" role="tablist">
             <a
               v-if="hasVoiceMode"
               id="nav-voice-tab"
               aria-controls="nav-home" aria-selected="true"
               class="nav-item nav-link active" data-toggle="tab"
               href="#nav-voice"
               role="tab">
               {{ trans('flow-builder.voice') }} ({{ trans('flow-builder.all-languages') }})
             </a>
             <template v-if="hasTextMode">
               <a
                 v-for="({id: languageId, label: language}) in languages"
                 :id="`nav-lang-tab-${languageId}`"
                 :key="languageId"
                 :href="`#nav-lang-${languageId}`"
                 :title="language || trans('flow-builder.unknown-language')"
                 aria-controls="nav-profile"
                 aria-selected="false"
                 class="nav-item nav-link"
                 data-toggle="tab"
                 role="tab">
                 {{ trans('flow-builder.data-type-text')}} ({{ language || trans('flow-builder.unknown-language') }})
               </a>
             </template>
           </div>
         </nav>
         <div id="choice-options-nav-tab-content" class="tab-content">
           <div
             v-if="hasVoiceMode"
             id="nav-voice"
             aria-labelledby="nav-voice-tab"
             class="tab-pane fade show active"
             role="tabpanel">
            <!--TODO: VMO-6653-->
             content voice
           </div>
           <template v-if="hasTextMode">
             <div
               v-for="({id: languageId, label: language}) in languages"
               :id="`nav-lang-${languageId}`"
               :key="languageId"
               aria-labelledby="nav-lang-tab"
               class="tab-pane fade"
               role="tabpanel">
               <!--TODO: VMO-6654-->
               content {{ language }}
             </div>
           </template>
         </div>
       </div>
     </b-modal>
   </div>
</template>

<script>
import {BModal} from 'bootstrap-vue'
import Lang from '@/lib/filters/lang'
import {mapGetters} from 'vuex'
import {IBlock} from '@floip/flow-runner'

export default {
  comments: {
    BModal,
  },
  mixins: [Lang],

  props: {
    block: {type: IBlock, required: true},
  },

  computed: {
    ...mapGetters('flow', ['activeFlow', 'hasTextMode', 'hasVoiceMode']),
    languages() {
      return this.hasTextMode === true ? this.activeFlow.languages : []
    },
  },
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

<style lang="scss" scoped>
@import "../../../../scss/custom_variables";

/*override bootstrap style to match with design*/
.choice-mapping-navs .nav-link.active {
  background-color: transparent;
  border-bottom: 2px solid;
  color: $primary-900;
}

.choice-mapping-navs .nav-item {
  border-color: transparent;
}

.choice-mapping-navs .nav-tabs {
  border-bottom: none;
}
</style>

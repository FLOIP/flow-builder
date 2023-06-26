<template>
  <div class="choice-mapping-modal">
    <div class="form-group">
      <button
        :disabled="block.config.choices.length === 0"
        class="btn btn-primary btn-sm"
        data-cy="set-choice-options--btn"
        @click="showModal">
        {{ trans('flow-builder.set-choice-options') }}
      </button>
    </div>

    <b-modal
      ref="edit-choice-mapping-modal"
      :ok-title="trans('flow-builder.close')"
      :title="trans('flow-builder.choice-options')"
      ok-only
      size="lg">
      <div
        data-cy="choice-mapping-modal"
        v-if="shouldHaveTabs"
        class="choice-mapping-navs">
        <nav>
          <div
            id="choice-options-nav-tab"
            class="nav nav-tabs"
            role="tablist">
            <a
              v-if="hasVoiceMode"
              id="nav-voice-tab"
              data-cy="voice-tab"
              :class="{'active': hasVoiceMode}"
              aria-controls="nav-home"
              aria-selected="true"
              class="nav-item nav-link"
              data-toggle="tab"
              href="#nav-voice"
              role="tab">
              {{ trans('flow-builder.voice') }} ({{ trans('flow-builder.all-languages') }})
            </a>
            <template v-if="hasTextMode">
              <a
                v-for="({id: languageId, label: language, iso_639_3}, index) in textLanguages"
                :id="`nav-lang-tab-${languageId}`"
                :key="languageId"
                :data-cy="`text-tab-${iso_639_3}`"
                :class="{'active': !hasVoiceMode && hasTextMode && index === 0}"
                :href="`#nav-lang-${languageId}`"
                :title="language || trans('flow-builder.unknown-language')"
                aria-controls="nav-profile"
                aria-selected="false"
                class="nav-item nav-link"
                data-toggle="tab"
                role="tab">
                {{ trans('flow-builder.data-type-text') }} ({{ language || trans('flow-builder.unknown-language') }})
              </a>
            </template>
          </div>
        </nav>
        <div
          id="choice-options-nav-tab-content"
          class="tab-content">
          <div
            v-if="hasVoiceMode"
            id="nav-voice"
            :class="{'show active': hasVoiceMode}"
            aria-labelledby="nav-voice-tab"
            class="tab-pane fade"
            role="tabpanel">
            <div class="mt-3">
              <voice-mapping-table :block="block" />
            </div>
          </div>
          <template v-if="hasTextMode">
            <div
              v-for="({id: languageId, label: language}, index) in textLanguages"
              :id="`nav-lang-${languageId}`"
              :key="languageId"
              :class="{'show active': !hasVoiceMode && hasTextMode && index === 0}"
              aria-labelledby="nav-lang-tab"
              class="tab-pane fade"
              role="tabpanel">
              <div class="mt-3">
                <text-mapping-table
                  :block="block"
                  :lang-id="languageId" />
              </div>
            </div>
          </template>
        </div>
      </div>
      <div v-else>
        {{ trans('flow-builder.cannot-map-choices-hint') }}
      </div>
    </b-modal>
  </div>
</template>

<script>
import {BModal} from 'bootstrap-vue'
import Lang from '@/lib/filters/lang'
import {mapGetters} from 'vuex'
import {ISelectOneResponseBlock} from '@floip/flow-runner'
import VoiceMappingTable from './VoiceMappingTable.vue'
import TextMappingTable from './TextMappingTable.vue'

export default {
  name: 'ChoiceMappingModal',
  components: {
    BModal,
    VoiceMappingTable,
    TextMappingTable,
  },
  mixins: [Lang],

  props: {
    block: {
      type: ISelectOneResponseBlock,
      required: true,
    },
  },

  computed: {
    ...mapGetters('flow', ['activeFlow', 'hasTextMode', 'hasVoiceMode']),
    textLanguages() {
      return this.hasTextMode === true ? this.activeFlow.languages : []
    },
    shouldHaveTabs() {
      return this.hasVoiceMode === true || (this.hasTextMode === true && this.activeFlow.languages.length > 0)
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

<template>
  <div class="tree-sidebar-edit-block" data-block-type="LocationBlock">
    <h3 class="no-room-above">
      {{ 'trees.edit-location' | trans }}
    </h3>

    <block-title-input :label="'trees.question-title' | trans"/>

    <subscriber-property-map-coordinate-fields/>

    <choices-builder :api="{getShadowedLocationAt, updateLocationWith}">
      <template slot-scope="slot">
        <div class="panel panel-default location-choice" :class="{dimmed: slot.isAdditional}">
          <div class="panel-body">
            <div class="row">
              <div class="col-2">
                <span style="position: relative; top: 55px;">
                  {{ slot.label }}
                </span>
              </div>
              <div class="col-10">
                <div class="form-group">
                  <label>
                    {{ 'trees.location' | trans }}
                    <input type="text"
                        :value="(slot.choice || slot.api.getShadowedLocationAt(slot.i)).name"
                        class="form-control"
                        @input="slot.api.updateLocationWith('name', $event.target.value, slot.choice, slot.i, slot.updateChoiceAt)">
                  </label>
                </div>

                <div class="form-group xs-room-below row">
                  <label class="col-4 col-form-label">
                    {{ 'trees.lat' | trans }}
                  </label>
                  <div class="col-8">
                    <input type="number"
                        :value="(slot.choice || slot.api.getShadowedLocationAt(slot.i)).lat"
                        step="any"
                        class="form-control"
                        @input="slot.api.updateLocationWith('lat', $event.target.value, slot.choice, slot.i, slot.updateChoiceAt)">
                  </div>
                </div>
                <div class="form-group no-room-below row">
                  <label class="col-4 col-form-label">
                    {{ 'trees.lon' | trans }}
                  </label>
                  <div class="col-8">
                    <input type="number"
                        :value="(slot.choice || slot.api.getShadowedLocationAt(slot.i)).long"
                        step="any"
                        class="form-control"
                        @input="slot.api.updateLocationWith('long', $event.target.value, slot.choice, slot.i, slot.updateChoiceAt)">
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </template>
    </choices-builder>

    <div class="form-group">
      <label>{{ 'trees.choice-options' | trans }}</label>

      <br>

      <button class="btn btn-secondary btn-sm" @click="showSetChoiceOptionsModal">
        {{ 'trees.set-choice-options' | trans }}
      </button>
    </div>

    <block-no-valid-response-config></block-no-valid-response-config>
    <block-repeat-questions-config/>

    <block-response-timeout-config/>

    <vertical-block-content-editor
        v-if="selectedBlock"
        :block="selectedBlock"/>

    <block-social-content-editor/>

    <block-label-tags-input/>
    <block-starting-block-button/>
    <block-exit-block-button/>
    <block-code/>
    <block-set-choice-options-modal
        :is-choice-options-modal-visible="isChoiceOptionsModalVisible"
        path-to-choice-label="name"
        @hide="hideSetChoiceOptionsModal"/>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'

  import block from 'trees/mixins/Block'
  import BlockContentAutogenButton from '../block-editors/BlockContentAutogenButton'
  import lang from 'lib/filters/lang'
  import BlockLabelTagsInput from '../block-editors/BlockLabelTagsInput'
  import BlockNoValidResponseConfig from '../block-editors/BlockNoValidResponseConfig'
  import BlockRepeatQuestionsConfig from '../block-editors/BlockRepeatQuestionsConfig'
  import BlockResponseTimeoutConfig from '../block-editors/BlockResponseTimeoutConfig'
  import BlockSetChoiceOptionsModal from '../block-editors/BlockSetChoiceOptionsModal'
  import BlockSocialContentEditor from '../block-editors/BlockSocialContentEditor'
  import BlockStartingBlockButton from '../block-editors/BlockStartingBlockButton'
  import BlockTitleInput from '../block-editors/BlockTitleInput'
  import ChoicesBuilder from '../block-editors/ChoicesBuilder'
  import LegacyLocationBlock from './LocationBlock.legacy'
  import VerticalBlockContentEditor from '../block-editors/VerticalBlockContentEditor'
  import SubscriberPropertyMapCoordinateFields from './SubscriberPropertyMapCoordinateFields'

  export default {
    components: {
      BlockContentAutogenButton,
      SubscriberPropertyMapCoordinateFields,
      BlockLabelTagsInput,
      BlockNoValidResponseConfig,
      BlockRepeatQuestionsConfig,
      BlockResponseTimeoutConfig,
      BlockSetChoiceOptionsModal,
      BlockSocialContentEditor,
      BlockStartingBlockButton,
      BlockTitleInput,
      ChoicesBuilder,
      VerticalBlockContentEditor,
    },

    mixins: [
      block,
      lang,
      LegacyLocationBlock,
    ],

    computed: {
      ...mapGetters(['selectedBlock']),
    },

    data() {
      return {
        shadowedLocations: [],
        isChoiceOptionsModalVisible: false,
      }
    },

    methods: {
      isValidLocation(loc) {
        const { name, lat, long } = loc
        return name && lat && long && loc
      },

      getShadowedLocationAt(i) {
        return this.shadowedLocations[i] || (this.shadowedLocations[i] = { name: '', lat: '', long: '' })
      },

      updateLocationWith(key, val, loc, i, commit) {
        loc = loc || this.getShadowedLocationAt(i)
        loc[key] = val

        if (!this.isValidLocation(loc)) {
          return
        }

        commit(i, loc)
        this.shadowedLocations.splice(i, 1, null)
      },

      showSetChoiceOptionsModal() {
        this.isChoiceOptionsModalVisible = true
      },

      hideSetChoiceOptionsModal() {
        this.isChoiceOptionsModalVisible = false
      },
    },
  }
</script>
<style scoped>
  .location-choice {
    background: none;
    box-shadow: none;
    border-color: #ccc;
  }
</style>

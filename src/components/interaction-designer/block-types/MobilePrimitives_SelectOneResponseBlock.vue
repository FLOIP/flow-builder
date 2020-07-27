<template>
  <div>
    <h3 class="no-room-above">{{'flow-builder.edit-multiple-choice-question' | trans}}</h3>

    <block-name-editor :block="block" />
    <block-label-editor :block="block" />
    <block-semantic-label-editor :block="block" />

    <resource-editor v-if="promptResource"
                     :resource="promptResource"
                     :flow="flow" />

    <choices-builder :block="block"
                     :flow="flow" />

    <first-block-editor-button
        :flow="flow"
        :block-id="block.uuid" />

    <exit-block-editor-toggle
        :flow="flow"
        :block-id="block.uuid" />

    <block-id :block="block" />

    <!--    <div class="form-group">-->
<!--      <label>{{ 'flow-builder.choice-options' | trans }}</label><br/>-->
<!--      <button @click="showSetChoiceOptionsModal" class="btn btn-default btn-sm">{{ 'flow-builder.set-choice-options' | trans }}</button>-->
<!--    </div>-->

<!--    <block-output-branching-config></block-output-branching-config>-->

<!--    <block-no-valid-response-config></block-no-valid-response-config>-->

<!--    <block-repeat-questions-config></block-repeat-questions-config>-->

<!--    <block-response-timeout-config></block-response-timeout-config>-->

    <!--        :app-config="appConfig"-->

<!--    <block-social-content-editor />-->

<!--    <block-label-tags-input></block-label-tags-input>-->


<!--    <block-set-subscriber-property-config></block-set-subscriber-property-config>-->
<!--    <block-summary-config></block-summary-config>-->
<!--    <block-code></block-code>-->

<!--    <block-set-choice-options-modal @hide="hideSetChoiceOptionsModal"-->
<!--        :isChoiceOptionsModalVisible="isChoiceOptionsModalVisible"-->
<!--        :isLocalizationConfigurationModeEnabled="true"></block-set-choice-options-modal>-->
  </div>
</template>

<script lang="ts">
  import {IBlock, IFlow} from '@floip/flow-runner'
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator'

  import lang from '@/lib/filters/lang'
  import BlockNameEditor from '../block-editors/NameEditor.vue'
  import BlockLabelEditor from '../block-editors/LabelEditor.vue'
  import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'

  import ChoicesBuilder from '../block-editors/ChoicesBuilder.vue'
  import ExitBlockEditorToggle from '../flow-editors/ExitBlockEditorToggle.vue'
  import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
  import ResourceEditor from '../resource-editors/ResourceEditor.vue'
  import BlockId from '../block-editors/BlockId.vue'

  // todo: get this using a build more similar to laravel-mix (aka webpack merge) -- [minimum: get scss working in this SFC]
  // import {createFlowBlockToViamoSpecAdapterFor} from '../FlowToViamoSpecAdapter'
  import {mapGetters, mapMutations} from 'vuex'
  import SelectOneStore, {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_SelectOneResponseBlockStore'

  @Component({
    props: {
      block: {
        type: Object as () => IBlock,
        default: null,
      },

      flow: {
        type: Object as () => IFlow,
        default: null,
      },
    },

    mixins: [lang],

    components: {
      BlockNameEditor,
      BlockLabelEditor,
      BlockSemanticLabelEditor,
      ChoicesBuilder,
      ExitBlockEditorToggle,
      FirstBlockEditorButton,
      ResourceEditor,
      BlockId,
    },

    computed: {
      ...mapGetters('flow', ['resourcesByUuid']),
    },

    methods: {
      ...mapMutations(`flow/${BLOCK_TYPE}`, ['addChoice'])
    },
  })
  export class SelectOneResponseBlock extends Vue {
    created() {
      if (!this.$store.state.flow[BLOCK_TYPE]) {
        this.$store.registerModule(['flow', BLOCK_TYPE], SelectOneStore)
      }
    }

    // get viamoBlock() {
    //   // @ts-ignore - TS2339: Property 'block' does not exist on type 'SelectOneResponseBlock'.
    //   return createFlowBlockToViamoSpecAdapterFor(this.block)
    // }

    get promptResource() {
      return this.resourcesByUuid[this.block.config.prompt as '95bd9e4a-9300-400a-9f61-8ede02e10e03']
    }

    handleAddChoiceTriggered() {
      this.addChoice({})
    }
  }

  export default SelectOneResponseBlock
</script>

<style>

</style>

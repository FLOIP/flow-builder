<template>
  <div class="resource-editor">
    <label v-if="label">{{label}}</label>
    <template v-for="{id: languageId, name: language} in flow.languages">
      <div class="block-content-editor-lang">
        <h4>{{language || 'flow-builder.unknown-language' | trans}}</h4>
      </div>

      <template v-for="mode in flow.supportedModes">
        <h5>{{`flow-builder.${mode}-content` | trans}}</h5>

        <!-- TODO - Is passing around resouce the right way to do overrides? Is it even necessary? See comments in discoverContentTypesFor function -->
        <template v-for="contentType in discoverContentTypesFor(mode, resource)">
          <!-- todo: it's odd that we pass around a ContentType variant rather than a ContentTypeLangMode variant (aka, mode as external arg) -->

          <resource-variant-text-editor :resource-id="resource.uuid"
                                        :resource-variant="findOrGenerateStubbedVariantOn(
                                                resource,
                                                {languageId, contentType, modes: [mode]})"

                                        :mode="mode"

                                        :is-editable="true || isEditable"
                                        :enable-autogen-button="true || enableAutogenButton" />

          <!-- <div v-if="tree.details.hasVoice" class="block-content-editor-audio col-md-4">-->
                <!--:selectedAudioFile="block.audioFiles[langId]"-->
            <audio-library-selector
                :audioFiles="availableAudio"
                :langId="languageId"
                @select="selectAudioFileFor"
                @clear="selectAudioFileFor" />
          <!-- </div> -->
        </template>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
  import {
    Getter,
  } from 'vuex-class'
  import {IFlow, IResourceDefinition} from '@floip/flow-runner'
  import lang from '@/lib/filters/lang'
  import {Component} from 'vue-property-decorator'
  import Vue from 'vue'
  import ResourceVariantTextEditor from './ResourceVariantTextEditor.vue'
  import {discoverContentTypesFor, findOrGenerateStubbedVariantOn} from '@/store/flow/resource'
  import AudioLibrarySelector from '@/components/common/AudioLibrarySelector.vue'

  interface IAudioFile {
    id: string,
    filename: string, 
    description: string, 
    language_id: string, 
    duration_seconds: string, 
    original_extension: string,
    created_at: string
  }

  @Component({
    props: {
        flow: {
            type: Object as () => IFlow,
            default: null,
        },
        label: {
            type: [String, Number],
        },
        resource: {
            type: Object as () => IResourceDefinition,
            default: null,
        }
    },

    mixins: [lang],

    components: {
      AudioLibrarySelector,
      ResourceVariantTextEditor,
    },
  })
  export class ResourceEditor extends Vue {
    discoverContentTypesFor = discoverContentTypesFor
    findOrGenerateStubbedVariantOn = findOrGenerateStubbedVariantOn

			//selectAudioFileFor({langId, value}) {
				//const {jsKey} = this.block
				//this.$store.commit('updateAudioFileFor', {jsKey, langId, value})
				//this.$store.commit('updateReviewedStateFor', {jsKey, langId, value: false})
				//this.debouncedSaveTree();
			//},

			//toggleReviewedStateFor(langId) {
				//const previousVal = !!lodash.get(this.block.customData.reviewed, langId, false)
				//this.$store.commit('updateReviewedStateFor', {jsKey: this.block.jsKey, langId, value: !previousVal})
				//this.debouncedSaveTree()
			//}

    @Getter availableAudio!: IAudioFile[] 
  }

  export default ResourceEditor
</script>

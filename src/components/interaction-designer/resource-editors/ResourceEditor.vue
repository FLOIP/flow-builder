<template>
  <div class="resource-editor">
    <hr />

    <h4 v-if="label">{{label}}</h4>

    <template v-for="{id: languageId, name: language} in flow.languages">
      <div class="block-content-editor-lang">
        <h5 class="label label-info">{{language || 'flow-builder.unknown-language' | trans}}</h5>
      </div>

      <template v-for="mode in flow.supportedModes">
        <h5>{{`flow-builder.${mode}-content` | trans}}</h5>

        <template v-for="contentType in discoverContentTypesFor(mode)">
          <!-- todo: it's odd that we pass around a ContentType variant rather than a ContentTypeLangMode variant (aka, mode as external arg) -->

          <resource-variant-text-editor :resource-id="resource.uuid"
                                        :resource-variant="findOrGenerateStubbedVariantOn(
                                                resource,
                                                {languageId, contentType, modes: [mode]})"

                                        :mode="mode"

                                        :is-editable="true || isEditable"
                                        v-if="contentType === SupportedContentType.TEXT"
                                        :enable-autogen-button="true || enableAutogenButton" />

          <div v-if="contentType === SupportedContentType.AUDIO">
            <audio-library-selector
                :audioFiles="availableAudio"
                :langId="languageId"
                :resourceId="resource.uuid"
                :selectedAudioFile="findOrGenerateStubbedVariantOn(
                   resource,
                   {languageId, contentType, modes: [mode]}).value"/>
          </div>
        </template>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
  import {
    Getter,
  } from 'vuex-class'
  import {
    IFlow,
    IResourceDefinition,
    SupportedContentType,
    SupportedMode,
  } from '@floip/flow-runner'
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
    SupportedMode = SupportedMode
    SupportedContentType = SupportedContentType

    @Getter availableAudio!: IAudioFile[]
  }

  export default ResourceEditor
</script>

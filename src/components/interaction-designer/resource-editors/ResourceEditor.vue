<template>
  <div class="resource-editor">
    <template v-for="{id: languageId, name: language} in flow.languages">
      <div class="block-content-editor-lang">
        <h4>{{language || 'trees.unknown-language' | trans}}</h4>
      </div>

      <template v-for="mode in flow.supportedModes">
        <h5>{{`trees.${mode}-content` | trans}}</h5>

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

        </template>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
  import {IFlow, IResourceDefinition} from '@floip/flow-runner'
  import lang from '@/lib/filters/lang'
  import {Component} from 'vue-property-decorator'
  import Vue from 'vue'
  import ResourceVariantTextEditor from './ResourceVariantTextEditor.vue'
  import {discoverContentTypesFor, findOrGenerateStubbedVariantOn} from '@/store/flow/resource'

  @Component({
    props: {
      flow: {
        type: Object as () => IFlow,
        default: null,
      },

      resource: {
        type: Object as () => IResourceDefinition,
        default: null,
      }
    },

    mixins: [lang],

    components: {
      ResourceVariantTextEditor,
    },
  })
  export class ResourceEditor extends Vue {
    discoverContentTypesFor = discoverContentTypesFor
    findOrGenerateStubbedVariantOn = findOrGenerateStubbedVariantOn
  }

  export default ResourceEditor
</script>

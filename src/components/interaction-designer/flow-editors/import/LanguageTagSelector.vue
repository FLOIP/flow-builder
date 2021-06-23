<template>
  <!--<input name="iso_639_3" type="text" class="form-control full-width" v-model="newLanguage.iso_639_3">-->
  <validation-message message-key="language/new_language/iso_639_3" #input-control="{ isValid }">
    <label class="form-check-label mt-2 mb-2 mr-2">ISO 639 3 Code</label>
    <vue-multiselect v-model="selectedTag"
                     track-by="id"
                     label="displayLabel"
                     :class="{invalid: isValid === false}"
                     :placeholder="'flow-builder.language-tag-selector-placeholder' | trans"
                     :options="[]"
                     :allow-empty="false"
                     :show-labels="false"
                     :searchable="true">
    </vue-multiselect>
  </validation-message>
</template>

<script lang="ts">
import VueMultiselect from 'vue-multiselect';
import { Component } from 'vue-property-decorator';
import Lang from '@/lib/filters/lang';
import { mixins } from "vue-class-component";
import ValidationMessage from '@/components/common/ValidationMessage.vue';

@Component<any>({
  components: {
    VueMultiselect,
    ValidationMessage
  },
})
class LanguageTagSelector extends mixins(Lang) {
  get selectedTag() {
    return ""
  }

  set selectedTag(value: string) {
  }
}

export default LanguageTagSelector
</script>

<style lang="css" scoped>
.invalid >>> .multiselect__tags {
  border-color: #dc3545;
}
</style>

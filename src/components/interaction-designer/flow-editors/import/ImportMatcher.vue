<template>
  <div>
    <label>{{ matchNotFoundText | trans }}</label>
    <div v-for="missingMatch in missingMatches" :key="`${getIdentifier(missingMatch)}-missing`">
      <div class="row full-width ml-1">
        <div class="form-check form-check-inline full-width">
          <div class="col-xl-2 col-md-3">
            <label class="form-check-label full-width mt-2 mb-2">{{getLabel(missingMatch)}}</label>
          </div>
          <div class="col-xl-8 col-md-6">
            <select class="form-control full-width" @change="updateMappings(missingMatch, $event)">
              <option value="" :selected="mappingsEmpty" key="default">
                {{ 'flow-builder.none-selected' | trans }}
              </option>
              <option v-for="option in existingOptionsWithoutMatch"
                :value="JSON.stringify(option)"
                :key="`${getIdentifier(option)}-option`">
                  {{ option }}
              </option>
            </select>
          </div>
          <div class="col-xl-2 col-md-3">
            <button class="btn btn-primary full-width"
              @click="handleMatch(missingMatch)">
              {{'flow-builder.update' | trans}}
            </button>
          </div>
        </div>
      </div>
      <div class="row full-width mt-2">
        <div class="col-12">
          <button class="btn btn-primary"
            @click="showAddLanguageModal">
            {{'flow-builder.add-language' | trans}}
          </button>
        </div>
      </div>
    </div>

    <b-modal ref="add-language-modal" title="Add Language">
      <language-adder ref="add-language-modal"/>
    </b-modal>
  </div>
</template>

<script lang="ts">

import { BModal } from 'bootstrap-vue'
import LanguageAdder from './LanguageAdder.vue'
import lang from '@/lib/filters/lang'
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import {
  omit,
  isEmpty,
  get,
} from 'lodash'

@Component({
  mixins: [lang],
  components: { LanguageAdder, BModal },
})
class ImportMatcher extends Vue {
  @Prop({ default: '' }) readonly matchNotFoundText!: string

  @Prop({ required: true }) readonly typeId!: string

  @Prop({ required: true }) readonly typeLabel!: string

  @Prop({ required: true }) readonly missingMatches!: any[]

  @Prop({ required: true }) readonly existingOptionsWithoutMatch!: any[]

  mappings: {[key: string]: string} = {}

  getLabel(missingMatch: {[key: string]: string}): string {
    return get(missingMatch, this.typeLabel, '')
  }

  getIdentifier(missingMatch: {[key: string]: string}): string {
    return get(missingMatch, this.typeId, '')
  }

  updateMappings(missingMatch: {[key: string]: string}, event: {target: {value: string}}) {
    this.mappings[this.getIdentifier(missingMatch)] = event.target.value
  }

  get mappingsEmpty() {
    return isEmpty(this.mappings)
  }
  showAddLanguageModal() {
    const languageModal: any = this.$refs['add-language-modal']
    languageModal.show()
  }
  handleMatch(missingMatch: {[key: string]: string}) {
    const matchingJson = get(this.mappings, this.getIdentifier(missingMatch))
    if (matchingJson) {
      const newMatch = JSON.parse(matchingJson)
      this.$emit('reactToMatch', missingMatch, newMatch)
      this.mappings = omit(this.mappings, this.getIdentifier(missingMatch))
    }
  }
}

export default ImportMatcher

</script>

<style lang="scss">
  .full-width {
    width: 100%
  }
</style>

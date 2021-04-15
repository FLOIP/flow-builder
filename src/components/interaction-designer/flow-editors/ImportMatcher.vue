<template>
  <div>
    <label>{{matchNotFoundText}}</label>
    <div v-for="missingMatch in missingMatches" :key="`${getIdentifier(missingMatch)}-missing`">
      <div class="form-check form-check-inline">
        <label class="form-check-label">{{getLabel(missingMatch)}}</label>
        <select class="form-control" @change="updateMappings(missingMatch, $event)">
          <option value="" :selected="mappingsEmpty" key="default">
            {{ 'flow-builder.none-selected' | trans }}
          </option>
          <option v-for="option in existingOptionsWithoutMatch"
            :value="JSON.stringify(option)"
            :key="`${getIdentifier(option)}-option`">
              {{ option }}
          </option>
        </select>
        <button class="btn btn-primary"
          @click="handleMatch(missingMatch)">
          {{'flow-builder.update' | trans}}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

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
})
class ImportMatcher extends Vue {
  @Prop({ default: '' }) readonly matchNotFoundText!: string
  @Prop({ required: true }) readonly typeId!: string
  @Prop({ required: true }) readonly typeLabel!: string

  @Prop({ required: true }) readonly missingMatches!: any[] 

  @Prop({ required: true }) readonly existingOptionsWithoutMatch!: any[] 

  mappings: {[key: string]: string} = {}

  getLabel(missingMatch): string {
    return get(missingMatch, this.typeLabel, "")
  }

  getIdentifier(missingMatch): string {
    return get(missingMatch, this.typeId, "")
  }

  updateMappings(missingMatch, event) {
    this.mappings[this.getIdentifier(missingMatch)] = event.target.value
  }

  get mappingsEmpty() {
    return isEmpty(this.mappings)
  }

  handleMatch(missingMatch) {
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

<template>
  <div class="card">
    <div class="card-title m-0 px-2 pt-1">
      {{ trans(`flow-builder.${status.type}`) }}
    </div>
    <div
      v-for="error in errorsToShow"
      :key="error.dataPath"
      class="card-body d-flex justify-content-between px-2 py-0 highlight-on-hover">
      <span class="text-danger align-self-center">{{ error.dataPath }} - {{ error.message }}</span>
      <button
        type="button"
        class="btn btn-link"
        @click="$emit('fixBlockError', statusKey, error.dataPath)">
        {{ 'flow-builder.fix-issue' | trans }}
      </button>
    </div>
    <label
      v-if="isListLong"
      type="button"
      class="btn btn-link text-left px-2 m-0 border-0"
      @click.stop="toggleList">
      {{ showMore ? trans('flow-builder.show-less') : trans('flow-builder.show-more') }}
    </label>
  </div>
</template>

<script lang="ts">
import Component, {mixins} from 'vue-class-component'
import {IValidationStatus} from '@/store/validation'
import Lang from '@/lib/filters/lang'
import {ErrorObject} from 'ajv/lib/types/index'
import {Prop} from 'vue-property-decorator'

const DEFAULT_LIST_SIZE = 1

@Component({})
export default class BlockErrorsExpandable extends mixins(Lang) {
  @Prop({required: true}) readonly status!: IValidationStatus
  @Prop({required: true}) readonly statusKey!: string

  showMore = false

  get errorsToShow(): ErrorObject[] {
    return this.showMore
      ? this.status.ajvErrors ?? []
      : this.status.ajvErrors?.slice(0, DEFAULT_LIST_SIZE) ?? []
  }

  get isListLong(): boolean {
    return this.status.ajvErrors != null && this.status.ajvErrors.length > DEFAULT_LIST_SIZE
  }

  toggleList(): void {
    this.showMore = !this.showMore
  }
}
</script>
<style scoped>
.highlight-on-hover:hover {
  background-color: #f8d7da;
}
</style>

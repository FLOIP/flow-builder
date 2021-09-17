<template>
  <div class="card">
    <div class="card-title m-0 px-2 pt-1 menu-bg-color">
      {{ trans(`flow-builder.${status.type}`) }}
      <div class="text-secondary">
        <small>{{ blockName }}</small>
      </div>
    </div>
    <div
      v-for="error in errorsToShow"
      :key="error.dataPath"
      class="card-body d-flex justify-content-between px-2 py-0 highlight-on-hover menu-bg-color">
      <span class="text-danger align-self-center">{{ error.dataPath }} - {{ error.message }}</span>
      <button
        type="button"
        class="btn btn-link btn-link-text"
        @click="$emit('fixBlockError', statusKey, error.dataPath)">
        {{ 'flow-builder.fix-issue' | trans }}
      </button>
    </div>
    <div
      v-if="isListLong"
      type="button"
      class="btn btn-link text-left px-2 m-0 border-0 text-center menu-bg-color"
      @click.stop="toggleList">
      <font-awesome-icon
        v-if="!isExpanded"
        :icon="['fas', 'chevron-down']"
        :aria-label="'flow-builder.show-more' | trans" />
      <font-awesome-icon
        v-else
        :icon="['fas', 'chevron-up']"
        :aria-label="'flow-builder.show-less' | trans" />
    </div>
  </div>
</template>

<script lang="ts">
import Component, {mixins} from 'vue-class-component'
import {IValidationStatus} from '@/store/validation'
import Lang from '@/lib/filters/lang'
import {ErrorObject} from 'ajv/lib/types/index'
import {Prop} from 'vue-property-decorator'
import {IFlow} from '@floip/flow-runner'
import {namespace} from 'vuex-class'

const flowVuexNamespace = namespace('flow')

const DEFAULT_LIST_SIZE = 3

@Component({})
export default class BlockErrorsExpandable extends mixins(Lang) {
  @Prop({required: true}) readonly status!: IValidationStatus
  @Prop({required: true}) readonly statusKey!: string

  isExpanded = false

  get errorsToShow(): ErrorObject[] {
    return this.isExpanded
      ? this.status.ajvErrors ?? []
      : this.status.ajvErrors?.slice(0, DEFAULT_LIST_SIZE) ?? []
  }

  get isListLong(): boolean {
    return this.status.ajvErrors != null && this.status.ajvErrors.length > DEFAULT_LIST_SIZE
  }

  get blockName(): string {
    const blockId = this.statusKey.replace('block/', '')
    const block = this.activeFlow?.blocks?.find((block) => block.uuid === blockId)
    return block?.label != null && block.label !== ''
      ? block.label
      : this.trans('flow-builder.untitled-block')
  }

  toggleList(): void {
    this.isExpanded = !this.isExpanded
  }

  @flowVuexNamespace.Getter activeFlow?: IFlow
}
</script>
<style scoped>
.menu-bg-color {
  background-color: #F8F8F8;
}

.highlight-on-hover:hover {
  background-color: #FFEBEB;
}

.btn-link-text {
  text-decoration: underline;
  color: #216FCE;
}
</style>

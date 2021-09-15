<template>
  <main class="error-notifications-wrapper">
    <section
      v-if="Object.keys(flowValidationErrors).length > 0"
      class="alert alert-danger d-flex mb-0 py-sm-1 px-2"
      role="alert">
      <span class="align-self-center ml-2">
        {{ 'flow-builder.flow-error-message' | trans }}
      </span>
      <div class="dropdown">
        <button
          id="flowErrorsDropdown"
          class="btn btn-link dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true">
          {{ 'flow-builder.show-issues' | trans }}
          <span class="caret" />
        </button>
        <ul
          class="notification dropdown-menu"
          aria-labelledby="flowErrorsDropdown">
          <li v-for="(message, path) in flowValidationErrors" :key="path">
            <div class="d-flex justify-content-between px-2 py-0">
              <span class="text-danger align-self-center">{{ message }}</span>
              <div v-if="path === '/first_block_id'">
                {{ 'flow-builder.add-at-least-one-block' | trans }}
              </div>
              <button
                v-else
                type="button"
                class="btn btn-link"
                @click="fixFlowError(error.dataPath)">
                {{ 'flow-builder.fix-issue' | trans }}
              </button>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <section
      v-if="numberOfBlocksWithErrors > 0"
      class="alert alert-danger d-flex py-sm-1 px-2"
      role="alert">
      <span class="align-self-center ml-2">
        {{ 'flow-builder.block-error-message' | trans({block_count: numberOfBlocksWithErrors}) }}
      </span>
      <div class="dropdown">
        <button
          id="blockErrorsDropdown"
          class="btn btn-link dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true">
          {{ 'flow-builder.locate-block-issue' | trans }}
          <span class="caret" />
        </button>
        <ul
          class="notification dropdown-menu"
          aria-labelledby="blockErrorsDropdown">
          <li
            v-for="(status, key) in blockValidationStatuses"
            :key="key">
            <div class="card">
              <div class="card-title m-0 px-2 pt-1">
                {{ trans(`flow-builder.${status.type}`) }}
              </div>
              <div
                v-for="(message, path) in status.errors"
                class="card-body d-flex justify-content-between px-2 py-0">
                <span class="text-danger align-self-center">{{ message }}</span>
                <button
                  type="button"
                  class="btn btn-link"
                  @click="fixBlockError(key, path)">
                  {{ 'flow-builder.fix-issue' | trans }}
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import Lang from '@/lib/filters/lang'
import {pickBy, size} from 'lodash'
import {IValidationStatus} from '@/store/validation'
import Routes from '@/lib/mixins/Routes'
import Component, {mixins} from 'vue-class-component'
import {namespace} from 'vuex-class'
import {IFlow} from '@floip/flow-runner'
import {ErrorObject} from 'ajv'

const flowVuexNamespace = namespace('flow')
const validationVuexNamespace = namespace('validation')

@Component({})
export default class ErrorNotifications extends mixins(Routes, Lang) {
  updated(): void {
    this.$emit('updated')
  }

  get flowValidationErrors(): {[key: string]: string} {
    const flowKey = `flow/${this.activeFlow?.uuid}`
    const flowAJVErrors = this.validationStatuses[flowKey]?.ajvErrors || []
    return this.getCustomMessageMapForAJVErrors(flowAJVErrors, 'flows')
  }

  get blockValidationStatuses(): {[key: string]: {errors: {[key: string]: string}, type: string}} {
    const blocksMap = this.activeFlow?.blocks.reduce((map: { [key: string]: boolean }, block) => {
      map[`block/${block.uuid}`] = true
      return map
    }, {})
    if (!blocksMap || size(blocksMap) === 0) {
      return {}
    }
    const blockAJVErrors = pickBy(this.validationStatuses, (value: IValidationStatus, key) => value.type !== 'flow' && blocksMap[key])
    const customMessageMapForBlocks: {[key: string]: {errors: {[key: string]: string}, type: string}} = {}
    for (const key in blockAJVErrors) {
      const ajvErrors = blockAJVErrors[key].ajvErrors || []
      const customMessageMap = this.getCustomMessageMapForAJVErrors(ajvErrors, 'blocks')
      customMessageMapForBlocks[key] = {
        errors: customMessageMap,
        type: blockAJVErrors[key].type,
      }
    }
    return customMessageMapForBlocks
  }

  getCustomMessageMapForAJVErrors(ajvErrors: ErrorObject[], entity: string): {[key: string]: string} {
    const customErrorMsgMap: {[key: string]: string} = {}
    ajvErrors.forEach((error: ErrorObject) => {
      const property = error.dataPath.replaceAll('/', '-')
      const validationMessageKey = `${entity}-${property.substring(1)}-${error.keyword}`
      const localizedValidationMessage = this.trans(`flow-builder-validation.${validationMessageKey}`)
      customErrorMsgMap[error.dataPath] = localizedValidationMessage === `flow-builder-validation.${validationMessageKey}`
        ? error.message : localizedValidationMessage
    })
    return customErrorMsgMap
  }

  get numberOfBlocksWithErrors(): number {
    return size(this.blockValidationStatuses)
  }

  fixFlowError(dataPath: string): void {
    this.$router.push({
      name: 'flow-details',
    }).catch((err) => {
      if (err.name !== 'NavigationDuplicated') {
        console.error(err)
      }
    })
    this.setDirtyStatusForKey({
      messageKey: `flow/${this.activeFlow?.uuid}${dataPath}`,
      value: true,
    })
  }

  fixBlockError(key: string, dataPath: string): void {
    const blockId = key.replace('block/', '')
    this.$router.push({
      name: 'block-scroll-to-anchor',
      params: {
        blockId,
        field: dataPath,
      },
    }).catch((err) => {
      if (err.name !== 'NavigationDuplicated') {
        console.error(err)
      }
    })
    this.setDirtyStatusForKey({
      messageKey: `${key}${dataPath}`,
      value: true,
    })
  }

  @validationVuexNamespace.State validationStatuses!: { [key: string]: IValidationStatus }
  @validationVuexNamespace.Action setDirtyStatusForKey!: ({messageKey, value}: {messageKey: string, value: boolean}) => void
  @flowVuexNamespace.Getter activeFlow?: IFlow
}
</script>

<style scoped lang="scss">
.notification {
  width: 500px;
  padding: 0;
  max-height: 400px;
  overflow-y: scroll;
}

.card {
  background: #F8F2F2;
}
</style>

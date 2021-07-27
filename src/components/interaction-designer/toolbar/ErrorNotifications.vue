<template>
  <main class="error-notifications-wrapper">
    <section class="alert alert-danger d-flex mb-0 py-sm-1 px-2" role="alert" v-if="flowValidationErrors.length > 0">
      <span class="align-self-center ml-2">
        {{ 'flow-builder.flow-error-message' | trans }}
      </span>
      <div class="dropdown">
        <button class="btn btn-link dropdown-toggle" type="button" id="flowErrorsDropdown" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="true">
          {{ 'flow-builder.show-issues' | trans }}
          <span class="caret"></span>
        </button>
        <ul class="notification dropdown-menu" aria-labelledby="flowErrorsDropdown">
          <li v-for="error in flowValidationErrors">
            <div class="d-flex justify-content-between px-2 py-0">
              <span class="text-danger align-self-center">{{ error.dataPath }} - {{ error.message }}</span>
              <div v-if="error.dataPath === '/first_block_id'">
                {{ 'flow-builder.add-at-least-one-block' | trans }}
              </div>
              <button v-else type="button" class="btn btn-link" @click="fixFlowError()">
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
          <li v-for="(status, key) in blockValidationStatuses" :key="key">
            <div class="card">
              <div class="card-title m-0 px-2 pt-1">
                {{ trans(`flow-builder.${status.type}`) }}
              </div>
              <div
                v-for="error in status.ajvErrors"
                class="card-body d-flex justify-content-between px-2 py-0">
                <span class="text-danger align-self-center">{{ error.dataPath }} - {{ error.message }}</span>
                <button
                  type="button"
                  class="btn btn-link"
                  @click="fixBlockError(key, error.dataPath)">
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

  get flowValidationErrors(): ErrorObject[] {
    const flowKey = `flow/${this.activeFlow?.uuid}`
    return this.validationStatuses[flowKey]?.ajvErrors || []
  }

  get blockValidationStatuses(): { [key: string]: IValidationStatus } {
    const blocksMap = this.activeFlow?.blocks.reduce((map: { [key: string]: boolean }, block) => {
      map[`block/${block.uuid}`] = true
      return map
    }, {})
    if (!blocksMap || size(blocksMap) === 0) {
      return {}
    }
    return pickBy(this.validationStatuses, (value: IValidationStatus, key) => value.type !== 'flow' && blocksMap[key])
  }

  get numberOfBlocksWithErrors(): number {
    return size(this.blockValidationStatuses)
  }

  fixFlowError(): void {
    this.$router.push({
      name: 'flow-details',
    }).catch(err => {
      if (err.name != "NavigationDuplicated") {
        console.error(err);
      }
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
    }).catch(err => {
      if (err.name != "NavigationDuplicated") {
        console.error(err);
      }
    })
  }

  @validationVuexNamespace.State validationStatuses!: { [key: string]: IValidationStatus }
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

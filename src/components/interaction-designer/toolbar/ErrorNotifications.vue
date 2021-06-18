<template>
  <main class="error-notifications-wrapper">
    <!--    TODO: Need to uncomment the below piece once validation messages are added for a flow - https://viamoinc.atlassian.net/browse/VMO-3905-->
    <!--    <section class="alert alert-danger d-flex mb-0 py-sm-1 px-2" role="alert" v-if="flowValidationErrors.length > 0">-->
    <!--      <span class="align-self-center ml-2">-->
    <!--        {{ 'flow-builder.flow-error-message' | trans }}-->
    <!--      </span>-->
    <!--      <button type="button" class="btn btn-link" @click="fixFlowError()">-->
    <!--        {{ 'flow-builder.fix-issue' | trans }}-->
    <!--      </button>-->
    <!--    </section>-->
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
          <li v-for="(status, key) in blockValidationStatuses">
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

const flowVuexNamespace = namespace('flow')
const validationVuexNamespace = namespace('validation')

@Component({})
export default class ErrorNotifications extends mixins(Routes, Lang) {
  updated() {
    this.$emit('updated')
  }

  // TODO: Need to test the below function - https://viamoinc.atlassian.net/browse/VMO-3905
  get flowValidationErrors() {
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

  get numberOfBlocksWithErrors() {
    return size(this.blockValidationStatuses)
  }

  fixFlowError() {
    this.$router.push({
      name: 'flow-details',
    })
  }

  fixBlockError(key: string, dataPath: string) {
    const blockId = key.replace('block/', '')
    this.$router.push({
      name: 'block-scroll-to-anchor',
      params: {
        blockId,
        field: dataPath,
      },
    })
  }

  @validationVuexNamespace.State validationStatuses!: { [key: string]: IValidationStatus }
  @flowVuexNamespace.Getter activeFlow?: IFlow
}
</script>

<style scoped lang="scss">
.error-notifications-wrapper {
  z-index: 2 * 10;
}

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

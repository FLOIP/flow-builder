<template>
  <main class="error-notifications">
    <section
      v-if="flowValidationErrors.length > 0"
      class="alert alert-danger d-flex mb-0 py-sm-1 px-2"
      role="alert">
      <span class="align-self-center ml-2">
        {{ trans('flow-builder.flow-error-message') }}
      </span>
      <div class="dropdown">
        <button
          id="flowErrorsDropdown"
          class="btn btn-link btn-link-text dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true">
          {{ trans('flow-builder.show-issues') }}
          <span class="caret" />
        </button>
        <ul
          class="notification dropdown-menu"
          aria-labelledby="flowErrorsDropdown">
          <li
            v-for="error in flowValidationErrors"
            :key="error.dataPath">
            <div class="d-flex justify-content-between px-2 py-0 highlight-on-hover">
              <span class="text-danger align-self-center">{{ error.message }}</span>
              <button
                v-if="error.dataPath !== '/first_block_id'"
                type="button"
                class="btn btn-link btn-link-text"
                @click="fixFlowError()">
                {{ trans('flow-builder.fix-issue') }}
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
        {{ trans('flow-builder.block-error-message') }}
      </span>
      <div class="dropdown">
        <button
          id="blockErrorsDropdown"
          class="btn btn-link btn-link-text dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true">
          {{ trans('flow-builder.locate-block-issue') }}
          <span class="caret" />
        </button>
        <ul
          class="notification dropdown-menu"
          aria-labelledby="blockErrorsDropdown">
          <li
            v-for="(block, key) in invalidBlocksInActiveFlow"
            :key="key">
            <block-errors-expandable
              :block="block"
              @fixBlockError="fixBlockError" />
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import {Lang} from '@/lib/filters/lang'
import {castArray, filter, has, pickBy, size} from 'lodash'
import {IValidationStatus} from '@/store/validation'
import Routes from '@/lib/mixins/Routes'
import {mixins, Options} from 'vue-class-component'
import {namespace} from 'vuex-class'
import {IBlock, IFlow, IResource} from '@floip/flow-runner'
import {ErrorObject} from 'ajv'

const flowVuexNamespace = namespace('flow')
const validationVuexNamespace = namespace('validation')

@Options({})
export class ErrorNotifications extends mixins(Routes, Lang) {
  updated(): void {
    this.$emit('updated')
  }

  get flowValidationErrors(): ErrorObject[] {
    const flowKey = `flow/${this.activeFlow?.uuid}`
    return this.validationStatuses[flowKey]?.ajvErrors || []
  }

  /**
   * block validation statuses for active flow only
   */
  get blockValidationStatuses(): { [key: string]: IValidationStatus } {
    const blocksMap = this.activeFlow?.blocks.reduce((map: { [key: string]: boolean }, block) => {
      map[`block/${block.uuid}`] = true
      return map
    }, {})
    if (!blocksMap || size(blocksMap) === 0) {
      return {}
    }
    return pickBy(this.validationStatuses, (value: IValidationStatus, key) => key.includes('block/') && blocksMap[key])
  }

  hasBlockValidationErrors(uuid: string): boolean {
    return has(this.blockValidationStatuses, `block/${uuid}`)
  }

  hasResourceValidationErrors(uuidOrUuids: string | string[]): boolean {
    const uuids = castArray(uuidOrUuids)

    return uuids.some(uuid => {
      const isValid = this.validationStatuses[`resource/${uuid}`]?.isValid
      const doesBelongToActiveFlow = this.activeFlow?.resources.some(resource => resource.uuid === uuid)

      return isValid === false && doesBelongToActiveFlow
    }, this)
  }

  isBlockInvalid(block: IBlock): boolean {
    return this.hasBlockValidationErrors(block.uuid)
      || this.hasResourceValidationErrors(block.config.prompt)
      || this.hasResourceValidationErrors(block.config.choices)
  }

  get invalidBlocksInActiveFlow(): IBlock[] {
    return filter(this.activeFlow?.blocks, this.isBlockInvalid.bind(this))
  }

  get numberOfBlocksWithErrors(): number {
    return size(this.invalidBlocksInActiveFlow)
  }

  async fixFlowError(): Promise<void> {
    try {
      await this.$router.push({
        name: 'flow-details',
      })
    } catch (err: any) {
      if (err.name !== 'NavigationDuplicated') {
        console.error(err)
      }
    }
  }

  async fixBlockError(blockId: string, dataPath: string): Promise<void> {
    try {
      await this.$router.push({
        name: 'block-scroll-to-anchor',
        params: {
          blockId,
          field: dataPath,
        },
      })
    } catch (err: any) {
      if (err.name !== 'NavigationDuplicated') {
        console.error(err)
      }
    }
  }

  @validationVuexNamespace.State validationStatuses!: { [key: string]: IValidationStatus }
  @flowVuexNamespace.Getter activeFlow?: IFlow
  @flowVuexNamespace.Getter resourceUuidsOnActiveFlow!: IResource['uuid'][]
}
export default ErrorNotifications
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

.btn-link-text {
  text-decoration: underline;
  color: #216FCE;
}

.highlight-on-hover:hover {
  background-color: #FFEBEB;
}
</style>

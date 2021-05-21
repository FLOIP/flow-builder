<template>
  <main class="error-notifications-wrapper">
<!--    <section class="alert alert-danger d-flex mb-0" role="alert" v-if="flowValidationErrors.length > 0">-->
<!--      <span class="align-self-center ml-2">You have a validation issue with your flow</span>-->
<!--      <button type="button" class="btn btn-link text-dark" @click="fixFlowError()">-->
<!--        Fix Issue-->
<!--      </button>-->
<!--    </section>-->
    <section class="alert alert-danger d-flex" role="alert" v-if="numberOfBlocksWithErrors > 0">
      <span class="align-self-center ml-2">
        You have {{numberOfBlocksWithErrors}} block(s) that has validation issue.
      </span>
      <div class="dropdown">
        <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="true">
          Locate blocks to fix issue
          <span class="caret"></span>
        </button>
        <ul class="notification dropdown-menu" aria-labelledby="dropdownMenu1">
          <li v-for="(status, key) in blockValidationStatuses">
            <div class="card card-deck" v-for="error in status.ajvErrors">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <b>{{ (status.type).split('.')[1] }}</b>
                  <button type="button" class="btn btn-link text-dark" @click="fixBlockError(key, error.dataPath)">
                    Fix Issue
                  </button>
                </div>
                <span class="error-message">{{ error.dataPath }} - {{ error.message }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import Lang from '@/lib/filters/lang';
import { pickBy, values } from 'lodash';
import { IValidationStatus } from '@/store/validation';
import Routes from '@/lib/mixins/Routes';
import Component, { mixins } from 'vue-class-component';
import { namespace } from 'vuex-class';

const validationVuexNamespace = namespace('validation')

@Component({})
export default class ErrorNotifications extends mixins(Routes, Lang) {
  get flowValidationErrors() {
    const flowValidationResults: { [key:string]: IValidationStatus } = pickBy(this.validationStatuses, function(value: IValidationStatus) {
      return value.type === 'flow'
    })
    return values(flowValidationResults)[0]?.ajvErrors || []
  }

  get blockValidationStatuses() {
    return pickBy(this.validationStatuses, function (value: IValidationStatus) {
      return value.type !== 'flow'
    })
  }

  get numberOfBlocksWithErrors() {
    return values(this.blockValidationStatuses).length
  }

  fixFlowError() {
    this.$router.push({
      name: 'flow-details',
    })
  }

  fixBlockError(key: string, dataPath: string) {
    const blockId = key.replace('block/', '');
    this.$router.push({
      name: 'block-scroll-to-anchor',
      params: {
        blockId,
        field: dataPath
      },
    })
  }

  @validationVuexNamespace.Getter validationStatuses!: { [key: string]: IValidationStatus }
}
</script>

<style scoped lang="scss">
.error-notifications-wrapper {
  position: fixed;
  width: 100vw;
  top: 60px;
  z-index: 2 * 10;
}

.notification {
  width: 500px;
  padding: 0;
  max-height: 500px;
  overflow-y: scroll;
}

.card {
  background: #F8F2F2;
}

.error-message {
  color: #f96b6d;
}
</style>

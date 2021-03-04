<template>
  <div class="card">
    <div class="card-body sm-padding-below font-roboto">
      <h4 class="card-title font-weight-regular pl-0 text-color-title">{{prompt.block.name}}</h4>
      <p class="card-text">
        {{prompt.block.label}}
      </p>

      <div class="content-area sm-room-above">
        <!-- @duplicated from ResourceViewer.vue -->
        <div v-if="isFocused" class="input-group search-controls">
          <div class="input-group-addon">
            <i class="glyphicon glyphicon-search"></i>
          </div>
          <input
            class="form-control"
            :placeholder="'trees.filter-block-content' | trans"
            v-model="query">
        </div>

        <div class="table-container">
          <table class="table table-hover table-selectable">
            <thead>
            <tr>
              <th v-for="fieldName in choiceRowFieldsWithoutReservedFields">{{fieldName}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="option in rows"
                :class="{active: isEqual(option, selectedChoiceRow) || !isFocused}"
                @click="select(option)">

              <td v-for="field in option">{{field}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <block-action-buttons
        class="sm-room-above"
        :is-disabled="false"
        :is-focused="isFocused"
        :on-next-clicked="submitAnswer"
        :is-block-interaction="isBlockInteraction"
        :on-cancel-clicked="onActiveBlockChanged"/>
    </div>
  </div>

</template>

<script>
import lodash from 'lodash'
import lang from 'lib/filters/lang'
import { IContext, MessagePrompt } from '@floip/flow-runner'
import BlockActionButtons from '../BlockActionButtons.vue'

export default {
  components: {
    BlockActionButtons,
  },
  props: {
    context: IContext,
    prompt: MessagePrompt,
    goNext: Function,

    isBlockInteraction: Boolean,
    onActiveBlockChanged: Function,
    isFocused: Boolean,
  },

  data() {
    return {
      selectedChoiceRow: null,
      query: '',
    }
  },

  computed: {
    primaryField() {
      return lodash.get(this.choiceRowFields, 0, null)
    },

    secondaryFields() {
      return lodash(this.choiceRowFields)
        .tail()
        .filter((field) => field.charAt(0) !== '#')
        .value()
    },

    choiceRowsWithoutReservedFields() {
      return lodash.map(this.choiceRows,
        (row) => [
          row[0],
          ...lodash.takeRight(row, this.secondaryFields.length),
        ])
    },

    choiceRows() {
      return this.kotlinArrayListToArray(this.block.choiceRows).map((row) => row.toArray())
    },

    choiceRowFields() {
      return this.kotlinArrayListToArray(this.block.choiceRowFields)
    },

    choiceRowFieldsWithoutReservedFields() {
      return this.kotlinArrayListToArray(this.block.choiceRowFields).filter((f) => f[0] !== '#')
    },

    selection() {
      return this.hasSelection
            && this.selectedChoiceRow
              .map((f, i) => ({
                name: this.choiceRowFieldsWithoutReservedFields[i],
                value: f,
              }))
    },

    hasSelection() {
      return this.selectedChoiceRow !== null
    },

    rows() {
      if (!this.isBlockInteraction && !this.isFocused) {
        return []
      } if (!this.isFocused) {
        return [this.previouslySelectedBlockInteraction]
      } if (this.query.length >= 1) {
        return this.search(this.query)
      }
      return this.choiceRowsWithoutReservedFields
    },

    previouslySelectedBlockInteraction() {
      if (this.isBlockInteraction || this.blockInteraction.blockQuestionInteraction.directorySelections) {
        return this.kotlinArrayListToArray(this.blockInteraction.blockQuestionInteraction.directorySelections)
          .map((directorySelection) => directorySelection.value)
      }
      return null
    },
  },

  methods: {

    search(query) {
      return lodash.map(this.block.fuzzySearchAsArrays(query),
        (row) => [
          row[0],
          ...lodash.takeRight(row, this.secondaryFields.length),
        ])
    },

    clearSearch() {
      this.query = ''
    },

    select(row) {
      this.selectedChoiceRow = row
    },

    isEqual(val1, val2) {
      return lodash.isEqual(val1, val2)
    },

    submitAnswer() {
      this.executeSubmitAnswer((currentQuestion) => {
        currentQuestion.submitAnswer(this.selection)
        this.executeBlock()
        this.reset()
      })
    },

    reset() {
      this.query = ''
      this.selectedChoiceRow = null
    },
  },
}
</script>

<style lang="scss" scoped>
  table {
    max-height: 10em;
    overflow: auto;

    &.table-selectable tr {
      cursor: pointer;
    }
  }

  .content-area {
    margin-left: 16px;
    margin-right: 16px;
    padding-bottom: 16px;
  }

  .table-container {
    overflow: auto;
    max-height: 15em;
  }

  .table > tbody > tr.active > td {
    background: #844775;
    border-left-width: 0;
    border-right-width: 0;
    border-top-width: 0;
    border-bottom-width: 1px;
    border-bottom-color: rgba(0, 0, 0, 0.54);
    color: rgba(255, 255, 255, 0.87);
  }

  table {
    margin-bottom: 0;
  }
</style>

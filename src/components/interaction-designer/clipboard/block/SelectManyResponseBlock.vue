<template>
  <div class="card" :class="{'disabled-block': !isFocused}">
    <div class="card-body sm-padding-below font-roboto">
      <div class="d-flex justify-content-between">
        <h4 class="card-title font-weight-regular pl-0 text-color-title">{{prompt.block.label}}</h4>
        <i v-if="!isFocused && !isComplete"
           class="glyphicon glyphicon-pencil cursor-pointer"
           @click="editBlock"></i>
      </div>
      <p class="card-text">
        {{getContent}}
      </p>

      <div class="form-group">
        <div v-for="(option, index) in options" :key="index" class="form-check">
          <input
            type="checkbox"
            name="select-many"
            class="form-check-input"
            :class="{'is-invalid': errorMsg}"
            :id="index"
            :value="option.key"
            :disabled="!isFocused"
            v-model="selectedChoices"
            @change="checkIsValid"
          />
          <label class="form-check-label" :for="index">{{option.value}}</label>
        </div>
        <div v-if="errorMsg" style="color: #dc3545">
          <small>{{errorMsg}}</small>
        </div>
      </div>

      <block-action-buttons
        class="sm-room-above"
        :is-disabled="false"
        :is-focused="isFocused"
        :on-next-clicked="submitAnswer"
        :is-block-interaction="isBlockInteraction"
        :on-cancel-clicked="onCancel"
      />

    </div>
  </div>
</template>
<script>
import { Context, IContext, SelectManyPrompt } from '@floip/flow-runner'
import { mapActions, mapGetters } from 'vuex'
import BlockActionButtons from '../shared/BlockActionButtons.vue'

export default {
  name: 'SelectManyResponseBlock',
  components: {
    BlockActionButtons,
  },
  props: {
    context: IContext,
    prompt: SelectManyPrompt,
    index: Number,
    isComplete: Boolean,
    goNext: Function,
    onEditStart: Function,
  },
  data() {
    return {
      selectedChoices: [],
      options: [],
      errorMsg: null,
      isBlockInteraction: false,
    }
  },
  mounted() {
    this.setOptions()
  },
  computed: {
    ...mapGetters('clipboard', ['isBlockFocused']),
    isFocused() {
      return this.isBlockFocused(this.index)
    },
    getContent() {
      const result = Context.prototype.getResource.call(this.context, this.prompt.config.prompt)
      return result.hasText() ? result.getText() : ''
    },
  },
  methods: {
    ...mapActions('clipboard', ['setIsFocused']),
    setOptions() {
      for (const choice of this.prompt.config.choices) {
        let option
        try {
          option = Context.prototype.getResource.call(this.context, choice.value).getText()
        } catch (e) {
          console.warn('error fetching resource ')
        }
        if (option) {
          this.options.push({
            key: choice.key,
            value: option,
          })
        }
      }
    },
    checkIsValid() {
      try {
        this.prompt.validate(this.selectedChoices)
        this.errorMsg = ''
      } catch (e) {
        this.errorMsg = e.message
      }
    },
    submitAnswer() {
      this.checkIsValid()
      if (!this.errorMsg) {
        this.prompt.value = this.selectedChoices
        this.prompt.fulfill(this.selectedChoices)
        this.setIsFocused({ index: this.index, value: false })
        this.goNext(this.index)
      }
    },
    editBlock() {
      console.log('edit block')
      this.setIsFocused({ index: this.index, value: true })
      this.isBlockInteraction = true
      this.onEditStart(this.index)
    },
    onCancel() {
      this.setIsFocused({ index: this.index, value: false })
      this.isBlockInteraction = false
      console.log('cancel edit ')
    },
  },
}
</script>

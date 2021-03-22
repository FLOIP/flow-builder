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
        <i class="bi bi-pencil-fill"></i>
      </p>

    <div class="form-group">
      <div v-for="(option, index) in options" :key="index" class="form-check">
        <input
          type="radio"
          name="select-one"
          class="form-check-input"
          :class="{'is-invalid': errorMsg}"
          :value="option.key"
          :disabled="!isFocused"
          :id="index"
          v-model="selectedItem"
          @change="checkIsValid"
        />
        <label class="form-check-label" :for="index">{{option.value}}</label>
      </div>
      <div v-if="errorMsg" style="color: #dc3545">
        <small>{{errorMsg}}</small>
      </div>
    </div>

    <block-action-buttons
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
import { Context, IContext } from '@floip/flow-runner'
import { mapActions, mapGetters } from 'vuex'
import BlockActionButtons from '../shared/BlockActionButtons.vue'

export default {
  name: 'SelectOneResponseBlock',
  components: {
    BlockActionButtons,
  },
  props: {
    context: IContext,
    index: Number,
    isComplete: Boolean,
    goNext: Function,
    onEditComplete: Function,
  },
  data() {
    return {
      selectedItem: null,
      options: [],
      errorMsg: null,
      isBlockInteraction: false,
    }
  },
  mounted() {
    this.setOptions()
  },
  computed: {
    ...mapGetters('clipboard', ['isBlockFocused', 'getBlockPrompt']),
    isFocused() {
      return this.isBlockFocused(this.index)
    },
    prompt() {
      return this.getBlockPrompt(this.index)
    },
    getContent() {
      const result = Context.prototype.getResource.call(this.context, this.prompt.config.prompt)
      return result.hasText() ? result.getText() : ''
    },
  },
  methods: {
    ...mapActions('clipboard', ['setIsFocused', 'setLastBlockUnEditable', 'setLastBlockEditable']),
    setOptions() {
      const { choices } = this.prompt.config
      choices.forEach((choice) => {
        try {
          const option = Context.prototype.getResource.call(this.context, choice.value).getText()
          this.options.push({
            key: choice.key,
            value: option,
          })
        } catch (e) {
          console.warn('error fetching resource ')
        }
      })
    },
    checkIsValid() {
      try {
        this.prompt.validate(this.selectedItem)
        this.errorMsg = ''
      } catch (e) {
        this.errorMsg = e.message
      }
    },
    async submitAnswer() {
      this.checkIsValid()
      if (!this.errorMsg) {
        if (this.isBlockInteraction) {
          await this.onEditComplete(this.index)
          this.isBlockInteraction = false
        }
        this.prompt.value = this.selectedItem
        this.setIsFocused({ index: this.index, value: false })
        this.goNext()
      }
    },
    editBlock() {
      this.setLastBlockUnEditable()
      this.setIsFocused({ index: this.index, value: true })
      this.isBlockInteraction = true
    },
    onCancel() {
      this.setLastBlockEditable()
      this.setIsFocused({ index: this.index, value: false })
      this.isBlockInteraction = false
    },
  },
}
</script>

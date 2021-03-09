<template>
  <div class="card" :class="{'disabled-block': !isFocused}">
    <div class="card-body sm-padding-below font-roboto">
      <h4 class="card-title font-weight-regular pl-0 text-color-title">{{prompt.block.label}}</h4>
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
      :on-next-clicked="submitAnswer"/>
    </div>
  </div>
</template>
<script>
import {
  Context, IContext, SelectOnePrompt,
} from '@floip/flow-runner'
import BlockActionButtons from '../shared/BlockActionButtons.vue'

export default {
  name: 'SelectOneResponseBlock',
  components: {
    BlockActionButtons,
  },
  props: {
    context: IContext,
    prompt: SelectOnePrompt,
    goNext: Function,
  },
  mounted() {
    this.setOptions()
  },
  computed: {
    getContent() {
      const result = Context.prototype.getResource.call(this.context, this.prompt.config.prompt)
      return result.hasText() ? result.getText() : this.prompt.block.label
    },
  },
  data() {
    return {
      selectedItem: null,
      options: [],
      errorMsg: null,
      isFocused: true,
    }
  },
  methods: {
    setOptions() {
      for (const choice of this.prompt.config.choices) {
        let option
        try {
          option = Context.prototype.getResource.call(this.context, choice.value).getText()
        } catch (e) {
          console.log('error fetching resource ')
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
        const validity = this.prompt.validate(this.selectedItem)
        console.log('validity ', validity)
        this.errorMsg = ''
      } catch (e) {
        console.log(e.message)
        this.errorMsg = e.message
      }
    },
    submitAnswer() {
      this.checkIsValid()
      if (!this.errorMsg) {
        this.prompt.value = this.selectedItem
        this.prompt.fulfill(this.selectedItem)
        this.isFocused = false
        this.goNext()
        console.log('finished submitting answer ', this.selectedItem)
      }
    },
  },
}
</script>

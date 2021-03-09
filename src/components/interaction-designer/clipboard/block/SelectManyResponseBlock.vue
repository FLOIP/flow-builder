<template>
  <div class="card" :class="{'disabled-block': !isFocused}">
    <div class="card-body sm-padding-below font-roboto">
      <h4 class="card-title font-weight-regular pl-0 text-color-title">{{prompt.block.label}}</h4>
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
        :on-next-clicked="submitAnswer"/>

    </div>
  </div>
</template>
<script>
import { Context, IContext, SelectManyPrompt } from '@floip/flow-runner'
import BlockActionButtons from '../shared/BlockActionButtons.vue'

export default {
  name: 'SelectManyResponseBlock',
  components: {
    BlockActionButtons,
  },
  props: {
    context: IContext,
    prompt: SelectManyPrompt,
    goNext: Function,
  },
  mounted() {
    this.setOptions()
  },
  data() {
    return {
      selectedChoices: [],
      options: [],
      errorMsg: null,
      isFocused: true,
    }
  },
  computed: {
    getContent() {
      const result = Context.prototype.getResource.call(this.context, this.prompt.config.prompt)
      return result.hasText() ? result.getText() : this.prompt.block.label
    },
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
      console.log('options are *** ', this.options)
    },
    checkIsValid() {
      try {
        const validity = this.prompt.validate(this.selectedChoices)
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
        this.prompt.value = this.selectedChoices
        this.prompt.fulfill(this.selectedChoices)
        this.isFocused = false
        this.goNext()
        console.log('finished submitting answer ', this.selectedChoices)
      }
    },
  },
}
</script>

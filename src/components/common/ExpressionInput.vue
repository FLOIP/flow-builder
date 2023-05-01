<template>
  <div class="expression-input form-group">
    <label
      v-if="label"
      :class="labelClass">{{ label }}</label>

    <div class="input-group d-flex flex-column">
      <div
        v-if="prependText"
        class="input-group-prepend flex-row">
        <span class="input-group-text">{{ prependText }}</span>
      </div>

      <div class="flex-row">
        <textarea
          ref="input"
          v-model="expression"
          :class="['form-control', {'is-invalid': isInvalid}]"
          :disabled="disabled"
          :rows="rows"
          :placeholder="placeholder"
          @click="handleClick()"
          @input="$emit('input', $event.target.value)" />
      </div>
      <div
        ref="suggest"
        class="cloned-auto-suggest-content flex-row" />
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import AutoSuggest from '@avcs/autosuggest'
import '@avcs/autosuggest/dropdown.css'
import {mixins} from 'vue-class-component'
import {Component, Prop} from 'vue-property-decorator'
import {Getter, namespace} from 'vuex-class'
import Lang from '@/lib/filters/lang'
import {IFlow} from '@floip/flow-runner'
import {ISubscriberPropertyField, ISuggestion} from '@/lib/types'
import {getSuggestions} from '@/lib/suggestions'

interface IAutoSuggest {
  dropdown: {
    dropdown: HTMLElement,
  },
}

const flowNamespace = namespace('flow')

@Component({})
export class ExpressionInput extends mixins(Lang) {
  @Prop({type: [String, Number], required: true}) readonly label!: string | number
  @Prop({type: String, default: 'text-primary'}) readonly labelClass!: string
  @Prop({type: String, default: ''}) readonly placeholder!: string
  @Prop({type: String}) readonly currentExpression?: string
  @Prop({type: [String, Number], default: null}) readonly expressionIdentifier!: string | number | null
  @Prop({type: Number, default: 1}) readonly rows!: number
  @Prop({type: Boolean, default: null}) readonly validState!: boolean|null
  @Prop({type: String, default: ''}) readonly prependText!: string
  @Prop({type: Boolean, default: false}) readonly disabled!: boolean
  @Prop({type: Boolean, default: false}) readonly disabledAutoComplete!: boolean

  suggest: IAutoSuggest = {} as IAutoSuggest

  get autoSuggestDropdown(): HTMLElement {
    return this.suggest.dropdown?.dropdown
  }

  get refAutoSuggestElement(): HTMLElement {
    return this.$refs.suggest as HTMLElement
  }

  get refInputElement(): HTMLInputElement {
    return this.$refs.input as HTMLInputElement
  }

  get isInvalid(): boolean {
    return this.validState === false
  }

  get expression(): string | undefined {
    return this.currentExpression
  }

  set expression(value: string | undefined) {
    if (value === undefined) {
      return
    }
    if (this.expressionIdentifier === null) {
      this.$emit('commitExpressionChange', value)
    } else {
      this.$emit('commitExpressionChange', {
        identifier: this.expressionIdentifier,
        value,
      })
    }
  }

  get suggestions(): ISuggestion[] {
    return getSuggestions({
      blocks: this.activeFlow?.blocks ?? [],
      subscriberPropertyFields: this.subscriberPropertyFields,
    })
  }

  /**
   * Making sure we port the auto-suggest under desired dom
   */
  portAutoSuggestContent(): void {
    // override position which came from AutoSuggest original code
    this.autoSuggestDropdown.style.position = 'relative'
    this.autoSuggestDropdown.style.left = '0px'
    this.autoSuggestDropdown.style.top = `0px`

    // move the created autoSuggestDropdown inside the desired dom
    this.refAutoSuggestElement?.appendChild(this.autoSuggestDropdown)
  }

  /**
   * Delay the portal to make sure AutoSuggest has finished the update.
   */
  debounce_portAutoSuggestContent(): void {
    this.$nextTick(() => {
      setTimeout(() => {
        this.portAutoSuggestContent()
      }, 500)
    })
  }

  handleClick(): void {
    if (this.disabledAutoComplete === false) {
      // this is required in case the user re-clicks at the input without updating the expression
      this.debounce_portAutoSuggestContent()
    } else {
      console.debug('ExpressionInput', 'handleClick', 'disabledAutoComplete is false')
    }
  }

  mounted(): void {
    if (this.disabledAutoComplete === false) {
      const input = this.refInputElement
      this.suggest = new AutoSuggest({
        caseSensitive: false,
        suggestions: this.suggestions,
        onChange: () => input.dispatchEvent(new Event('input')),
      }, input)

      // Unfortunately there is no `updated()` hook in AutoSuggest, so we will wait a bit
      this.debounce_portAutoSuggestContent()
    } else {
      console.debug('ExpressionInput', 'mounted', 'disabledAutoComplete is false')
    }
  }

  updated(): void {
    if (this.disabledAutoComplete === false) {
      // Unfortunately there is no `updated()` hook in AutoSuggest, so we will wait a bit
      this.debounce_portAutoSuggestContent()
    } else {
      console.debug('ExpressionInput', 'updated', 'disabledAutoComplete is false')
    }
  }

  focus(): void {
    this.refInputElement.focus()
  }

  @flowNamespace.Getter activeFlow?: IFlow
  @Getter subscriberPropertyFields!: ISubscriberPropertyField[]
}

export default ExpressionInput
</script>

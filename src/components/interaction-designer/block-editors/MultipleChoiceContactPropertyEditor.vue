<template>
  <div class="multiple-choice-contact-property-editor">
    <generic-contact-property-editor :block="block">
      <template slot="entry-from-this-block">
        <div class="md-room-above sm-room-below">
          <div v-if="isMultipleChoiceProperty">
            {{ trans('flow-builder.select-value-for-choices-for-selected-property') }}
          </div>
          <div v-else>
            {{ trans('flow-builder.enter-value-for-choices-for-selected-property') }}
          </div>
          <ul>
            <li
              v-for="blockConfigChoiceName in blockConfigChoiceNames"
              :key="blockConfigChoiceName">
              <label>Choice: {{ blockConfigChoiceName }}</label>
              <vue-multiselect
                v-if="isMultipleChoiceProperty"
                v-model="contactPropertyChoice"
                :options="contactPropertyChoices"
                :placeholder="trans('flow-builder.select-a-property')"
                :show-labels="false"
                track-by="value"
                label="description" />
              <input
                v-else
                v-model="blockConfigValueToSet"
                type="text"
                class="form-control"
                :placeholder="trans('flow-builder.enter-value')">
            </li>
          </ul>
        </div>
      </template>
    </generic-contact-property-editor>
  </div>
</template>

<script lang="ts">
import VueMultiselect from 'vue-multiselect'
import Component, {mixins} from 'vue-class-component'
import {Prop} from 'vue-property-decorator'
import Lang from '@/lib/filters/lang'
import {ISelectOneResponseBlock} from '@floip/flow-runner/src/model/block/ISelectOneResponseBlock'
import {IContactPropertyOption} from '@/store/flow/block-types'
import {Getter} from 'vuex-class'
import {find} from 'lodash'
import {IContactPropertyMultipleChoice} from '@/store/flow/block-types/Core_SetContactPropertyStore'
import ExpressionInput from '../../common/ExpressionInput.vue'

@Component({
  components: {
    VueMultiselect,
    ExpressionInput,
  },
})
export class MultipleChoiceContactPropertyEditor extends mixins(Lang) {
  @Prop() readonly block!: ISelectOneResponseBlock

  get blockConfigChoiceNames(): string[] {
    return this.block.config.choices.map(choice => choice.name)
  }

  get selectedContactProperty(): IContactPropertyOption | null {
    const selectedOption = find(
      this.subscriberPropertyFields,
      (option: IContactPropertyOption) => option.name === this.firstContactPropertyKey,
    )
    return selectedOption ?? null
  }

  get isMultipleChoiceProperty(): boolean {
    return this.selectedContactProperty?.data_type === 'multiple_choice'
  }

  get contactPropertyChoices(): IContactPropertyMultipleChoice[] {
    return this.selectedContactProperty?.choices ?? []
  }

  get contactPropertyChoice(): IContactPropertyMultipleChoice {
    // todo
    return {}
  }

  set contactPropertyChoice(value: IContactPropertyMultipleChoice) {
    // todo: add expression generation logic from https://viamoinc.atlassian.net/browse/VMO-6656 when it's ready
  }

  @Getter subscriberPropertyFields!: IContactPropertyOption[]
}

export default MultipleChoiceContactPropertyEditor
</script>

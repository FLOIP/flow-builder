<template>
  <div class="group-membership-editor">
    <hr>
    <div class="form-group">
      <label class="text-primary">{{ 'flow-builder.action-label' | trans }}</label>
      <p>{{ 'flow-builder.group-membership-action-hint' | trans }}</p>
      <div class="form-group">
        <div class="custom-control custom-radio">
          <input
            id="addGroup"
            v-model="membershipAction"
            type="radio"
            name="groupMembershipAction"
            :value="MEMBERSHIP_ACTION.ADD"
            class="custom-control-input">
          <label
            class="custom-control-label font-weight-normal"
            for="addGroup">
            {{ 'flow-builder.set-group-membership' | trans }}
          </label>
        </div>
        <div class="custom-control custom-radio">
          <input
            id="setFromExpression"
            v-model="membershipAction"
            type="radio"
            name="groupMembershipAction"
            :value="MEMBERSHIP_ACTION.SET_FROM_EXPRESSION"
            class="custom-control-input">
          <label
            class="custom-control-label font-weight-normal"
            for="setFromExpression">
            {{ 'flow-builder.set-group-membership-from-expression' | trans }}
          </label>
        </div>
        <div class="custom-control custom-radio">
          <input
            id="clearGroup"
            v-model="membershipAction"
            type="radio"
            name="groupMembershipAction"
            :value="MEMBERSHIP_ACTION.REMOVE"
            class="custom-control-input">
          <label
            class="custom-control-label font-weight-normal"
            for="clearGroup">
            {{ 'flow-builder.clear-group-membership' | trans }}
          </label>
        </div>
      </div>

      <validation-message
        #input-control="{ isValid }"
        :message-key="`block/${block.uuid}/config/group_key`">
        <div class="block-group-key">
          <text-editor
            v-model="groupKey"
            :label="'flow-builder.group-label' | trans"
            :label-class="'font-weight-bold'"
            :placeholder="'flow-builder.enter-group-label' | trans"
            :valid-state="isValid" />
        </div>
      </validation-message>

      <validation-message
        v-if="membershipAction === MEMBERSHIP_ACTION.SET_FROM_EXPRESSION"
        #input-control="{ isValid }"
        :message-key="`block/${block.uuid}/config/is_member`">
        <expression-input
          :label="'flow-builder.value-expression' | trans"
          :placeholder="'flow-builder.enter-expression' | trans"
          :label-class="'font-weight-bold'"
          :current-expression="isMember"
          :valid-state="isValid"
          @commitExpressionChange="updateIsMemberExpression" />
      </validation-message>
    </div>
  </div>
</template>

<script lang="ts">
import {IBlock} from '@floip/flow-runner'
import {Component, Prop} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import Lang from '@/lib/filters/lang'
import {get} from 'lodash'
import {mixins} from 'vue-class-component'
import ValidationMessage from '@/components/common/ValidationMessage.vue'
import ExpressionInput from '@/components/common/ExpressionInput.vue'
import TextEditor from '@/components/common/TextEditor.vue'

const flowVuexNamespace = namespace('flow')

const NULL_STRING_EXPRESSION = '@(null)'
const TRUTHY_STRING_EXPRESSION = '@(true)'
const EMPTY_STRING_EXPRESSION = ''

@Component({
  components: {
    TextEditor,
    ExpressionInput,
    ValidationMessage,
  },
})
class GroupMembershipEditor extends mixins(Lang) {
  @Prop() readonly block!: IBlock

  MEMBERSHIP_ACTION = {
    ADD: 'add',
    SET_FROM_EXPRESSION: 'set_from_expression',
    REMOVE: 'remove',
  }

  get membershipAction(): string {
    if (this.isMember === NULL_STRING_EXPRESSION) {
      return this.MEMBERSHIP_ACTION.REMOVE
    } else if (this.isMember === TRUTHY_STRING_EXPRESSION) {
      return this.MEMBERSHIP_ACTION.ADD
    }
    return this.MEMBERSHIP_ACTION.SET_FROM_EXPRESSION
  }

  set membershipAction(value: string) {
    if (value === this.MEMBERSHIP_ACTION.REMOVE) {
      this.updateIsMemberExpression(NULL_STRING_EXPRESSION)
    } else if (value === this.MEMBERSHIP_ACTION.ADD) {
      this.updateIsMemberExpression(TRUTHY_STRING_EXPRESSION)
    } else {
      this.updateIsMemberExpression(EMPTY_STRING_EXPRESSION)
    }
  }

  get groupKey(): string {
    return get(this.block.config, 'group_key')
  }

  set groupKey(value: string) {
    this.block_updateConfigByPath({
      blockId: this.block.uuid,
      path: 'group_key',
      value,
    })
  }

  get isMember(): string {
    return get(this.block.config, 'is_member', EMPTY_STRING_EXPRESSION)
  }

  updateIsMemberExpression(value: string): void {
    this.block_updateConfigByPath({
      blockId: this.block.uuid,
      path: 'is_member',
      value,
    })
  }

  @flowVuexNamespace.Mutation block_updateConfigByPath!: (
    {blockId, path, value}: { blockId: string, path: string, value: string }
  ) => void
}

export default GroupMembershipEditor
</script>

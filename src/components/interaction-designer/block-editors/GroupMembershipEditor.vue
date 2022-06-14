<template>
  <div class="group-membership-editor">
    <hr>
    <div class="form-group">
      <label class="text-primary">{{ trans('flow-builder.action-label') }}</label>
      <p>{{ trans('flow-builder.group-membership-action-hint') }}</p>
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
            {{ trans('flow-builder.set-group-membership') }}
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
            {{ trans('flow-builder.clear-group-membership') }}
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
            {{ trans('flow-builder.set-group-membership-from-expression') }}
          </label>
        </div>
      </div>

      <validation-message
        :message-key="`block/${block.uuid}/config/group_key`">
        <template #input-control="{ isValid }">
          <div class="block-group-key">
            <text-editor
              v-model="groupKey"
              :label="trans('flow-builder.group-label')"
              :label-class="'font-weight-bold'"
              :placeholder="trans('flow-builder.enter-group-label')"
              :valid-state="isValid" />
          </div>
        </template>
      </validation-message>

      <validation-message
        v-if="membershipAction === MEMBERSHIP_ACTION.SET_FROM_EXPRESSION"

        :message-key="`block/${block.uuid}/config/is_member`">
        <template #input-control="{ isValid }">
          <expression-input
            :label="trans('flow-builder.value-expression')"
            :placeholder="trans('flow-builder.enter-expression')"
            :label-class="'font-weight-bold'"
            :current-expression="isMember"
            :valid-state="isValid"
            @commitExpressionChange="updateIsMemberExpression" />
        </template>
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

const flowVuexNamespace = namespace('flow')

const NULL_STRING_EXPRESSION = '@(null)'
const TRUTHY_STRING_EXPRESSION = '@(true)'
const EMPTY_STRING_EXPRESSION = ''

@Component({})
export class GroupMembershipEditor extends mixins(Lang) {
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

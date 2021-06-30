<template>
  <section class="mb-3">
    <label class="title">Title</label>
    <div class="d-flex">
      <input
        v-model="name"
        type="text"
        class="w-100">
      <span class="btn btn-outline-dark" @click="editCode = !editCode">
        <i class="glyphicon glyphicon-cog" />
      </span>
    </div>
    <div v-if="editCode">
      <label>Edit Block Code</label>
      <div class="d-flex">
        <input type="text" class="form-control w-100" v-model="autoCode" />
        <span class="btn btn-outline-dark" @click="editCode = false">
          <i class="glyphicon glyphicon-check" />
        </span>
      </div>
    </div>
    <div v-else>
      <strong>Code:</strong> {{ autoCode }}
    </div>
  </section>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import TextEditor from '@/components/common/TextEditor.vue'
import ValidationMessage from '@/components/common/ValidationMessage.vue'
import {mixins} from 'vue-class-component'
import Lang from '@/lib/filters/lang'
import {IBlock} from '@floip/flow-runner'
import {namespace} from 'vuex-class'

const flowVuexNamespace = namespace('flow')

@Component({
  components: {
    TextEditor,
    ValidationMessage,
  },
})
class TitleEditor extends mixins(Lang) {
  autoCode = ''
  editCode = false

  @Prop() readonly block!: IBlock

  snakeCase = (value: string) => value.trim()
    .split(' ')
    .map((word) => word.toLowerCase())
    .join('_')

  get name(): string {
    return this.block.name
  }
  set name(value: string) {
    this.block_setName({blockId: this.block.uuid, value})
    this.autoCode = this.snakeCase(value)
  }

  @flowVuexNamespace.Mutation block_setName!: ({blockId, value}: {blockId: string, value: string}) => void
}
export default TitleEditor
</script>

<style scoped>
.title {
  color: #531944;
}
</style>


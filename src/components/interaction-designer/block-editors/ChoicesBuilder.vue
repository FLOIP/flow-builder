<template>
  <div class="form-group">
    <label>{{'trees.choices' | trans}}</label>

    <div v-for="n in (choices.length + 1)" class="form-group">
      <slot :api="api"
            :choice="getChoiceBy(choices[n - 1])"
            :label="n"
            :i="n - 1"
            :isAdditional="n > choices.length"
            :updateChoiceBy="updateChoiceBy">

        <div class="input-group transition-all" :class="{dimmed: n > choices.length}">
          <div class="input-group-addon mcq-sidebar-choice-labels">
            {{n}}
          </div>

          <input type="text"
                 :value="(getChoiceBy(choices[n - 1]) || {}).value"
                 @input="updateChoiceBy(choices[n - 1], $event.target.value)"
                 class="form-control">
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
  import lang from 'lib/filters/lang'
  import {concat, findLastIndex, first, get, keys, map} from 'lodash'
  import {mapActions, mapGetters} from 'vuex'
  import {findOrGenerateStubbedVariantOn} from '@/store/flow/resource'
  import {SupportedContentType} from '@floip/flow-runner'

  // todo: v-focus when deleting

  export default {
    props: {
      api: {type: Object, default: () => {{}}},
      block: {type: Object, default: null},
      flow: {type: Object, default: null},
    },

    mixins: [lang],

    computed: {
      ...mapGetters('flow', ['resourcesByUuid']),

      fieldLabels() {
        return keys(get(this.block, 'config.choices', {}))

        // let fieldLabels = get(this.selectedBlock, 'uiData.fieldLabels', [])
        // return map(concat(this.choices, ''), (choice, i) => {
        //   if (fieldLabels[0] === '•') {
        //     return '•'
        //   } else {
        //     return fieldLabels[i] || i + 1
        //   }
        // })
      },

      choices() { // maximum of 10
        return keys(get(this.block, 'config.choices', {})).sort()
      },
    },

    methods: {
      ...mapActions('flow/SelectOneResponse', ['updateChoiceValueForDefaultLanguage']),

      getChoiceBy(key) {
        if (!key) {
          return // bail
        }

        const resourceId = get(this.block, `config.choices.${key}`, '')
        const resource = this.resourcesByUuid[resourceId]
        const {
          languages: {0: {id: languageId}}, // : ILanguage
          supportedModes: modes} = this.flow

        return findOrGenerateStubbedVariantOn(resource, {languageId, modes, contentType: SupportedContentType.TEXT})
      },

      updateChoiceBy(key, value) {
        // note: there is potential for this to be called on a choice that doesn't yet exist
        if (!key) {
          debugger
          // inflateResourceWithVariant()
          return // bail
        }

        const resourceId = get(this.block, `config.choices.${key}`, '')
        const {block: {uuid: blockId}} = this

        this.updateChoiceValueForDefaultLanguage({blockId, resourceId, key, value})


        // if (!this.selectedBlock) {
        //   return;
        // }
        //
        // this.choices.splice(i, 1, val) // When (i - 1) > list.length === Array.push()
        //
        // const lastPopulatedIndex = findLastIndex(this.choices, x => !!x)
        // this.choices.splice(lastPopulatedIndex + 1, Number.MAX_SAFE_INTEGER) // clear out empties
        //
        // this.$store.dispatch('setMcqOutputNames', {jsKey: this.selectedBlock.jsKey})
        // this.$store.dispatch('setMcqSidebarFieldLabels', {jsKey: this.selectedBlock.jsKey})
        // this.$store.dispatch('setContentFromQuestionText', {jsKey: this.selectedBlock.jsKey})
        // this.$store.dispatch('uiChanged', {msg: 'MCQ choices changed'});
      },
    },
  }
</script>

<x-style lang="scss">
  .dimmed {
    opacity: 0.8;
  }
</x-style>

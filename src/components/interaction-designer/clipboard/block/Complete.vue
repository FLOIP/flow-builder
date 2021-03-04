<template>
  <div class="clipboard-block card-z1 font-roboto">
    <div class="card-body md-room-below">
      <h4 class="card-title">
        <template v-if="currentQuestion.flowSummary.length">{{'call-center.call-summary' | trans}}</template>
        <template v-else>{{'call-center.call-completed' | trans}}</template>
      </h4>

      <interaction-summary
          v-for="interaction in currentQuestion.flowSummary"
          :interaction="interaction"
          :key="interaction.blockInteractionId.toString()"
          :viamo="viamo"/>
    </div>
  </div>
</template>
<script>
  import InteractionSummary from "../InteractionSummary"
  import lang from 'lib/filters/lang'

  export default {
    name: 'Complete',
    components: {InteractionSummary},
    created() {
      this.onComplete()
    },
    props: {
      /** @type Complete */
      currentQuestion: {},

      /** The root package of Clipboard */
      viamo: Object,

      onComplete: Function,
    },
    mixins: [lang],
  }
</script>
<template>
  <div class="card-text" v-html="contentMarkdownAsHtml"/>
</template>
<script>
  import showdown from 'showdown'

  showdown.setOption('openLinksInNewWindow', true)
  showdown.setOption('parseImgDimensions', true)
  const showdownConverter = new showdown.Converter()

  export default {
    name: 'ClipboardContent',
    props: {
      /** @type Block */
      content: String,
    },

    computed: {
      contentMarkdownAsHtml() {
        return showdownConverter.makeHtml(this.content)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .card-text {
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 0 !important;
    margin: 0;
  }

  .card-text ::v-deep a {
    color: #ff4081;
    text-decoration: underline;
  }

  .card-text ::v-deep p {
    margin-bottom: 0 !important;
  }
</style>

import Backbone from 'backbone'
import lodash from 'lodash'
// todo: add backbone as a dependency here, skip it from global js bundle

export default {
  data() {
    return {
      legacyDomEventProxy: null, // these are [optionally] provided by LegacyBlockHelpers, because I don't know how to deep-merge events :|
      events: null, // these are [optionally] be provided by consuming vue-component definition
    }
  },

  mounted() {
    const
      { $el: el } = this
    const methods = lodash.pick(this, Object.keys(this.$options.methods))
    const events = {
      ...this.legacyBlockEvents,
      ...this.events,
    }
    const BBEventProxy = Backbone.View.extend({ el, events, ...methods })

    this.legacyDomEventProxy = new BBEventProxy()
  },

  destroyed() {
    this.legacyDomEventProxy.stopListening()
    this.legacyDomEventProxy.undelegateEvents()
  },
}

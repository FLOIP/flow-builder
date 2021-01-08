import Vue from 'vue'
import {keyBy} from 'lodash'
import {mapActions, mapGetters, mapState, Store} from 'vuex'
import {createTreeAdapterFor} from '@/store/trees/adapters/TreeAdapter'

export function createAppUiAdapterFor(ui, store: Store<any>) {
  // data takes precedence over defined computed props
  delete ui.originalTreeJson

  return new Vue({
    store,

    data() {
      return ui
    },

    computed: {
      ...mapGetters('flow', ['activeFlow']),
      ...mapState('flow', ['flows']),


      _treeProxies() {
        const {$store} = this

        return keyBy(this.flows.map(f =>
          createTreeAdapterFor(f, $store)), 'id')
      },

      originalTreeJson() {
        const {uuid} = this.activeFlow
        return this._treeProxies[uuid]
      },
    },

    watch: {
      originalTreeJson() {
        this.initializeTreeModel()
      },
    },

    methods: {
      ...mapActions(['initializeTreeModel']),
    }
  })
}

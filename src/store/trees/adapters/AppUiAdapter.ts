import Vue from 'vue'
import {get, keyBy} from 'lodash'
import {mapActions, mapGetters, mapState, Store} from 'vuex'
import {createTreeAdapterFor} from '@/store/trees/adapters/TreeAdapter'
import {IRootState} from "@/store";

export function createAppUiAdapterFor(ui, store: Store<any>) {
  // sanitize data -- data takes precedence over defined computed props, preventing them from
  //                  being executed at all.
  delete ui.originalTreeJson
  delete ui.selectedBlock
  delete ui.isEditable

  global.viamo = global.builder

  return new Vue({
    store,

    data() {
      return ui
    },

    computed: {
      ...mapGetters('flow', ['activeFlow']),
      ...mapState('flow', ['flows']),
      ...mapState('builder', ['isEditable']),
      ...mapState('builder', {

        selectedBlock: (state: IRootState, _store) =>
          // fyi -- this results in a computed getter without a setter
          get(_store.activeBlock, 'uuid', ''),

      }),

      _treeProxies() {
        const {$store} = this

        return keyBy(this.flows.map(f =>
          createTreeAdapterFor(f, $store)), 'id')
      },

      // isEditable() {
      //   return this.isEditable
      // },

      // selectedBlock() {
      //   return get(this.activeBlock, 'uuid', '')
      // },

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

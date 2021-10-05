/* eslint-disable no-underscore-dangle */
import Vue from 'vue'
import {get, keyBy} from 'lodash'
import {mapActions, mapGetters, mapState, Store} from 'vuex'
import {createTreeAdapterFor, ITree} from '@/store/trees/adapters/TreeAdapter'
import {IRootState} from "@/store";
import {IFlow} from "@floip/flow-runner";
import {Dictionary} from "vue-router/types/router";

export interface IAppUi {
  originalTreeJson?: object
  selectedBlock?: string
  isEditable?: number

}

// eslint-disable-next-line @typescript-eslint/class-name-casing
declare global {
  namespace NodeJS {
    interface Global {
      viamo: Vue
      builder: Vue
      app: {
        ui: IAppUi
      }
    }
  }
}

export function createAppUiAdapterFor(ui: IAppUi, store: Store<any>) {
  // sanitize data -- data takes precedence over defined computed props, preventing them from
  //                  being executed at all.

  // eslint-disable-next-line no-param-reassign
  delete ui.originalTreeJson
  // eslint-disable-next-line no-param-reassign
  delete ui.selectedBlock
  // eslint-disable-next-line no-param-reassign
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

        // fyi -- this results in a computed getter without a setter
        selectedBlock: (state: IRootState, _store) => get(_store.activeBlock, 'uuid', ''),

      }),

      _treeProxies() {
        const {$store} = this

        return keyBy(this.flows.map((f: IFlow) => createTreeAdapterFor(f, $store)), 'id')
      },

      // isEditable() {
      //   return this.isEditable
      // },

      // selectedBlock() {
      //   return get(this.activeBlock, 'uuid', '')
      // },

      originalTreeJson() {
        if (!this.activeFlow) {
          return null
        }

        const {uuid} = this.activeFlow
        const treeProxies: Dictionary<ITree> = this._treeProxies as unknown as Dictionary<ITree>
        return treeProxies[uuid]
      },
    },

    watch: {
      originalTreeJson() {
      // @note: watchers can have a config property of {immediate: true}

        // todo: if we're going to do this like this, then we also need to have an initial
        //       invocation -- unless this already occurs automatically ? otherwise, drop it into
        //       `created`/`mounted` ?

        // @note we call configure() w/in IntxDes::created() which invokes bootstrapLegacy() which
        //       creates a new AppUIAdapter --- this watcher probably _can't_ get invoked.
        //       should we just move this to somewhere else?

        debugger
        this.initializeTreeModel()
      },
    },

    methods: {
      ...mapActions(['initializeTreeModel']),
    }
  })
}

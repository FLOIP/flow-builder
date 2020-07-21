import ImportedLang from 'lang.js'
import ImportedMoment from 'moment'
import ImportedJquery from 'jquery'
import {merge} from 'lodash'

export function bootstrapLegacyGlobalDependencies() {
  // initialize configuration sources
  const __APP__ = require('../../../app.config')
  const __CONTEXT__ = require('../../../builder.config')

  // todo: the remaining legacy code still expects the ability to mutate data directly on `app.ui.*` rather than using trees store
  //      for now, we'll need to ensure app.ui === __TREES_UI__ */
  const app = merge(global.app || {}, __CONTEXT__)
  const __TREES_UI__ = app.ui
  const __AUDIO__ = app.audio

  // configure libraries
  const Lang = new ImportedLang
  Lang.setLocale(__APP__.locale)
  Lang.defaultLocale = 'en'

  const moment = ImportedMoment
  moment.locale(Lang.getLocale())

  const jQuery = ImportedJquery
  const $ = ImportedJquery

  // export as globals (overwrites pre-existing)
  const exported = {
    Lang,
    moment,
    $,
    jQuery,

    __APP__,
    __CONTEXT__,
    __TREES_UI__,
    __AUDIO__,

    app,
  }
  Object.assign(global, exported)

  // required inline due to front-loading of imports and having jQuery dependency
  require('bootstrap')
  require('bootstrap-datetimepicker/src/js/bootstrap-datetimepicker')
  $.fn.datetimepicker.defaults.locale = Lang.getLocale()

  return exported
}

export default bootstrapLegacyGlobalDependencies

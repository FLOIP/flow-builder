import ImportedLang from 'lang.js'
import ImportedMoment from 'moment'
import ImportedJquery from 'jquery'
import {isEmpty, merge} from 'lodash'

export function bootstrapLegacyGlobalDependencies(appConfig = {}, builderConfig = {}) {
  // initialize configuration sources
  const __APP__ = !isEmpty(appConfig) ? appConfig : require('../../app.config.json')
  const __CONTEXT__ = !isEmpty(builderConfig) ? builderConfig : require('../../builder.config.json')
  const source = appConfig.i18n ? appConfig.i18n : require('../../assets/messages.json')

  // todo: the remaining legacy code still expects the ability to mutate data directly on `app.ui.*` rather than using trees store
  //      for now, we'll need to ensure app.ui === __TREES_UI__ */
  const app = merge(global.app || {}, __CONTEXT__)
  const __TREES_UI__ = app.ui
  const __AUDIO__ = app.audio

  // configure libraries
  const Lang = new ImportedLang()
  Lang.setMessages(source)
  Lang.setLocale(__APP__.locale)
  Lang.defaultLocale = 'en'

  const moment = ImportedMoment
  moment.locale(Lang.getLocale())

  const jQuery = ImportedJquery
  const jQ = ImportedJquery

  // export as globals (overwrites pre-existing)
  const exported = {
    Lang,
    moment,
    // aliasing $ to jQ to avoid jQuery conflict in consumer side
    jQ,
    jQuery,

    __APP__,
    __CONTEXT__,
    __TREES_UI__,
    __AUDIO__,

    app,
  }
  Object.assign(global, exported)

  require('bootstrap-datetimepicker/src/js/bootstrap-datetimepicker')
  jQ.fn.datetimepicker.defaults.locale = Lang.getLocale()

  return exported
}

export default bootstrapLegacyGlobalDependencies

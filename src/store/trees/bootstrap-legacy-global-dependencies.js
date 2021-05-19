import ImportedLang from 'lang.js'
import ImportedMoment from 'moment'
import ImportedJquery from 'jquery'
import { merge, isEmpty } from 'lodash'
import {createAppUiAdapterFor} from '@/store/trees/adapters/AppUiAdapter'

export function bootstrapLegacyGlobalDependencies(appConfig = {}, builderConfig = {}, supportedBlockTypes = {}) {
  // initialize configuration sources
  const __APP__ = !isEmpty(appConfig) ? appConfig : require('../../../app.config')
  const __CONTEXT__ = !isEmpty(builderConfig) ? builderConfig : require('../../../builder.config')
  if (supportedBlockTypes) {
    __CONTEXT__['ui']['blockClasses'] = supportedBlockTypes
  }
  const i18nMessages = appConfig.i18n ? appConfig.i18n : require('../../assets/messages.json');

  // todo: the remaining legacy code still expects the ability to mutate data directly on `app.ui.*` rather than using trees store
  //      for now, we'll need to ensure app.ui === __TREES_UI__ */
  const app = merge(global.app || {}, __CONTEXT__)
  app.ui = createAppUiAdapterFor(app.ui, global.builder.$store) // shim to support legacy

  const __TREES_UI__ = app.ui
  const __AUDIO__ = app.audio

  // configure libraries
  const Lang = new ImportedLang()
  Lang.setMessages(i18nMessages)
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

  require('bootstrap-datetimepicker/src/js/bootstrap-datetimepicker')
  $.fn.datetimepicker.defaults.locale = Lang.getLocale()

  return exported
}

export default bootstrapLegacyGlobalDependencies

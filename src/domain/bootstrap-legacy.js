import Lang from 'lang.js'
import moment from 'moment'
import jquery from 'jquery'

global.__APP__ = require('../../app.config')
global.__CONTEXT__ = require('../../builder.config')

global.Lang = new Lang
global.Lang.setLocale(global.__APP__.locale)
global.Lang.defaultLocale = 'en'

global.moment = moment
global.moment.locale(global.Lang.getLocale())

global.jQuery = global.$ = jquery

const datetimepicker = require('bootstrap-datetimepicker/src/js/bootstrap-datetimepicker')
global.$.fn.datetimepicker.defaults.locale = global.Lang.getLocale()

/** todo: the remaining legacy code still expects the ability to mutate data directly on `app.ui.*` rather than using trees store
 *        for now, we'll need to ensure app.ui === __TREES_UI__ */
global.app = _.merge(global.app || {}, global.__CONTEXT__)
global.__TREES_UI__ = global.app.ui
global.__AUDIO__ = global.app.audio

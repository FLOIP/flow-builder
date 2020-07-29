import moment from 'moment'

export default {
  filters: {
    formatDate(date, format = 'llll') {
      if (!date) {
        return ''
      }
      return moment.utc(date).format(format)
    },

    fromNow(date, withoutSuffix) {
      return moment.utc(date).fromNow(withoutSuffix)
    },

    formatDuration(duration, unit = 'seconds', withSuffix) {
      let currentLocale = moment.locale()
      moment.locale('en') //this function only gets used in english.
      let result = moment.duration(duration, unit).humanize(withSuffix)
      moment.locale(currentLocale)
      return result
    },

    formatDurationLocalized(duration, locale, unit = 'seconds', withSuffix) {
      let currentLocale = moment.locale()
      moment.locale(locale) 
      let result = moment.duration(duration, unit).humanize(withSuffix)
      moment.locale(currentLocale)
      return result
    }
  }
}

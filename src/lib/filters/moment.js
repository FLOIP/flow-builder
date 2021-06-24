import moment from 'moment'

export default {
  filters: {
    formatDate(date, format = 'llll') {
      if (!date) {
        return ''
      }
      return moment.utc(date)
        .format(format)
    },

    fromNow(date, withoutSuffix) {
      return moment.utc(date)
        .fromNow(withoutSuffix)
    },

    formatDuration(duration, unit = 'seconds', withSuffix) {
      const currentLocale = moment.locale()
      // this function only gets used in english.
      moment.locale('en')
      const result = moment.duration(duration, unit)
        .humanize(withSuffix)
      moment.locale(currentLocale)
      return result
    },

    formatDurationLocalized(duration, locale, unit = 'seconds', withSuffix) {
      const currentLocale = moment.locale()
      moment.locale(locale)
      const result = moment.duration(duration, unit)
        .humanize(withSuffix)
      moment.locale(currentLocale)
      return result
    },
  },
}

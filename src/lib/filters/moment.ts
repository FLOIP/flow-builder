import moment, {DurationInputArg1, DurationInputArg2, MomentInput} from 'moment'

import {Vue, Options} from 'vue-class-component'

export function formatDate(date: MomentInput, format = 'llll'): string {
  if (date === null || date === undefined) {
    return ''
  }
  return moment.utc(date).format(format)
}

export function fromNow(date: MomentInput, withoutSuffix?: boolean): string {
  return moment.utc(date).fromNow(withoutSuffix)
}

// This function only gets used in English
export function formatDuration(
  duration: DurationInputArg1,
  unit: DurationInputArg2 = 'seconds',
  withSuffix?: boolean,
): string {
  const currentLocale = moment.locale()
  moment.locale('en')
  const result = moment.duration(duration, unit).humanize(withSuffix)
  moment.locale(currentLocale)
  return result
}

export function formatDurationLocalized(
  duration: DurationInputArg1,
  locale: string,
  unit: DurationInputArg2 = 'seconds',
  withSuffix?: boolean,
): string {
  const currentLocale = moment.locale()
  moment.locale(locale)
  const result = moment.duration(duration, unit).humanize(withSuffix)
  moment.locale(currentLocale)
  return result
}

@Options({
  methods: {
    formatDate,
    fromNow,
    formatDuration,
    formatDurationLocalized,
  },
})
export class Moment extends Vue {}

export default Moment

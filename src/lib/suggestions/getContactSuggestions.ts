/* eslint-disable import/prefer-default-export */

import {IExpressionContext, ISuggestion} from '../types'

const defaultContactPropertyFields = [
  'phone',
  'urns',
  'preferred_mode',
  'preferred_urn',
  'active_urn',
  'created_at',
  'timezone',
  'language',
  'groups',
  'properties',
]

export function getContactSuggestions(context: IExpressionContext): ISuggestion[] {
  const subscriberPropertyFields = context.subscriberPropertyFields

  const contactSuggestions: ISuggestion = {
    trigger: '@contact.',
    values: defaultContactPropertyFields.map(name => `@contact.${name}`),
  }

  const contactPropertiesSuggestions: ISuggestion = {
    trigger: '@contact.properties.',
    values: [],
  }

  const subscriberPropertyFieldsSuggestions: ISuggestion[] = []

  subscriberPropertyFields.forEach(field => {
    if (!defaultContactPropertyFields.includes(field.name)) {
      contactSuggestions.values.push(`@contact.${field.name}`)

      subscriberPropertyFieldsSuggestions.push({
        trigger: `@contact.${field.name}.`,
        values: Object.keys(field).map(key => `@contact.${field.name}.${key}`),
      })
    }

    contactPropertiesSuggestions.values.push(`@contact.properties.${field.name}`)

    subscriberPropertyFieldsSuggestions.push({
      trigger: `@contact.properties.${field.name}.`,
      values: Object.keys(field).map(key => `@contact.properties.${field.name}.${key}`),
    })
  })

  return [
    {
      trigger: '@',
      values: [
        '@contact',
      ],
    },
    contactSuggestions,
    contactPropertiesSuggestions,
    ...subscriberPropertyFieldsSuggestions,
  ]
}

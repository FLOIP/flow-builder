import {ErrorObject} from 'ajv'
import Lang from '@/lib/filters/lang'

const lang = new Lang()

type DataPath = ErrorObject['dataPath']
type MessageKey = string

export default class SupplementaryAJVErrorsBuilder {
  errors = new Map<DataPath, MessageKey>()

  add(dataPath: DataPath, messageKey: MessageKey): SupplementaryAJVErrorsBuilder {
    if (!this.errors.has(dataPath)) {
      this.errors.set(dataPath, `flow-builder-validation.${messageKey}`)
    }

    return this
  }

  list(): ErrorObject[] {
    return [...this.errors].map(([dataPath, messageKey]) => ({
      dataPath,
      message: lang.trans(messageKey),
    } as ErrorObject))
  }
}

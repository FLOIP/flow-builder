import {IBlock, ILanguage} from '@floip/flow-runner'

export interface IBlockExtended extends IBlock {
  jsKey: string,
  customData: IBlockCustomData,
  audioFiles: Record<ILanguage['id'], string>,
  smsContent: Record<ILanguage['id'], string>,
  ussdContent: Record<ILanguage['id'], string>,
}

export interface IBlockCustomData {
  title: string,
  repeatKey: number,
  repeatMax: number,
  repeatDelay: number,
  repeat: boolean,
  reviewed?: Record<string, boolean>,
  approved?: Record<string, boolean>,
}

export interface IAudioFile {
  id: string,
  // filename: string,
  audio_uuid: string,
  description: string,
  language_id: string,
  duration_seconds: string,
  original_extension: string,
  created_at: string,
  uri: string,
}

export interface IAudioFileSelection {
  value: IAudioFile,
  langId: ILanguage['id'],
}

export interface IBatchMatchAudioData {
  results: unknown,
  status: number,
  message: string,
  isEmpty: boolean,
  isFailure: boolean,
  isPending: boolean,
  isComplete: boolean,
}

export interface IExpressionContext {
  contact: unknown,
  flow: unknown,
  date: unknown,
}

export interface ISuggestionValue {
  value: string,
  focusText: Number[],
}

export interface ISuggestion {
  trigger: string,
  values: (ISuggestionValue | string)[],
}

export interface ISubscriberPropertyField {
  id: string,
  name: string,
  display_label: string,
}

export interface IPositionLeftTop {
  left: number,
  top: number,
}

export type BlockClasses = string[]

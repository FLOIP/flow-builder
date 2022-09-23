import {IResourceValue as IResourceDefinitionVariantOverModes} from '@floip/flow-runner/dist/flow-spec/IResource'

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

export interface IResourceDefinitionVariantOverModesWithOptionalValue extends Partial<IResourceDefinitionVariantOverModes> {
  value?: IResourceDefinitionVariantOverModes['value'],
}

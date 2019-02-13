import { Source } from './source'

export interface Filter {
  source?: Source,
  text?: string,
  onlyByMe?: boolean,
}

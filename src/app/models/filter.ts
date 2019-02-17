import { Source } from './source'

export interface Filter {
  source?: Source,
  keywords?: string,
  onlyByMe?: boolean,
}

import {Artist} from './Artist'
import {Track} from './Track';

export type SearchResponse = {
  artists: Artist[];
  tracks: Track[];
}
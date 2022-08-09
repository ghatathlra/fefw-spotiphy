import axios from 'axios';
import {stringify} from 'qs';

import {SearchPayload} from '../types/SearchPayload';
import {Artist} from '../types/Artist';
import {Track} from '../types/Track';
import {SearchResponse} from '../types/SearchResponse';

function convertRawArtistToArtist(rawArtist: Record<string, any>): Artist {
  return {
    id: rawArtist.id || '',
    name: rawArtist.name || 'No name',
    genres: (rawArtist.genres || []).join(',') || 'Unknown',
    image: (rawArtist.images || [])[0]?.url || '',
  };
}

function convertRawTrackToTrack(rawTrack: Record<string, any>): Track {
  return {
    id: rawTrack.id || '',
    name: rawTrack.name || '',
    previewUrl: rawTrack.preview_url || '',
    artist: (rawTrack.artists || [])[0]?.name || 'Unknown artist',
  };
}

export async function callSearchApi(payload: SearchPayload): Promise<SearchResponse> {
  const response = await axios.get<any>(`/api/search?${stringify(payload)}`);
  const {artists, tracks} = response.data;
  const searchResponse: SearchResponse = {
    artists: artists.items.map((rawArtist: any) => convertRawArtistToArtist(rawArtist)),
    tracks: tracks.items.map((rawTrack: any) => convertRawTrackToTrack(rawTrack)),
  };
  return searchResponse;
}
import type { Pagination } from './Pagination';

export interface GetVideosResponse {
    data: Video[]
    pagination: Pagination
}

export interface Video {
    id: string
    stream_id: string | null
    user_id: string
    user_login: string
    user_name: string
    title: string
    description: string
    created_at: string
    published_at: string
    url: string
    thumbnail_url: string
    viewable: string
    view_count: number
    language: string
    type: VideoType
    duration: string
    muted_segments: MutedSegment[]
  }
  
export interface MutedSegment {
    duration: number
    offset: number
}

export type VideoType = 'upload' | 'archive' | 'highlight'
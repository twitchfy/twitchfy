import type { Pagination } from './Pagination';

export interface PostCreateClipResponse {
    data: PostCreateClip[]
}

export interface GetClipsResponse {
    data: GetClip[],
    pagination: Pagination
}

export interface PostCreateClip {
    id: string
    edit_url: string
}

export interface GetClip {
    id: string
    url: string
    embed_url: string
    broadcaster_id: string
    broadcaster_name: string
    creator_id: string
    creator_name: string
    video_id: string
    game_id: string
    language: string
    title: string
    view_count: number
    created_at: string
    thumbnail_url: string
    duration: number
    vod_offset: number | null
    is_featured: boolean
}


export interface GetClipsDownloadData {
    clip_id: string
    landscape_download_url: string | null
    portrait_download_url: string | null
}

export interface GetClipsDownloadResponse {
    data: GetClipsDownloadData[]
}
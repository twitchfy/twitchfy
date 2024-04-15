import type { VideoType } from '@twitchapi/api-types';

export interface GetVideosOptions<T extends boolean>{
    id?: T extends true ? string | string[] : string;
    user_id?: string
    game_id?: string
    language?: string
    period?: 'all' | 'day' | 'week' | 'month'
    sort?: 'time' | 'trending' | 'views'
    type?: VideoType | 'all'
}
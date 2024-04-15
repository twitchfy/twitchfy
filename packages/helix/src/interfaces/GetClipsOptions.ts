export interface GetClipsOptions<T extends boolean> {
    broadcaster_id?: string;
    game_id?: string;
    id?: T extends true ? string | string[] : string;
    started_at?: string;
    ended_at?: string;
    is_featured?: boolean;
} 
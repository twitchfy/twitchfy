export interface GetStreamsOptions<T extends boolean> {
    user_id?: T extends true? string | string[] : string
    user_login?: T extends true? string | string[] : string
    game_id?: T extends true? string | string[] : string
    type?: 'all' | 'live'
    language?: T extends true? string | string[] : string
}
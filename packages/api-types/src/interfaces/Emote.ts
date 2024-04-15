export interface GetChannelEmotesResponse {
    data: ChannelEmote[],
    template: string
}

export interface GetGlobalEmotesResponse {
    data: GlobalEmote[],
    template: string
}

export interface GlobalEmote {
    id: string
    name: string
    images: EmoteImages
    format: EmoteFormat[]
    scale: EmoteScale[]
    theme_mode: EmoteThemeMode[]
}

export interface ChannelEmote extends GlobalEmote {
    id: string
    name: string
    images: EmoteImages
    tier: string
    emote_type: EmoteType
    emote_set_id: string
}

export interface EmoteImages {
    url_1x: string
    url_2x: string
    url_4x: string
}

export type EmoteFormat = 'static' | 'animated'
export type EmoteScale = '1x' | '2x' | '3x'
export type EmoteThemeMode = 'light' | 'dark'
export type EmoteType = 'bitstier' | 'follower' | 'subscriptions'
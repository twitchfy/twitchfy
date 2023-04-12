export interface GetBansResponse{
    data: GetBan[]
}

export interface GetBan{
    user_id: string,
    user_login: string,
    user_name: string,
    expires_at: string,
    created_at: string,
    reason: string,
    moderator_id: string,
    moderator_login: string,
    moderator_name: string,
}

export interface BanUserResponse{
    data: Ban[]
}

export interface Ban{
    broadcaster_id: string
    moderator_id: string
    user_id: string
    created_at: string
    end_time: number | null
}

export interface PostBanData{
    user_id: string
    reason?: string
    duration?: number
}

export interface PostBanBody{
    data: PostBanData
}
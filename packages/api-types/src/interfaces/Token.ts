export interface TokenCodeFlowResponse {
    access_token: string
    expires_in: number
    refresh_token: string
    scope: string[]
    token_type: string
}

export interface TokenClientCredentialsFlowResponse {
    access_token: string
    expires_in: number
    token_type: string
}

export interface RefreshTokenResponse {
    access_token: string
    refresh_token: string
    scope: string[]
    token_type: string

}
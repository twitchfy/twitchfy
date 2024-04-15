
export interface GetCheermotesResponse {
    data: Cheermote[]
}

export interface Cheermote {
    prefix: string
    tiers: CheermoteTier[]
    type: CheermoteType
    order: number
    last_updated: string
    is_charitable: boolean
  }
  
export interface CheermoteTier {
    min_bits: number
    id: string
    color: string
    images: CheermoteImages
    can_cheer: boolean
    show_in_bits_card: boolean
  }
  
export interface CheermoteImages {
    dark: CheermoteTheme
    light: CheermoteTheme
}
  

export interface CheermoteTheme {
    static: CheermoteImage;
    animated: CheermoteImage
}
export type CheermoteImage = Record<CheermoteSize, string>
export type CheermoteType = 'global_first_party' | 'global_third_party' | 'channel_custom' | 'display_only'
export type CheermoteSize = '1' | '1.5' | '2' | '3' | '4'
export interface PutAutoModSettingsBody {
    overall_level: number | null
    disability: number
    aggression: number
    sexuality_sex_or_gender: number
    misogyny: number
    bullying: number
    swearing: number
    race_ethnicity_or_religion: number
    sex_based_terms: number
}

export interface AutoModSettings {
    broadcaster_id: string
    moderator_id: string
    overall_level: number | null
    disability: number
    aggression: number
    sexuality_sex_or_gender: number
    misogyny: number
    bullying: number
    swearing: number
    race_ethnicity_or_religion: number
    sex_based_terms: number
}

export interface GetAutoModSettingsResponse{
    data: AutoModSettings[]
}

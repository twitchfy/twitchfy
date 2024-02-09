export interface GenerateTokenOptions<T extends boolean, K extends boolean>{
    refresh?: T
    raw?: K
}
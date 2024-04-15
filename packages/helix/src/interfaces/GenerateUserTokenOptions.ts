import type { GenerateAppTokenOptions } from './GenerateAppTokenOptions';

export interface GenerateUserTokenOptions<T extends boolean = boolean, K extends boolean = boolean>  extends GenerateAppTokenOptions<T, K> {
    code: string
    redirectURI: string
}
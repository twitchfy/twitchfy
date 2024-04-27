import type { GenerateTokenOptions } from './GenerateTokenOptions';

export interface GenerateAppTokenOptions<T extends boolean = boolean, K extends boolean = boolean> extends GenerateTokenOptions<T, K>  {
    clientId?: string
    clientSecret?: string
}
import type { CheermoteSize } from '@twitchapi/api-types';

/**
 * The options for generating a cheermote URL.
 * @param tier The tier of the cheermote.
 * @param size The size of the cheermote. See {@link CheermoteSize} for possible values.
 * @param format The format of the cheermote. Default is 'static'.
 * @param theme The theme of the cheermote. Default is 'light'.
 */
export interface CheermoteURLOptions {
    tier: number
    size?: CheermoteSize
    format?: 'static' | 'animated'
    theme?: 'light' | 'dark'
}
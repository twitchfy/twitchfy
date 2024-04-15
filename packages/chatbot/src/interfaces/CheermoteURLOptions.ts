import type { CheermoteSize } from '@twitchapi/api-types';

/**
 * The options for generating a cheermote URL.
 */
export interface CheermoteURLOptions {
    /**
     * The tier of the cheermote.
     */
    tier: number
    /**
     * The size of the cheermote. See {@link CheermoteSize} for possible values.
     */
    size?: CheermoteSize
    /**
     * The format of the cheermote. Default is 'static'.
     */
    format?: 'static' | 'animated'
    /**
     * The theme of the cheermote. Default is 'light'.
     */
    theme?: 'light' | 'dark'
}
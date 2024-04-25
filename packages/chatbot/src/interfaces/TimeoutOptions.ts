import type { BanOptions } from '@twitchfy/helix';

/**
 * The options to timeout an user.
 * @extends {BanOptions}
 */
export interface TimeoutOptions extends BanOptions {
    /**
     * The duration of the timeout in seconds.
     */
    duration: number;
}
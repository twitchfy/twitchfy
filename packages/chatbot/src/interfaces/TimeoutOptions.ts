import type { BanOptions } from '@twitchapi/helix';

/**
 * The options to timeout an user.
 * @param duration The duration of the timeout in seconds.
 * @extends {BanOptions}
 */
export interface TimeoutOptions extends BanOptions {
    duration: number;
}
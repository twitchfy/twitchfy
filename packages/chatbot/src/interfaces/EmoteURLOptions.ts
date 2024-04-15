/**
 * Options for generating an emote URL.
 */
export interface EmoteURLOptions {
    /**
     * The scale of the emote.
     */
    scale?: '1.0' | '2.0' | '3.0';
    /**
     * The theme of the emote.
     */
    theme?: 'light' | 'dark';
    /**
     * The format of the emote.
     */
    format?: 'static' | 'animated';
}
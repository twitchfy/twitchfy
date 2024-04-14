/**
 * Options for generating an emote URL.
 * @param scale The scale of the emote. Default is '1.0'.
 * @param theme The theme of the emote. Default is 'light'.
 * @param format The format of the emote. Default is 'static'.
 */
export interface EmoteURLOptions {
    scale?: '1.0' | '2.0' | '3.0';
    theme?: 'light' | 'dark';
    format?: 'static' | 'animated';
}
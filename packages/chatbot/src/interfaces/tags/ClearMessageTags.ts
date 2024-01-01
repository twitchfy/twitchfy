
/**
 * The ClearMessage tags send by the Twitch IRC Server.
 * @interface
 */

export interface ClearMessageTags{
    login: string
    'room-id': string
    'target-msg-id': string
    'tmi-sent-ts': string
}
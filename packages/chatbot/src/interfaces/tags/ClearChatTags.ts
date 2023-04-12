/**
 * The ClearChat tags send by the Twitch IRC Server.
 * @interface
 */

export interface ClearChatTags {
    "room-id": string
    "ban-duration"?: number
    "target-user-id"?: string
    "tmi-sent-ts": string
}
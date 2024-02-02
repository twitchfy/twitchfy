import type { BadgeMetadata } from '../BadgeMetadata';
import type { Badges } from '../Badges';


/**
 * The PrivMSG tags send by the Twitch IRC Server.
 * @interface
 */
export interface PrivMSGTags{
    'badge-info': BadgeMetadata
    badges: Badges
    bits?: string
    color: string
    'display-name': string
    id: string
    mod: string
    'reply-parent-msg-id'?: string
    'reply-parent-user-id'?: string
    'reply-parent-user-login'?: string
    'reply-parent-display-name'?: string
    'reply-parent-msg-body'?: string
    'room-id': string
    subscriber: string
    'tmi-sent-ts': string
    turbo: string
    'user-id': string
    'user-type': string
    vip: string
}
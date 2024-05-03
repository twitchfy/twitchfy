import type { EmoteFormat } from '@twitchfy/api-types';
import type { FragmentTypes, MessageTypes } from '../../../../../types';

/**
 * The event sent by Twitch when a message is sent in a channel.
 */
export interface ChannelChatMessageEvent {
    /**
     * The ID of the broadcaster who owns the channel.
     */
    broadcaster_user_id: string
    /**
     * The login name of the broadcaster who owns the channel.
     */
    broadcaster_user_login: string
    /**
     * The display name of the broadcaster who owns the channel.
     */
    broadcaster_user_name: string
    /**
     * The ID of the user who sent the message.
     */
    chatter_user_id: string
    /**
     * The login name of the user who sent the message.
     */
    chatter_user_login: string
    /**
     * The display name of the user who sent the message.
     */
    chatter_user_name: string
    /**
     * The ID of the message which was sent.
     */
    message_id: string
    /**
     * The message which was sent.
     */
    message: MessageData
    /**
     * The color of the user's display name who sent the message.
     */
    color: string
    /**
     * The badges of the user who sent the message.
     */
    badges: BadgeData[]
    /**
     * The type of the message.
     */
    message_type: MessageTypes
    /**
     * The cheer data if the message contains a cheer.
     */
    cheer: CheerData | null
    /**
     * The reply data if the message is a reply.
     */
    reply: ReplyData | null
    /**
     * The custom reward ID if the message has been sent within a custom reward reedemption.
     */
    channel_points_custom_reward_id: string | null
  }
  
/**
 * The data of a message set into the {@link ChannelChatMessageEvent}.
 */
export interface MessageData {
    /**
     * The message content.
     */
    text: string
    /**
     * The message fragments.
     */
    fragments: FragmentData[]
 }
  
/**
 * The data of a message fragment.
 */
export interface FragmentData<T extends string = string> {
    /**
     * The type of the fragment.
     */
    type: FragmentTypes
    /**
     * The text of the fragment.
     */
    text: string
    /**
     * The data of the cheeremote if the fragment is a cheeremote.
     */
    cheermote: T extends 'cheermote'? CheermoteData : null; 
    /**
     * The data of the emote if the fragment is an emote.
     */
    emote: T extends 'emote'? EmoteData : null;
    /**
     * The data of the mention if the fragment is a mention.
     */
    mention: T extends 'mention'? MentionData : null
  }

/**
 * The data of an emote set into the fragments of a message.
 */
export interface EmoteData {
    /**
     * The ID of the emote.
     */
    id: string
    /**
     * The ID of the set which contains the emote.
     */
    emote_set_id: string
    /**
     * The owner ID of the emote.
     */
    owner_id: string
    /**
     * An array containing the possible formats of the emote. Possible values are animated or static.
     */
    format: EmoteFormat[]
  }


/**
 * The data of a mention set into the fragments of a message.
 */
export interface MentionData {
    /**
     * The ID of the mentioned user.
     */
    user_id: string
    /**
     * The login name of the mentioned user.
     */
    user_login: string
    /**
     * The display name of the mentioned user.
     */
    user_name: string
  }

/**
 * The data of a badge set into the {@link ChannelChatMessageEvent}.
 */
export interface BadgeData {
    /**
     * The ID of the badge set.
     */
    set_id: string
    /**
     * The id of the badge. For example: moderator, subscriber, etc.
     */
    id: string
    /**
     * The information of the badge. This is only included if the badge is a subscriber badge, containing the number of months the user has been subscribed
     */
    info: string
  }
  
/**
 * The data of a cheer set into the {@link ChannelChatMessageEvent}.
 */
export interface CheerData {
    /**
     * The number of bits cheered.
     */
    bits: number
  }

/**
 * The data of a reply set into the {@link ChannelChatMessageEvent}.
 */
export interface ReplyData {
    /**
     * The ID of the parent message which was replied.
     */
    parent_message_id: string
    /**
     * The content of the parent message which was replied.
     */
    parent_message_body: string
    /**
     * The ID of the author of the paren message.
     */
    parent_user_id: string
    /**
     * The login name of the author of the parent message.
     */
    parent_user_name: string
    /**
     * The display name of the author of the parent message.
     */
    parent_user_login: string
    /**
     * The ID of the first message of the thread which contains the parent message.
     */
    thread_message_id: string
    /**
     * The ID of the user who started the thread.
     */
    thread_user_id: string
    /**
     * The display name of the user who started the thread.
     */
    thread_user_name: string
    /**
     * The login name of the user who started the thread.
     */
    thread_user_login: string
}

/**
 * The data of a cheeremote set into the fragments of a message.
 */
export interface CheermoteData {
    /**
     * The prefix of the cheeremote. For example: cheer.
     */
    prefix: string
    /**
     * The number of bits cheered in the cheermote.
     */
    bits: number
    /**
     * The tier of the cheeremote. For example if an user cheers Cheer1000, the tier would be 1000 but if an user cheers Cheer200 the tier would be 100.
     */
    tier: number
}
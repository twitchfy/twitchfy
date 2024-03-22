import type { EmoteFormat, FragmentTypes, MessageTypes } from '../../../../../types';

export interface ChannelChatMessageEvent {
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
    chatter_user_id: string
    chatter_user_login: string
    chatter_user_name: string
    message_id: string
    message: MessageData
    color: string
    badges: BadgeData[]
    message_type: MessageTypes
    cheer: CheerData | null
    reply: ReplyData | null
    channel_points_custom_reward_id: string | null
  }
  
export interface MessageData {
    text: string
    fragments: FragmentData[]
 }
  
export interface FragmentData<T extends string = string> {
    type: FragmentTypes
    text: string
    cheermote: T extends 'cheermote'? CheermoteData : null; 
    emote: T extends 'emote'? EmoteData : null;
    mention: T extends 'mention'? MentionData : null
  }
  
export interface EmoteData {
    id: string
    emote_set_id: string
    owner_id: string
    format: EmoteFormat[]
  }
  
export interface MentionData {
    user_id: string
    user_login: string
    user_name: string
  }
  
export interface BadgeData {
    set_id: string
    id: string
    info: string
  }
  
export interface CheerData {
    bits: number
  }

export interface ReplyData {
    parent_message_id: string
    parent_message_body: string
    parent_user_id: string
    parent_user_name: string
    parent_user_login: string
    thread_message_id: string
    thread_user_id: string
    thread_user_name: string
    thread_user_login: string
}

export interface CheermoteData {
    prefix: string
    bits: number
    tier: number
}
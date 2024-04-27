/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { MessageTypes } from '@twitchfy/eventsub';
import type { ChatBot } from './ChatBot';
import { BaseMessage } from './BaseMessage';
import { BaseUser } from './BaseUser';
import { MessageReply } from './MessageReply';
import { Collection } from './Collection';
import { BaseEmote } from './BaseEmote';
import type { ChatRoom } from './ChatRoom';
import { BaseCheermote } from './BaseCheermote';
import type { EventSubConnection } from '../enums';
import type { MessageData } from '../types';

/**
 * Represents a message in a chatroom.
 */
export class Message<T extends EventSubConnection> extends BaseMessage<T>{

  /**
   * The content of the message.
   */
  public override readonly content: string;

  /**
   * The type of the message.
   */
  public readonly type: MessageTypes;

  /**
   * The chatroom where the message was sent.
   */
  public readonly chatroom: ChatRoom<T>;

  /**
   * The mentions in the message.
   */
  public readonly mentions: Collection<string, BaseUser<T>>;

  /**
   * The emotes in the message.
   */
  public readonly emotes: Collection<string, BaseEmote<T>>;

  /**
   * The cheermotes in the message.
   */
  public readonly cheermotes: Collection<string, BaseCheermote<T>>;

  /**
   * The bits cheered in the message.
   */
  public readonly bits: number;

  /**
   * The reward Id of the message. Null if the message doesn't have a reward redemption.
   */
  public readonly rewardId: string | null;

  /**
   * The message reply of the message. Null if the message doesn't have a reply.
   */
  public readonly messageReply: MessageReply<T> | null;

  /**
   * The data of the message.
   */
  private commandData: MessageData<T>;


  /**
   * Creates a new instance of the message.
   * @param chatbot The current instance of the chatbot.
   * @param data The data of the message.
   * @param chatroom The chatroom where the message was sent.
   */
  public constructor(chatbot: ChatBot<T>, data: MessageData<T>, chatroom: ChatRoom<T>){
    super(chatbot, { ...data.message, user_id: data.chatter.id, user_name: data.chatter.displayName, user_login: data.chatter.login, chatroom_id: chatroom.id });
    this.commandData = data;
    this.type = data.message.type;
    this.chatroom = chatroom;
    this.content = this.__parseContent();
    this.mentions = this.__parseMentions();
    this.emotes = this.__parseEmotes();
    this.cheermotes = this.__parseCheermotes();
    this.bits = data.message.bits;
    this.messageReply = data.message.reply ? new MessageReply<T>(chatbot, data.message.reply, chatroom) : null;
    this.rewardId = data.message.channelRewardId;
  }

  /**
   * The Id of the author of the message.
   */
  public get authorId(){
    return this.author.id;
  }

  /**
   * Whether the message is a normal text message.
   */
  public get isText(){
    return this.commandData.message.type === 'text';
  } 

  /**
   * Whether the message was highlighted by the highlight message reward.
   */
  public get isHighlighted(){
    return this.commandData.message.type === 'channel_points_highlighted';
  }

  /**
   * Whether the message was sent by the send in subscriber mode reward. 
   */
  public get isChannelPointsSubOnly(){
    return this.commandData.message.type === 'channel_points_sub_only';
  }

  /**
   * Whether the message is an user intro message.
   */
  public get isUserIntro(){
    return this.commandData.message.type === 'user_intro';
  }

  /**
   * The message which was replied by this message. Null if the message doesn't have a reply.
   */
  public get parentReply(){
    return this.messageReply?.parent ?? null;
  }

  /**
   * The start message of the thread where this message is part of. Null if the message is not part of a thread.
   */
  public get threadReply(){
    return this.messageReply?.thread ?? null;
  }

  /**
   * Whether the message has a reward reedemption.
   */
  public get hasRewardRedeemption(){
    return !!this.rewardId;
  }

  /**
   * Parse the content of the message if the message is a command to remove the prefix and the command name.
   * @returns The parsed content.
   * @internal
   */
  private __parseContent(){
    return this.commandData.prefix ? this.commandData.message.content.slice(this.commandData.prefix.length + this.commandData.commandName.length).trim() : this.commandData.message.content;
  }

  /**
   * Parse the mentions of the message.
   * @returns A collection of the mentions.
   * @internal
   */
  private __parseMentions(){
    const data = this.commandData.message.fragments.filter((x) => x.type === 'mention').map((x) => new BaseUser(this.chatbot, { ...x.mention!.user, display_name: x.mention!.user.displayName }));
    return new Collection<string, BaseUser<T>>(data.map((x) => [x.id, x]));
  }

  /**
   * Parse the emotes of the message.
   * @returns A collection of the emotes.
   * @internal
   */
  private __parseEmotes(){
    const data = this.commandData.message.fragments.filter((x) => x.type === 'emote').map((x) => new BaseEmote(this.chatbot, { ...x.emote!, emote_set_id: x.emote!.setId, owner_id: x.emote!.ownerId, name: x.content }));
    return new Collection<string, BaseEmote<T>>(data.map((x) => [x.id, x]));
  }
  
  /**
   * Parse the cheermotes of the message.
   * @returns A collection of the cheermotes.
   * @internal
   */
  private __parseCheermotes(){
    const data = this.commandData.message.fragments.filter((x) => x.type === 'cheermote').map((x) => new BaseCheermote(this.chatbot, { ...x.cheermote!, broadcaster_id: this.chatroomId }));
    return new Collection<string, BaseCheermote<T>>(data.map((x) => [x.prefix, x]));
  }
}
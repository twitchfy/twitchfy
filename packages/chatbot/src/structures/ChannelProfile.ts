import { SubscriptionTypes } from '@twitchfy/eventsub';
import { Base } from './Base';
import type { ChatBot } from './ChatBot';
import type { ChannelEvents } from '../types';
import type { EventSubConnection } from '../enums';
import { Channel } from './Channel';

/**
 * Represents a channel profile created when the chatbot joins to a channel.
 */
export class ChannelProfile<T extends EventSubConnection> extends Base<T> {
    
  /**
   * The Id of the channel.
   */
  public readonly id: string;

  /**
   * The events from the channel that the chatbot is subscribed to.
   */
  public readonly events: ChannelEvents[];

  /**
   * Creates a new instance of the channel profile.
   * @param chatbot The current instance of the chatbot.
   * @param data The data of the channel profile.
   */
  public constructor(chatbot: ChatBot<T>, data: ChannelProfileData){
    super(chatbot);
    this.id = data.id;
    this.events = data.events;
  }

  public addEvent(event: ChannelEvents): Promise<void>;
  public addEvent(event: ChannelEvents[]): Promise<void>;
  /**
   * Adds an event or events to the channel profile and listen to it. If the event is already added, it does nothing.
   * @param event The event or events to add.
   * @returns 
   */
  public async addEvent(event: ChannelEvents | ChannelEvents[]){

    if(Array.isArray(event)){
      return await this.addMassEvents(event);
    }else {
      if(this.hasEvent(event)) return;
      this.events.push(event);
      await this.chatbot.eventsub.subscribe({ type: SubscriptionTypes[event], options: { broadcaster_user_id: this.id, moderator_user_id: this.chatbot.userId, user_id: this.chatbot.userId }});
    }
  }

  /**
   * Removes an event from the channel profile and stop listening to it. If the event is not added, it does nothing.
   * @param event The event to remove.
   * @returns 
   */
  public async removeEvent(event: ChannelEvents){
    if(!this.hasEvent(event)) return;
    this.events.splice(this.events.indexOf(event), 1);
    await this.chatbot.eventsub.subscriptions.exist(SubscriptionTypes[event], { broadcaster_user_id: this.id, moderator_user_id: this.chatbot.userId, user_id: this.chatbot.userId })?.delete();
  }

  /**
   * Checks if one event is being listened.
   * @param event The event to check.
   * @returns 
   */
  public hasEvent(event: ChannelEvents){
    return this.events.includes(event);
  }

  /**
   * Fetches the current channel of the profile from the API.
   * @returns The fetched channel from the API.
   */
  public async fetch(){
    return new Channel<T>(this.chatbot, await this.chatbot.helixClient.getChannel(this.id));
  }

  /**
   * Adds events in mass to the channel profile.
   * @param events The events to add.
   * @internal
   * @returns
   */
  private async addMassEvents(events: ChannelEvents[]){
    for(const event of events){
      if(this.hasEvent(event)) continue;
      await this.addEvent(event);
    }
  }
}

/**
 * The data of the channel profile.
 * @param id The Id of the channel.
 * @param events The events from the channel that the chatbot is subscribed to.
 */
export interface ChannelProfileData {
    id: string
    events: ChannelEvents[]
}
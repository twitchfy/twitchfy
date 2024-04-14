import { SubscriptionTypes } from '@twitchapi/eventsub';
import type { ChatBot } from '../ChatBot';
import { Base } from '../Base';
import { ChannelProfile } from '../ChannelProfile';
import { Channel } from '../Channel';
import type { EventSubConnection } from '../../enums';
import { handleOnMessage } from '../../util';
import type { ChannelEvents } from '../../types';

/**
 * Represents the chatbot channel manager used to join to channels.
 */
export class ChannelManager<T extends EventSubConnection> extends Base<T> {

  /**
   * Creates a new instance of the channel manager.
   * @param chatbot The current instance of the chatbot.
   */
  public constructor(chatbot: ChatBot<T>){
    super(chatbot);
  }

  /**
   * Join a channel and listen to messages.
   * @param id The id of the channel to join.
   * @param events The EventSub events you will listen  to. See {@link ChannelEvents}.
   * @returns A class representation of the channel profile which contains the events you are subscribed with. See {@link ChannelProfile}.
   */
  public async join(id: string, events?: ChannelEvents[]){

    const existingProfile = this.chatbot.profiles.get(id);

    if(existingProfile) return existingProfile;

    const profile = new ChannelProfile<T>(this.chatbot, { id, events: events || ['ChannelChatMessage'] });

    const subscription = await this.chatbot.eventsub.subscribe({ type: SubscriptionTypes.ChannelChatMessage, options: { broadcaster_user_id: id, user_id: this.chatbot.userID }});

    const fn = handleOnMessage.bind(this.chatbot);

    subscription.onMessage(fn);

    if(events){
      const parsedEvents = events.reduce((acc, event) => {
        if(acc.includes(event)) return acc;
        acc.push(event);
        return acc;
      }, [] as ChannelEvents[]);

      for(const event of parsedEvents){

        const type = SubscriptionTypes[event];

        if(!type) continue;

        await this.chatbot.eventsub.subscribe({ type, options: { moderator_user_id: this.chatbot.userID, user_id: this.chatbot.userID, broadcaster_user_id: id }});

      }
    }

    return profile;
  }


  /**
   * Leave a channel. You will no longer listen to messages and the other events you've subscribed.
   * @param id The id of the channel to leave.
   * @returns 
   */
  public async leave(id: string){

    const subscription = this.chatbot.eventsub.subscriptions.exist(SubscriptionTypes.ChannelChatMessage, { broadcaster_user_id: id, user_id: this.chatbot.userID });
    
    if(!subscription) return;

    await subscription.delete();

    const profile = this.chatbot.profiles.get(id);

    if(!profile) return;

    for(const event of profile.events){

      const type = SubscriptionTypes[event];

      if(!type) continue;

      const subscription = this.chatbot.eventsub.subscriptions.exist(type, { broadcaster_user_id: id, user_id: this.chatbot.userID, moderator_user_id: this.chatbot.userID });

      if(subscription) await subscription.delete();

    }

    this.chatbot.profiles.delete(id);

    return;
  }

  /**
   * Fetches a channel by id.
   * @param id The id of the channel to fetch.
   * @returns A class representation of the channel. See {@link Channel}.
   */
  public async fetch(id: string){
    return new Channel(this.chatbot, await this.chatbot.helixClient.getChannel(id));
  }
}
import { Channel } from '../Channel';
import type { ChatBot } from '../../ChatBot';
import { User } from '../User';
import { JoinedChannel } from '../JoinedChannel';
import type { ConnectionType } from '../../enums/ConnectionType';
import { ConnectionTypes, Subscription, SubscriptionCallback, SubscriptionTypes, WebSocketConnection, WebhookConnection } from '@twitchapi/eventsub';

/**
 * Represents the ChannelManager of the ChatBot.
 * @class
 */

export class ChannelManager<T extends ConnectionType>{

  /**
     * @description The current instance of the {@link ChatBot}.
     */


  public chatbot: ChatBot<T>;

  /**
     * @public
     * @param chatbot 
     */

  public constructor(chatbot: ChatBot<T>){
        
    this.chatbot = chatbot;

  }

  /**
     * 
     * Use to get any Twitch channel information.
     * @param {string} channelIdentificator The fetched channel's id or name. 
     * @returns {Promise<Channel>} Returns {@link Channel}.
     */
  public async fetch(channelIdentificator: string): Promise<Channel> {
    const userResponse = await this.chatbot.helixClient.getUser(channelIdentificator);

    const channelResponse = await this.chatbot.helixClient.getChannel(userResponse.id);

    const channel = new Channel(this.chatbot, channelResponse, new User(this.chatbot, userResponse));

    return channel;
  }

  /**
     * 
     * Use to join to a Twitch channel to receive events.
     * @param {string} channelID The channel name of the channel the chatbot will join.
     * @returns {JoinedChannel} Returns {@link JoinedChannel}.
     */

  public async join(channelID: string) {
    
    const subscription = await this.chatbot.connection.subscribe({
      type: SubscriptionTypes.ChannelChatMessage,
      options: {
        broadcaster_user_id: channelID,
        user_id: this.chatbot.user.id
      }
    });

    if(subscription.connection instanceof WebhookConnection){

      setSubscriptionType<WebhookConnection>(subscription)

      subscription.onMessage((message) => message)
    }else {

      setSubscriptionType<ConnectionTypes>(subscription);

      subscription.onMessage((msg) => msg)
    }

    subscription.onMessage((message) => message.);

  }

  /**
     * 
     * @param {string} channelName The channel name of the channel the chatbot will leave.
     * @returns {JoinedChannel} Returns the {@link JoinedChannel} of the channel the ChatBot left.
     */

  public leave(channelName: string): JoinedChannel {

    const channel = new JoinedChannel(this.chatbot, channelName);

    const index = this.chatbot.joinedChannels.findIndex((x) => x.name === channelName);

    if(index === -1) return channel;

    this.chatbot.joinedChannels.splice(index, 1);

    this.chatbot.ws.sendMessage(`PART #${channelName}`);

    return channel;
  }
}

function setSubscriptionType<T extends ConnectionTypes>(subscription: SubscriptionType): asserts subscription is Subscription<SubscriptionTypes.ChannelChatMessage, T> {} 
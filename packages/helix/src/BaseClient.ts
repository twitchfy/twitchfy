import type { User, UserResponse, Channel, ChannelResponse , Ban, BanUserResponse, GetChatSettingsResponse, ChatSettings, GetBan, GetBansResponse, AutoModSettings, GetAutoModSettingsResponse, Chatter, GetFollowersResponse, GetFollowers, PostCreateClip, PostCreateClipResponse, GetStream, GetStreamResponse, PostEventSubscriptionsResponse, PostEventSubscriptions } from '@twitchapi/api-types';
import { RequestManager } from './RequestManager';
import type { WhisperBody, BanBody, TimeoutBody, AnnouncementBody, ChatSettingsBody, AutoModSettingsBody, TokenAdapter } from './structures';
import { handlePagination } from './utils';
import type { SubscriptionOptions, HelixClientOptions, GetSubscriptionFilter } from './interfaces';
import type { RequestOptions } from './types';




export class BaseClient {

  public clientId: string;
  public clientSecret: string;
  public appToken?: string;
  public userToken?: TokenAdapter;
  public proxy?: string;
  public requestManager: RequestManager;


  public constructor(options: HelixClientOptions) {
    this.clientId = options.clientId;
    this.userToken = options.userToken;
    this.appToken = options.appToken;
    this.proxy = options.proxy;
    this.requestManager = new RequestManager(this);
  }

  public async getUser(userIdentificator: string, requestOptions?: RequestOptions): Promise<User> {

    if (isNaN(Number(userIdentificator))) {
      const data = await this.requestManager.get('/users', `login=${userIdentificator}`, requestOptions) as UserResponse;

      return data.data[0];
    } else {
      const data = await this.requestManager.get('/users', `id=${userIdentificator}`, requestOptions) as UserResponse;

      return data.data[0];
    }

  }

  public async getUsers(usersIdentifications: string[], requestOptions?: RequestOptions): Promise<User[]> {

    const params = usersIdentifications.map((i) => isNaN(Number(i)) ? `login=${i}` : `id=${i}`).join('&');

    const data = await this.requestManager.get('/users', params, requestOptions) as UserResponse;

    return data.data;
  }

  public async getChannel(channelIdentification: string, requestOptions?: RequestOptions): Promise<Channel> {

    const data = await this.requestManager.get('/channels', `broadcaster_id=${channelIdentification}`, requestOptions) as ChannelResponse;

    return data.data[0];
  }

  public async getChannels(channelsIdentification: string[], requestOptions?: RequestOptions): Promise<Channel[]> {
    
    const data = await this.requestManager.get('/channels', channelsIdentification.map((c) => `broadcaster_id=${c}`).join('&'), requestOptions) as ChannelResponse;

    return data.data;
  }

  public async deleteMessage(id: string, moderator_id: string, broadcaster_id: string, requestOptions?: RequestOptions<'user'>) {

    await this.requestManager.delete('/moderation/chat', `message_id=${id}&broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}`, { ...requestOptions, useTokenType: 'user' });

  }

  public async sendWhisper(senderUserID: string, receiverUserID: string, body: WhisperBody, requestOptions?: RequestOptions<'user'>) {

    await this.requestManager.post('/whispers', `from_user_id=${senderUserID}&to_user_id=${receiverUserID}`, body, { ...requestOptions, useTokenType: 'user' });
  }

  public async banUser(broadcaster_id: string, moderator_id: string, body: BanBody, requestOptions?: RequestOptions<'user'>): Promise<Ban> {

    const data = await this.requestManager.post('/moderation/bans', `broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}`, body, { ...requestOptions, useTokenType: 'user' }) as BanUserResponse;

    return data.data[0];
  }

  public async timeoutUser(broadcaster_id: string, moderator_id: string, body: TimeoutBody, requestOptions?: RequestOptions<'user'>): Promise<Ban> {

    const data = await this.requestManager.post('/moderation/bans', `broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}`, body, { ...requestOptions, useTokenType: 'user' }) as BanUserResponse;

    return data.data[0];
  }

  public async getBans(broadcaster_id: string, user_id?: string[], requestOptions?: RequestOptions<'user'>): Promise<GetBan[] | GetBan> {

    const data = await this.requestManager.get('/moderation/banned', `broadcaster_id=${broadcaster_id}${user_id ? `&${user_id.map((id) => `user_id=${id}`).join('&')}` : ''}`, { ...requestOptions, useTokenType: 'user' }) as GetBansResponse;


    if (data.data.length === 1) {
      return data.data[0];
    } else {
      return data.data;
    }

  }

  public async unBanUser(broadcaster_id: string, moderator_id: string, user_id: string, requestOptions?: RequestOptions<'user'>) {
    await this.requestManager.delete('/moderation/bans', `broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}&user_id=${user_id}`, { ...requestOptions, useTokenType: 'user' });
  }

  public async sendAnnouncement(broadcaster_id: string, moderator_id: string, body: AnnouncementBody, requestOptions?: RequestOptions<'user'>){

    await this.requestManager.post('/chat/announcements', `broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}`, body, { ...requestOptions, useTokenType: 'user' });

  }

  public async sendShoutout(from_broadcaster_id: string, to_broadcaster_id: string, moderator_id: string, requestOptions?: RequestOptions<'user'>){
    await this.requestManager.post('/chat/shoutouts', `from_broadcaster_id=${from_broadcaster_id}&to_broadcaster_id=${to_broadcaster_id}&moderator_id=${moderator_id}`, null, { ...requestOptions, useTokenType: 'user' });
  }

  public async getChatSettings(broadcaster_id: string, moderator_id: string, requestOptions?: RequestOptions): Promise<ChatSettings>{

    const data = await this.requestManager.get('/chat/settings', `broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}`, requestOptions) as GetChatSettingsResponse;

    return data.data[0];
  }

  public async updateChatSettings(broadcaster_id: string, moderator_id: string, body: ChatSettingsBody, requestOptions?: RequestOptions<'user'>) : Promise<ChatSettings>{

    const data = await this.requestManager.patch('/chat/settings', `broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}`, body, { ...requestOptions, useTokenType: 'user' }) as GetChatSettingsResponse;

    return data.data[0];
  }

  public async updateUserColor(user_id: string, color: string, requestOptions?: RequestOptions<'user'>) {


    await this.requestManager.put('/chat/color', `user_id=${user_id}&color=${encodeURIComponent(color)}`, null, { ...requestOptions, useTokenType: 'user' });

  }

  public async getAutoModSettings(broadcaster_id: string, moderator_id: string, requestOptions?: RequestOptions<'user'>): Promise<AutoModSettings>{
   
    const data = await this.requestManager.get('/moderation/automod/settings', `broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}`, { ...requestOptions, useTokenType: 'user' }) as GetAutoModSettingsResponse;
        
    return data.data[0];
  }

  public async updateAutoModSettings(broadcaster_id: string, moderator_id: string, body: AutoModSettingsBody, requestOptions?: RequestOptions<'user'>) : Promise<AutoModSettings>{

    const data = await this.requestManager.put('/moderation/automod/settings', `broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}`, body, { ...requestOptions, useTokenType: 'user' }) as GetAutoModSettingsResponse;

    return data.data[0];
  }

  public async getChatters(broadcaster_id: string, moderator_id: string, requestOptions?: RequestOptions<'user'>) : Promise<Chatter[]>{

    return await handlePagination(this, '/chat/chatters', `broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}`, 'GET', { ...requestOptions, useTokenType: 'user' }) as Chatter[];
  }

  public async getChannelFollowerCount(broadcaster_id: string, requestOptions?: RequestOptions<'user'>): Promise<number> {

    const data = await this.requestManager.get('/channels/followers', `broadcaster_id=${broadcaster_id}`, { ...requestOptions, useTokenType: 'user' }) as GetFollowersResponse;

    return data.total;

  }

  public async getChannelFollowers(broadcaster_id: string, requestOptions?: RequestOptions<'user'>): Promise<GetFollowers[]>{

    return await handlePagination(this, '/channels/followers', `broadcaster_id=${broadcaster_id}&first=100`, 'GET', { ...requestOptions, useTokenType: 'user' }) as GetFollowers[];

  }

  public async getChannelFollower(broadcaster_id: string, user_id: string, requestOptions?: RequestOptions<'user'>): Promise<GetFollowers>{

    const data = await this.requestManager.get('/channels/followers', `broadcaster_id=${broadcaster_id}&user_id=${user_id}`, { ...requestOptions, useTokenType: 'user' }) as GetFollowersResponse;

    return data.data[0];
  }

  public async createClip(broadcaster_id: string, delay: boolean = false, requestOptions?: RequestOptions<'user'>): Promise<PostCreateClip>{

    const data = await this.requestManager.post('/clips', `broadcaster_id=${broadcaster_id}&delay=${delay}`, null, { ...requestOptions, useTokenType: 'user' }) as PostCreateClipResponse;
        
    return data.data[0];

  }

  public async getStream(userIdentificator: string, requestOptions?: RequestOptions): Promise<GetStream | null> {

    if(isNaN(Number(userIdentificator))){

      const data = await this.requestManager.get('/streams', `user_login=${userIdentificator}`, requestOptions) as GetStreamResponse;

      return data.data[0] ?? null;
      
    } else {
      const data = await this.requestManager.get('/streams', `user_id=${userIdentificator}`, requestOptions) as GetStreamResponse;

      return data.data[0] ?? null;
    }

   
  }

  public async subscribeToEventSub(options: SubscriptionOptions, requestOptions?: RequestOptions): Promise<PostEventSubscriptions>{

    const data = await this.requestManager.post('/eventsub/subscriptions', '', options, requestOptions) as PostEventSubscriptionsResponse;

    return data.data[0];

  }

  public async deleteSubscription(id: string, requestOptions?: RequestOptions) : Promise<void>{

    await this.requestManager.delete('/eventsub/subscriptions', `id=${id}`, requestOptions);

  }

  public async getSubscriptions(filter?: GetSubscriptionFilter, requestOptions?: RequestOptions){

    return await handlePagination(this, '/eventsub/subscriptions', `${filter ? filter.status ? `status=${filter.status}` : filter.type ? `type=${filter.type}` : `user_id=${filter.user_id}` : ''}`, 'GET', requestOptions) as PostEventSubscriptions[]; 

  }

}
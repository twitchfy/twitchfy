import { RequestManager } from './RequestManager';
import { User, UserResponse, Channel, ChannelResponse , Ban, BanUserResponse, GetChatSettingsResponse, ChatSettings, GetBan, GetBansResponse, AutoModSettings, GetAutoModSettingsResponse, Chatter, GetFollowersResponse, GetFollowers, PostCreateClip, PostCreateClipResponse, GetStream, GetStreamResponse, PostEventSubscriptionsResponse, PostEventSubscriptions } from '@twitchapi/api-types';
import { WhisperBody } from './structures/WhisperBody';
import { BanBody } from './structures/BanBody';
import { TimeoutBody } from './structures/TimeoutBody';
import { AnnouncementBody } from './structures/AnnouncementBody';
import { ChatSettingsBody } from './structures/ChatSettingsBody';
import { AutoModSettingsBody } from './structures/AutoModSettingsBody';
import { handlePagination } from './utils/HandlePagination';
import { SubscriptionOptions } from './interfaces/SubscriptionOptions';
import { HelixClientOptions } from './interfaces/HelixClientOptions';
import { RequestOptions } from './interfaces/RequestOptions';




export class BaseClient {

  public clientId: string;
  public appToken: string;
  public userToken?: string;
  public proxy?: string;
  public requestManager: RequestManager;


  public constructor(options: HelixClientOptions) {
    this.clientId = options.clientId;
    this.userToken = options.userToken;
    this.appToken = options.appToken;
    this.proxy = options.proxy;
    this.requestManager = new RequestManager(this);
  }

  public async getUser(userIdentificator: string, userToken?: string, requestOptions?: RequestOptions): Promise<User> {


    if (isNaN(Number(userIdentificator))) {
      const data = await this.requestManager.get('/users', `login=${userIdentificator}`, userToken, requestOptions) as UserResponse;

      return data.data[0];
    } else {
      const data = await this.requestManager.get('/users', `id=${userIdentificator}`, userToken, requestOptions) as UserResponse;

      return data.data[0];
    }

  }

  public async getUsers(usersIdentifications: string[], userToken?: string, requestOptions?: RequestOptions): Promise<User[]> {
    const params = usersIdentifications.map((i) => isNaN(Number(i)) ? `login=${i}` : `id=${i}`).join('&');

    const data = await this.requestManager.get('/users', params, userToken, requestOptions) as UserResponse;

    return data.data;
  }

  public async getChannel(channelIdentification: string, userToken?: string, requestOptions?: RequestOptions): Promise<Channel> {
    const data = await this.requestManager.get('/channels', `broadcaster_id=${channelIdentification}`, userToken, requestOptions) as ChannelResponse;


    return data.data[0];
  }

  public async getChannels(channelsIdentification: string[], userToken?: string, requestOptions?: RequestOptions): Promise<Channel[]> {
    const data = await this.requestManager.get('/channels', channelsIdentification.map((c) => `broadcaster_id=${c}`).join('&'), userToken, requestOptions) as ChannelResponse;

    return data.data;
  }

  public async deleteMessage(id: string, moderator_id: string, broadcaster_id: string, userToken?: string, requestOptions?: RequestOptions) {

    await this.requestManager.deleteWithUserToken('/moderation/chat', `message_id=${id}&broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}`, userToken, requestOptions);

  }

  public async sendWhisper(senderUserID: string, receiverUserID: string, body: WhisperBody, userToken?: string, requestOptions?: RequestOptions) {

    await this.requestManager.postWithUserToken('/whispers', `from_user_id=${senderUserID}&to_user_id=${receiverUserID}`, body, userToken, requestOptions);
  }

  public async banUser(broadcaster_id: string, moderator_id: string, body: BanBody, userToken?: string, requestOptions?: RequestOptions): Promise<Ban> {
    const data = await this.requestManager.postWithUserToken('/moderation/bans', `broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}`, body, userToken, requestOptions) as BanUserResponse;

    return data.data[0];
  }

  public async timeoutUser(broadcaster_id: string, moderator_id: string, body: TimeoutBody, userToken?: string, requestOptions?: RequestOptions): Promise<Ban> {
    const data = await this.requestManager.postWithUserToken('/moderation/bans', `broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}`, body, userToken, requestOptions) as BanUserResponse;

    return data.data[0];
  }

  public async getBans(broadcaster_id: string, user_id?: string[], userToken?: string, requestOptions?: RequestOptions): Promise<GetBan[] | GetBan> {
    const data = await this.requestManager.get('/moderation/banned', `broadcaster_id=${broadcaster_id}${user_id ? `&${user_id.map((id) => `user_id=${id}`).join('&')}` : ''}`, userToken, requestOptions) as GetBansResponse;


    if (data.data.length === 1) {
      return data.data[0];
    } else {
      return data.data;
    }

  }

  public async unBanUser(broadcaster_id: string, moderator_id: string, user_id: string, userToken?: string, requestOptions?: RequestOptions) {
    await this.requestManager.deleteWithUserToken('/moderation/bans', `broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}&user_id=${user_id}`, userToken, requestOptions);
  }

  public async sendAnnouncement(broadcaster_id: string, moderator_id: string, body: AnnouncementBody, userToken?: string, requestOptions?: RequestOptions){
    await this.requestManager.postWithUserToken('/chat/announcements', `broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}`, body, userToken, requestOptions);

  }

  public async sendShoutout(from_broadcaster_id: string, to_broadcaster_id: string, moderator_id: string, userToken?: string, requestOptions?: RequestOptions){
    await this.requestManager.postWithUserToken('/chat/shoutouts', `from_broadcaster_id=${from_broadcaster_id}&to_broadcaster_id=${to_broadcaster_id}&moderator_id=${moderator_id}`, null, userToken, requestOptions);
  }

  public async getChatSettings(broadcaster_id: string, moderator_id: string, userToken?: string, requestOptions?: RequestOptions): Promise<ChatSettings>{
    const data = await this.requestManager.get('/chat/settings', `broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}`, userToken, requestOptions) as GetChatSettingsResponse;

    return data.data[0];
  }

  public async updateChatSettings(broadcaster_id: string, moderator_id: string, body: ChatSettingsBody, userToken?: string, requestOptions?: RequestOptions) : Promise<ChatSettings>{
    const data = await this.requestManager.patchWithUserToken('/chat/settings', `broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}`, body, userToken, requestOptions) as GetChatSettingsResponse;

    return data.data[0];
  }

  public async updateUserColor(user_id: string, color: string, userToken?: string, requestOptions?: RequestOptions){


    await this.requestManager.putWithUserToken('/chat/color', `user_id=${user_id}&color=${encodeURIComponent(color)}`, null, userToken, requestOptions);

  }

  public async getAutoModSettings(broadcaster_id: string, moderator_id: string, userToken?: string, requestOptions?: RequestOptions): Promise<AutoModSettings>{
    const data = await this.requestManager.get('/moderation/automod/settings', `broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}`, userToken, requestOptions) as GetAutoModSettingsResponse;
        
    return data.data[0];
  }

  public async updateAutoModSettings(broadcaster_id: string, moderator_id: string, body: AutoModSettingsBody, userToken?: string, requestOptions?: RequestOptions) : Promise<AutoModSettings>{

    const data = await this.requestManager.putWithUserToken('/moderation/automod/settings', `broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}`, body, userToken, requestOptions) as GetAutoModSettingsResponse;

    return data.data[0];
  }

  public async getChatters(broadcaster_id: string, moderator_id: string, userToken?: string, requestOptions?: RequestOptions) : Promise<Chatter[]>{

    return await handlePagination(this, '/chat/chatters', `broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}`, 'GET', userToken, requestOptions);
  }

  public async getChannelFollowerCount(broadcaster_id: string, userToken?: string, requestOptions?: RequestOptions): Promise<number> {

    const data = await this.requestManager.get('/channels/followers', `broadcaster_id=${broadcaster_id}`, userToken, requestOptions) as GetFollowersResponse;

    return data.total;

  }

  public async getChannelFollowers(broadcaster_id: string, userToken?: string, requestOptions?: RequestOptions): Promise<GetFollowers[]>{

    return await handlePagination(this, '/channels/followers', `broadcaster_id=${broadcaster_id}&first=100`, 'GET', userToken, requestOptions);

  }

  public async getChannelFollower(broadcaster_id: string, user_id: string, userToken?: string, requestOptions?: RequestOptions): Promise<GetFollowers>{

    const data = await this.requestManager.get('/channels/followers', `broadcaster_id=${broadcaster_id}&user_id=${user_id}`, userToken, requestOptions) as GetFollowersResponse;

    return data.data[0];
  }

  public async createClip(broadcaster_id: string, delay: boolean = false, userToken?: string, requestOptions?: RequestOptions): Promise<PostCreateClip>{

    const data = await this.requestManager.postWithUserToken('/clips', `broadcaster_id=${broadcaster_id}&delay=${delay}`, null,  userToken, requestOptions) as PostCreateClipResponse;
        
    return data.data[0];

  }

  public async getStream(userIdentificator: string, userToken?: string, requestOptions?: RequestOptions): Promise<GetStream | null> {

    if(isNaN(Number(userIdentificator))){

      const data = await this.requestManager.get('/streams', `user_login=${userIdentificator}`, userToken, requestOptions) as GetStreamResponse;

      return data.data[0] ?? null;
      
    } else {
      const data = await this.requestManager.get('/streams', `user_id=${userIdentificator}`, userToken, requestOptions) as GetStreamResponse;

      return data.data[0] ?? null;
    }

   
  }

  public async subscribeToEventSub(options: SubscriptionOptions, userToken?: string, requestOptions?: RequestOptions): Promise<PostEventSubscriptions>{

    const data = await this.requestManager.postWithUserToken('/eventsub/subscriptions', '', options, userToken, requestOptions) as PostEventSubscriptionsResponse;

    return data.data[0];

  }

  public async deleteSubscription(id: string, userToken?: string, requestOptions?: RequestOptions) : Promise<void>{

    await this.requestManager.deleteWithUserToken('/eventsub/subscriptions', `id=${id}`, userToken, requestOptions);

  }

}
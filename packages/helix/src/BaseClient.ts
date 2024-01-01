import { RequestManager } from './RequestManager';
import { User, UserResponse, Channel, ChannelResponse , Ban, BanUserResponse, GetChatSettingsResponse, ChatSettings, GetBan, GetBansResponse, AutoModSettings, GetAutoModSettingsResponse, Chatter, GetFollowersResponse, GetFollowers, PostCreateClip, PostCreateClipResponse, GetStream, GetStreamResponse } from '@twitchapi/api-types';
import { WhisperBody } from './structures/WhisperBody';
import { BanBody } from './structures/BanBody';
import { TimeoutBody } from './structures/TimeoutBody';
import { AnnouncementBody } from './structures/AnnouncementBody';
import { ChatSettingsBody } from './structures/ChatSettingsBody';
import { AutoModSettingsBody } from './structures/AutoModSettingsBody';
import { handlePagination } from './utils/HandlePagination';




export class BaseClient {

  public appToken: string;
  public userToken?: string;
  public clientId: string;
  public requestManager: RequestManager;


  public constructor(clientId: string, appToken?: string, userToken?: string) {
    this.clientId = clientId;
    this.userToken = userToken;
    this.appToken = appToken;
    this.requestManager = new RequestManager(this);
    this.requestManager.validateUserToken();
  }

  public async getUser(userIdentificator: string, userToken?: string): Promise<User> {


    if (isNaN(Number(userIdentificator))) {
      const data = await this.requestManager.get('/users', `login=${userIdentificator}`, userToken) as UserResponse;

      return data.data[0];
    } else {
      const data = await this.requestManager.get('/users', `id=${userIdentificator}`, userToken) as UserResponse;

      return data.data[0];
    }

  }

  public async getUsers(usersIdentifications: string[], userToken?: string): Promise<User[]> {
    const params = usersIdentifications.map((i) => isNaN(Number(i)) ? `login=${i}` : `id=${i}`).join('&');

    const data = await this.requestManager.get('/users', params, userToken) as UserResponse;

    return data.data;
  }

  public async getChannel(channelIdentification: string, userToken?: string): Promise<Channel> {
    const data = await this.requestManager.get('/channels', `broadcaster_id=${channelIdentification}`, userToken) as ChannelResponse;


    return data.data[0];
  }

  public async getChannels(channelsIdentification: string[], userToken?: string): Promise<Channel[]> {
    const data = await this.requestManager.get('/channels', channelsIdentification.map((c) => `broadcaster_id=${c}`).join('&'), userToken) as ChannelResponse;

    return data.data;
  }

  public async deleteMessage(id: string, moderator_id: string, broadcaster_id: string) {

    await this.requestManager.deleteWithUserToken('/moderation/chat', `message_id=${id}&broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}`);

  }

  public async sendWhisper(senderUserID: string, receiverUserID: string, body: WhisperBody, userToken?: string) {

    await this.requestManager.postWithUserToken('/whispers', `from_user_id=${senderUserID}&to_user_id=${receiverUserID}`, body, userToken);
  }

  public async banUser(broadcaster_id: string, moderator_id: string, body: BanBody, userToken?: string): Promise<Ban> {
    const data = await this.requestManager.postWithUserToken('/moderation/bans', `broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}`, body, userToken) as BanUserResponse;

    return data.data[0];
  }

  public async timeoutUser(broadcaster_id: string, moderator_id: string, body: TimeoutBody, userToken?: string): Promise<Ban> {
    const data = await this.requestManager.postWithUserToken('/moderation/bans', `broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}`, body, userToken) as BanUserResponse;

    return data.data[0];
  }

  public async getBans(broadcaster_id: string, user_id?: string[], userToken?: string): Promise<GetBan[] | GetBan> {
    const data = await this.requestManager.get('/moderation/banned', `broadcaster_id=${broadcaster_id}${user_id ? `&${user_id.map((id) => `user_id=${id}`).join('&')}` : ''}`, userToken) as GetBansResponse;


    if (data.data.length === 1) {
      return data.data[0];
    } else {
      return data.data;
    }

  }

  public async unBanUser(broadcaster_id: string, moderator_id: string, user_id: string, userToken?: string) {
    await this.requestManager.deleteWithUserToken('/moderation/bans', `broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}&user_id=${user_id}`, userToken);
  }

  public async sendAnnouncement(broadcaster_id: string, moderator_id: string, body: AnnouncementBody, userToken?: string){
    await this.requestManager.postWithUserToken('/chat/announcements', `broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}`, body, userToken);

  }

  public async sendShoutout(from_broadcaster_id: string, to_broadcaster_id: string, moderator_id: string, userToken?: string){
    await this.requestManager.postWithUserToken('/chat/shoutouts', `from_broadcaster_id=${from_broadcaster_id}&to_broadcaster_id=${to_broadcaster_id}&moderator_id=${moderator_id}`, null, userToken);
  }

  public async getChatSettings(broadcaster_id: string, moderator_id: string, userToken?: string): Promise<ChatSettings>{
    const data = await this.requestManager.get('/chat/settings', `broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}`, userToken) as GetChatSettingsResponse;

    return data.data[0];
  }

  public async updateChatSettings(broadcaster_id: string, moderator_id: string, body: ChatSettingsBody, userToken?: string) : Promise<ChatSettings>{
    const data = await this.requestManager.patchWithUserToken('/chat/settings', `broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}`, body, userToken) as GetChatSettingsResponse;

    return data.data[0];
  }

  public async updateUserColor(user_id: string, color: string, userToken?: string){


    await this.requestManager.putWithUserToken('/chat/color', `user_id=${user_id}&color=${encodeURIComponent(color)}`, null, userToken);

  }

  public async getAutoModSettings(broadcaster_id: string, moderator_id: string, userToken?: string): Promise<AutoModSettings>{
    const data = await this.requestManager.get('/moderation/automod/settings', `broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}`, userToken) as GetAutoModSettingsResponse;
        
    return data.data[0];
  }

  public async updateAutoModSettings(broadcaster_id: string, moderator_id: string, body: AutoModSettingsBody, userToken?: string) : Promise<AutoModSettings>{

    const data = await this.requestManager.putWithUserToken('/moderation/automod/settings', `broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}`, body ,userToken) as GetAutoModSettingsResponse;

    return data.data[0];
  }

  public async getChatters(broadcaster_id: string, moderator_id: string, userToken?: string) : Promise<Chatter[]>{

    return await handlePagination(this, '/chat/chatters', `broadcaster_id=${broadcaster_id}&moderator_id=${moderator_id}`, 'GET', userToken);
  }

  public async getChannelFollowerCount(broadcaster_id: string, userToken?: string): Promise<number> {

    const data = await this.requestManager.get('/channels/followers', `broadcaster_id=${broadcaster_id}`, userToken) as GetFollowersResponse;

    return data.total;

  }

  public async getChannelFollowers(broadcaster_id: string, userToken?: string): Promise<GetFollowers[]>{

    return await handlePagination(this, '/channels/followers', `broadcaster_id=${broadcaster_id}&first=100`, 'GET', userToken);

  }

  public async getChannelFollower(broadcaster_id: string, user_id: string, userToken?: string): Promise<GetFollowers>{

    const data = await this.requestManager.get('/channels/followers', `broadcaster_id=${broadcaster_id}&user_id=${user_id}`, userToken) as GetFollowersResponse;

    return data.data[0];
  }

  public async createClip(broadcaster_id: string, delay: boolean = false, userToken?: string): Promise<PostCreateClip>{

    const data = await this.requestManager.postWithUserToken('/clips', `broadcaster_id=${broadcaster_id}&delay=${delay}`, null,  userToken) as PostCreateClipResponse;
        
    return data.data[0];

  }

  public async getStream(userIdentificator: string): Promise<GetStream | null> {

    if(isNaN(Number(userIdentificator))){

      const data = await this.requestManager.get('/streams', `user_login=${userIdentificator}`) as GetStreamResponse;

      return data.data[0] ?? null;
      
    } else {
      const data = await this.requestManager.get('/streams', `user_id=${userIdentificator}`) as GetStreamResponse;

      return data.data[0] ?? null;
    }

    
  }

}
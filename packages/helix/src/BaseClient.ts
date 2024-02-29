import type { User, UserResponse, Channel, ChannelResponse , Ban, BanUserResponse, GetChatSettingsResponse, ChatSettings, GetBan, GetBansResponse, AutoModSettings, GetAutoModSettingsResponse, Chatter, GetFollowersResponse, GetFollowers, PostCreateClip, PostCreateClipResponse, GetStream, GetStreamResponse, PostEventSubSubscriptionsResponse, PostEventSubSubscription, TokenCodeFlowResponse, PostSendChatMessageResponse, TokenClientCredentialsFlowResponse } from '@twitchapi/api-types';
import { RequestManager } from './RequestManager';
import type { WhisperBody, BanBody, TimeoutBody, AnnouncementBody, ChatSettingsBody, AutoModSettingsBody, SendChatMessageBody, SubscriptionBody } from './structures';
import { TokenAdapter } from './structures';
import { handlePagination } from './utils';
import type { HelixClientOptions, GetSubscriptionFilter, GenerateTokenOptions, GenerateAppTokenOptions } from './interfaces';
import type { RequestOptions } from './types';




export class BaseClient {

  public clientId: string;
  public clientSecret: string;
  public preferedToken: 'app' | 'user';
  public appToken?: TokenAdapter<'app'>;
  public userToken?: TokenAdapter<'code' | 'implicit'>;
  public proxy?: string;
  public requestManager: RequestManager;


  public constructor(options: HelixClientOptions) {

    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;
    this.preferedToken = options.preferedToken ?? 'app';
    this.appToken = options.appToken;
    this.userToken = options.userToken;
    this.proxy = options.proxy;
    this.requestManager = new RequestManager(this);
  }

  public async getUser(userIdentificator: string, requestOptions?: RequestOptions): Promise<User> {

    if (isNaN(Number(userIdentificator))) {
      const data = await this.requestManager.get('/users', new URLSearchParams({ login: userIdentificator }).toString(), requestOptions) as UserResponse;

      return data.data[0];
    } else {
      const data = await this.requestManager.get('/users', new URLSearchParams({ id: userIdentificator }).toString(), requestOptions) as UserResponse;

      return data.data[0];
    }

  }

  public async getUsers(usersIdentification: string[], requestOptions?: RequestOptions): Promise<User[]> {

    const params = new URLSearchParams();

    const identifications = usersIdentification.map((i) => isNaN(Number(i)) ? { login: i } : { id: i });

    for(const identification of identifications) params.append(Object.keys(identification)[0], Object.values(identification)[0]); 

    const data = await this.requestManager.get('/users', params.toString(), requestOptions) as UserResponse;

    return data.data;
  }

  public async getChannel(channelID: string, requestOptions?: RequestOptions): Promise<Channel> {

    const data = await this.requestManager.get('/channels', new URLSearchParams({ broadcaster_id: channelID }).toString(), requestOptions) as ChannelResponse;

    return data.data[0];
  }

  public async getChannels(channels_id: string[], requestOptions?: RequestOptions): Promise<Channel[]> {

    const params = new URLSearchParams();

    for(const channel of channels_id) params.append('broadcaster_id', channel);
    
    const data = await this.requestManager.get('/channels', params.toString(), requestOptions) as ChannelResponse;

    return data.data;
  }

  public async deleteMessage(id: string, broadcaster_id: string, moderator_id: string, requestOptions?: RequestOptions<'user'>) {

    await this.requestManager.delete('/moderation/chat', new URLSearchParams({ message_id: id, broadcaster_id, moderator_id }).toString(), { ...requestOptions, useTokenType: 'user' });

  }

  public async sendWhisper(senderUserID: string, receiverUserID: string, body: WhisperBody, requestOptions?: RequestOptions<'user'>) {

    await this.requestManager.post('/whispers', new URLSearchParams({ from_user_id: senderUserID, to_user_id: receiverUserID }).toString(), body, { ...requestOptions, useTokenType: 'user' });
  }

  public async banUser(broadcaster_id: string, moderator_id: string, body: BanBody, requestOptions?: RequestOptions<'user'>): Promise<Ban> {

    const data = await this.requestManager.post('/moderation/bans', new URLSearchParams({ broadcaster_id, moderator_id }).toString(), body, { ...requestOptions, useTokenType: 'user' }) as BanUserResponse;

    return data.data[0];
  }

  public async timeoutUser(broadcaster_id: string, moderator_id: string, body: TimeoutBody, requestOptions?: RequestOptions<'user'>): Promise<Ban> {

    const data = await this.requestManager.post('/moderation/bans', new URLSearchParams({ broadcaster_id, moderator_id }).toString(), body, { ...requestOptions, useTokenType: 'user' }) as BanUserResponse;

    return data.data[0];
  }

  public async getBans(broadcaster_id: string, users_id?: string[], requestOptions?: RequestOptions<'user'>): Promise<GetBan[] | GetBan> {

    const params = new URLSearchParams({ broadcaster_id });

    for(const id of users_id) params.append('user_id', id);

    const data = await this.requestManager.get('/moderation/banned', params.toString(), { ...requestOptions, useTokenType: 'user' }) as GetBansResponse;


    if (data.data.length === 1) {

      return data.data[0];

    } else {

      return data.data;
    }

  }

  public async unBanUser(broadcaster_id: string, moderator_id: string, user_id: string, requestOptions?: RequestOptions<'user'>) {

    await this.requestManager.delete('/moderation/bans', new URLSearchParams({ broadcaster_id, moderator_id, user_id }).toString(), { ...requestOptions, useTokenType: 'user' });
  
  }

  public async sendAnnouncement(broadcaster_id: string, moderator_id: string, body: AnnouncementBody, requestOptions?: RequestOptions<'user'>){

    await this.requestManager.post('/chat/announcements', new URLSearchParams({ broadcaster_id, moderator_id }).toString(), body, { ...requestOptions, useTokenType: 'user' });

  }

  public async sendShoutout(from_broadcaster_id: string, to_broadcaster_id: string, moderator_id: string, requestOptions?: RequestOptions<'user'>){

    await this.requestManager.post('/chat/shoutouts', new URLSearchParams({ from_broadcaster_id, to_broadcaster_id, moderator_id }).toString(), null, { ...requestOptions, useTokenType: 'user' });
  
  }

  public async getChatSettings(broadcaster_id: string, moderator_id: string, requestOptions?: RequestOptions): Promise<ChatSettings>{

    const data = await this.requestManager.get('/chat/settings', new URLSearchParams({ broadcaster_id, moderator_id }).toString(), requestOptions) as GetChatSettingsResponse;

    return data.data[0];
  }

  public async updateChatSettings(broadcaster_id: string, moderator_id: string, body: ChatSettingsBody, requestOptions?: RequestOptions<'user'>) : Promise<ChatSettings>{

    const data = await this.requestManager.patch('/chat/settings', new URLSearchParams({ broadcaster_id, moderator_id }).toString(), body, { ...requestOptions, useTokenType: 'user' }) as GetChatSettingsResponse;

    return data.data[0];
  }

  public async updateUserColor(user_id: string, color: string, requestOptions?: RequestOptions<'user'>) {


    await this.requestManager.put('/chat/color', new URLSearchParams({ user_id, color: encodeURIComponent(color)}).toString(), null, { ...requestOptions, useTokenType: 'user' });

  }

  public async getAutoModSettings(broadcaster_id: string, moderator_id: string, requestOptions?: RequestOptions<'user'>): Promise<AutoModSettings>{
   
    const data = await this.requestManager.get('/moderation/automod/settings', new URLSearchParams({ broadcaster_id, moderator_id }).toString(), { ...requestOptions, useTokenType: 'user' }) as GetAutoModSettingsResponse;
        
    return data.data[0];
  }

  public async updateAutoModSettings(broadcaster_id: string, moderator_id: string, body: AutoModSettingsBody, requestOptions?: RequestOptions<'user'>) : Promise<AutoModSettings>{

    const data = await this.requestManager.put('/moderation/automod/settings', new URLSearchParams({ broadcaster_id, moderator_id }).toString(), body, { ...requestOptions, useTokenType: 'user' }) as GetAutoModSettingsResponse;

    return data.data[0];
  }

  public async getChatters(broadcaster_id: string, moderator_id: string, requestOptions?: RequestOptions<'user'>) : Promise<Chatter[]>{

    return await handlePagination(this, '/chat/chatters', new URLSearchParams({ broadcaster_id, moderator_id }).toString(), 'GET', { ...requestOptions, useTokenType: 'user' }) as Chatter[];
  }

  public async getChannelFollowerCount(broadcaster_id: string, requestOptions?: RequestOptions<'user'>): Promise<number> {

    const data = await this.requestManager.get('/channels/followers', new URLSearchParams({ broadcaster_id }).toString(), { ...requestOptions, useTokenType: 'user' }) as GetFollowersResponse;

    return data.total;

  }

  public async getChannelFollowers(broadcaster_id: string, requestOptions?: RequestOptions<'user'>): Promise<GetFollowers[]>{

    return await handlePagination(this, '/channels/followers', new URLSearchParams({ broadcaster_id, first: '100' }).toString(), 'GET', { ...requestOptions, useTokenType: 'user' }) as GetFollowers[];

  }

  public async getChannelFollower(broadcaster_id: string, user_id: string, requestOptions?: RequestOptions<'user'>): Promise<GetFollowers>{

    const data = await this.requestManager.get('/channels/followers', new URLSearchParams({ broadcaster_id, user_id }).toString(), { ...requestOptions, useTokenType: 'user' }) as GetFollowersResponse;

    return data.data[0];
  }

  public async createClip(broadcaster_id: string, delay: boolean = false, requestOptions?: RequestOptions<'user'>): Promise<PostCreateClip>{

    const data = await this.requestManager.post('/clips', new URLSearchParams({ broadcaster_id, delay: String(delay) }).toString(), null, { ...requestOptions, useTokenType: 'user' }) as PostCreateClipResponse;
        
    return data.data[0];

  }

  public async getStream(userIdentificator: string, requestOptions?: RequestOptions): Promise<GetStream | null> {

    if(isNaN(Number(userIdentificator))){

      const data = await this.requestManager.get('/streams', new URLSearchParams({ user_login: userIdentificator }).toString(), requestOptions) as GetStreamResponse;

      return data.data[0] ?? null;
      
    } else {
      const data = await this.requestManager.get('/streams', new URLSearchParams({ user_id: userIdentificator }).toString(), requestOptions) as GetStreamResponse;

      return data.data[0] ?? null;
    }

   
  }

  public async subscribeToEventSub(body: SubscriptionBody, requestOptions?: RequestOptions): Promise<PostEventSubSubscription>{

    const data = await this.requestManager.post('/eventsub/subscriptions', '', body, requestOptions) as PostEventSubSubscriptionsResponse;

    return data.data[0];

  }

  public async deleteSubscription(id: string, requestOptions?: RequestOptions) : Promise<void>{

    await this.requestManager.delete('/eventsub/subscriptions', new URLSearchParams({ id }).toString(), requestOptions);

  }

  public async getSubscriptions(filter?: GetSubscriptionFilter, requestOptions?: RequestOptions){

    const params = new URLSearchParams;

    if(filter) filter.status ? params.append('status', filter.status) : filter.type ? params.append('type', filter.type) : params.append('user_id', filter.user_id);

    return await handlePagination(this, '/eventsub/subscriptions', params.toString(), 'GET', requestOptions) as PostEventSubSubscription[]; 

  }

  public async sendChatMessage(body: SendChatMessageBody, requestOptions?: RequestOptions){

    const data = await this.requestManager.post('/chat/messages', '', body, requestOptions) as PostSendChatMessageResponse;

    return data.data[0];

  }

  public async refreshToken(token: TokenAdapter<'code', true>){

    const data = await this.requestManager.refreshToken(token.refreshToken);

    token.token = data.access_token;

    token.refreshToken = data.refresh_token;

    return token;

  }

  public async generateUserToken<T extends boolean = true, K extends boolean = false>(code: string, redirectURI: string, options?: GenerateTokenOptions<T, K>): Promise<(K extends true ? TokenCodeFlowResponse : TokenAdapter<'code', T>)> {

    const data = await this.requestManager.generateUserToken(code, redirectURI);

    if(options?.raw) return data as K extends true ? TokenCodeFlowResponse : TokenAdapter<'code', T>;

    return new TokenAdapter({ type: 'code', token: data.access_token, refreshToken: data.refresh_token, refresh: options?.refresh ?? true }) as K extends true ? TokenCodeFlowResponse : TokenAdapter<'code', T>;

  }

  public async generateAppToken<T extends boolean = true, K extends boolean = false>(options?: GenerateAppTokenOptions<T, K>): Promise<(K extends true ? TokenClientCredentialsFlowResponse : TokenAdapter<'app', T>)> {

    const data = await this.requestManager.generateAppToken(options);

    if(options?.raw) return data as K extends true ? TokenClientCredentialsFlowResponse : TokenAdapter<'app', T>;

    return new TokenAdapter({ type: 'app', token: data.access_token }) as K extends true ? TokenCodeFlowResponse : TokenAdapter<'app', T>;

  }

  public static async generateAppToken<T extends boolean = true, K extends boolean = false>(options: GenerateAppTokenOptions<T, K>): Promise<(K extends true ? TokenClientCredentialsFlowResponse : TokenAdapter<'app', T>)>{

    const data = await RequestManager.generateAppToken(options);

    if(options?.raw) return data as K extends true ? TokenClientCredentialsFlowResponse : TokenAdapter<'app', T>;

    return new TokenAdapter({ type: 'app', token: data.access_token }) as K extends true ? TokenCodeFlowResponse : TokenAdapter<'app', T>;

  }
  

  public setUserToken(token: TokenAdapter<'code' | 'implicit'>){

    this.userToken = token;

    return this;
  }

  public setAppToken(token: TokenAdapter<'app'>){

    this.appToken = token;

    return this;
  }

}

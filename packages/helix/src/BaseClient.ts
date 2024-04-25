import type { User, UserResponse, Channel, ChannelResponse , Ban, BanUserResponse, GetChatSettingsResponse, ChatSettings, GetBan, GetBansResponse, AutoModSettings, GetAutoModSettingsResponse, Chatter, GetFollowersResponse, GetFollowers, PostCreateClip, PostCreateClipResponse, GetStream, GetStreamResponse, PostEventSubSubscriptionsResponse, PostEventSubSubscription, TokenCodeFlowResponse, PostSendChatMessageResponse, TokenClientCredentialsFlowResponse, GetCheermotesResponse, GetChannelEmotesResponse, GetGlobalEmotesResponse, GetClipsResponse, GetVideosResponse, GetModeratedChannelsResponse } from '@twitchfy/api-types';
import { RequestManager } from './RequestManager';
import type { WhisperBody, BanBody, TimeoutBody, AnnouncementBody, ChatSettingsBody, AutoModSettingsBody, SendChatMessageBody, SubscriptionBody } from './structures';
import { TokenAdapter } from './structures';
import { handlePagination } from './utils';
import type { HelixClientOptions, GetSubscriptionFilter, GenerateUserTokenOptions, GenerateAppTokenOptions, HelixClientCallbacks, GetStreamsOptions, GetClipsOptions, GetVideosOptions } from './interfaces';
import type { ModifyType, PickRequired, RequestOptions, UserTokenAdapter } from './types';




export class BaseClient {

  public clientID: string;
  public clientSecret: string;
  public preferedToken: 'app' | 'user';
  public appToken?: TokenAdapter<'app', boolean>;
  public userToken?: UserTokenAdapter<boolean>;
  public proxy?: string;
  public requestManager: RequestManager;
  public callbacks: HelixClientCallbacks;


  public constructor(options: HelixClientOptions) {

    this.clientID = options.clientID;
    this.clientSecret = options.clientSecret;
    this.preferedToken = options.preferedToken ?? 'app';
    this.appToken = options.appToken;
    this.userToken = options.userToken;
    this.proxy = options.proxy;
    this.requestManager = new RequestManager(this);
    this.callbacks = options.callbacks ?? {};
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

  public async getChatters(broadcaster_id: string, moderator_id: string, requestOptions?: RequestOptions<'user', true>) : Promise<Chatter[]>{

    const params = new URLSearchParams({ broadcaster_id, moderator_id });

    if(requestOptions?.data_per_page) params.append('first', requestOptions.data_per_page.toString());

    return await handlePagination(this, '/chat/chatters', params.toString(), 'GET', { ...requestOptions, useTokenType: 'user' }) as Chatter[];
  }

  public async getChannelFollowerCount(broadcaster_id: string, requestOptions?: RequestOptions<'user'>): Promise<number> {

    const data = await this.requestManager.get('/channels/followers', new URLSearchParams({ broadcaster_id }).toString(), { ...requestOptions, useTokenType: 'user' }) as GetFollowersResponse;

    return data.total;

  }

  public async getChannelFollowers(broadcaster_id: string, requestOptions?: RequestOptions<'user', true>): Promise<GetFollowers[]>{

    const params = new URLSearchParams({ broadcaster_id });

    if(requestOptions?.data_per_page) params.append('first', requestOptions.data_per_page.toString());

    return await handlePagination(this, '/channels/followers', params.toString(), 'GET', { ...requestOptions, useTokenType: 'user' }) as GetFollowers[];

  }

  public async getChannelFollower(broadcaster_id: string, user_id: string, requestOptions?: RequestOptions<'user'>): Promise<GetFollowers>{

    const data = await this.requestManager.get('/channels/followers', new URLSearchParams({ broadcaster_id, user_id }).toString(), { ...requestOptions, useTokenType: 'user' }) as GetFollowersResponse;

    return data.data[0];
  }

  public async createClip(broadcaster_id: string, delay: boolean = false, requestOptions?: RequestOptions<'user'>): Promise<PostCreateClip>{

    const data = await this.requestManager.post('/clips', new URLSearchParams({ broadcaster_id, delay: String(delay) }).toString(), null, { ...requestOptions, useTokenType: 'user' }) as PostCreateClipResponse;
        
    return data.data[0];

  }

  public async getStream(options?: GetStreamsOptions<false>, requestOptions?: RequestOptions): Promise<GetStream | null> {

    const data = await this.requestManager.get('/streams', new URLSearchParams({ ...options }).toString(), requestOptions) as GetStreamResponse;

    return data.data[0] ?? null;
  }

  public async getStreams(options?: GetStreamsOptions<true>, requestOptions?: RequestOptions<'app' | 'user', true>): Promise<GetStream[]> {

    const parsedOptions = Object.keys(options || {}).flatMap((x: keyof GetStreamsOptions<true>) => {

      const opt = options[x];

      if(Array.isArray(opt)) return opt.map((i) => [x, i]);

      return [[x, opt]];
    });

    const params = new URLSearchParams(parsedOptions);

    if(requestOptions?.data_per_page) params.append('first', requestOptions.data_per_page.toString());

    return await handlePagination(this, '/streams', params.toString(), 'GET', requestOptions) as GetStream[];

  }

  public async subscribeToEventSub(body: SubscriptionBody, requestOptions?: RequestOptions): Promise<PostEventSubSubscription>{

    const data = await this.requestManager.post('/eventsub/subscriptions', '', body, requestOptions) as PostEventSubSubscriptionsResponse;

    return data.data[0];

  }

  public async deleteSubscription(id: string, requestOptions?: RequestOptions) : Promise<void>{

    await this.requestManager.delete('/eventsub/subscriptions', new URLSearchParams({ id }).toString(), requestOptions);

  }

  public async getSubscriptions(filter?: GetSubscriptionFilter, requestOptions?: RequestOptions<'user' | 'app', true>){

    const params = new URLSearchParams;

    if(filter) filter.status ? params.append('status', filter.status) : filter.type ? params.append('type', filter.type) : params.append('user_id', filter.user_id);

    if(requestOptions?.data_per_page) params.append('first', requestOptions.data_per_page.toString());

    return await handlePagination(this, '/eventsub/subscriptions', params.toString(), 'GET', requestOptions) as PostEventSubSubscription[]; 

  }

  public async sendChatMessage(body: SendChatMessageBody, requestOptions?: RequestOptions){

    const data = await this.requestManager.post('/chat/messages', '', body, requestOptions) as PostSendChatMessageResponse;

    return data.data[0];

  }

  public async getCheermotes(broadcaster_id?: string, requestOptions?: RequestOptions){

    const data = await this.requestManager.get('/bits/cheermotes', new URLSearchParams({ broadcaster_id }).toString(), requestOptions) as GetCheermotesResponse;

    return data.data;
  }

  public async getChannelEmotes(broadcaster_id: string, requestOptions?: RequestOptions){

    const data = await this.requestManager.get('/chat/emotes', new URLSearchParams({ broadcaster_id }).toString(), requestOptions) as GetChannelEmotesResponse;

    return { emotes: data.data, template: data.template };
  }

  public async getGlobalEmotes(requestOptions?: RequestOptions){
      
    const data = await this.requestManager.get('/chat/emotes/global', '', requestOptions) as GetGlobalEmotesResponse;
  
    return { emotes: data.data, template: data.template };
  }

  public async getClip(options: GetClipsOptions<false>, requestOptions?: RequestOptions){

    const parsedOptions: ModifyType<GetClipsOptions<false>, { is_featured?: string }> = { ...options, is_featured: options.is_featured ? String(options.is_featured) : 'false' };

    const data = await this.requestManager.get('/clips', new URLSearchParams(parsedOptions).toString(), requestOptions) as GetClipsResponse;

    return data.data[0] ?? null;
  }

  public async getClips(options: GetClipsOptions<true>, requestOptions?: RequestOptions<'app' | 'user', true>){

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const parsedOptions: string[][] = Object.keys(options || {}).flatMap((x: keyof GetClipsOptions<true>) => {

      let opt = options[x];

      if(x === 'is_featured') opt = String(opt); 

      if(Array.isArray(opt)) return opt.map((i) => [x, i]);

      return [[x, opt]];
    });


    const params = new URLSearchParams(parsedOptions);

    if(requestOptions?.data_per_page) params.append('first', requestOptions.data_per_page.toString());

    return await handlePagination(this, '/clips', params.toString(), 'GET', requestOptions) as GetClipsResponse['data'];

  }

  public async getUserToken(noError: boolean = false, requestOptions?: RequestOptions<'user'>){

    const data = await this.requestManager.validateToken({ ...requestOptions, useTokenType: 'user' }, true, noError);
  
    return data ?? null;
  }

  public async getVideo(options: GetVideosOptions<false>, requestOptions?: RequestOptions){

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const data = await this.requestManager.get('/videos', new URLSearchParams(options).toString(), requestOptions) as GetVideosResponse;

    return data.data[0] ?? null;
  }

  public async getVideos(options: GetVideosOptions<true>, requestOptions?: RequestOptions<'app' | 'user', true>) {

    const parsedOptions: string[][] = Object.keys(options || {}).flatMap((x: keyof GetVideosOptions<true>) => {

      const opt = options[x];

      if(Array.isArray(opt)) return opt.map((i) => [x, i]);

      return [[x, opt]];
    });

    return await handlePagination(this, '/videos', new URLSearchParams(parsedOptions).toString(), 'GET', requestOptions) as GetVideosResponse['data'];
  }

  public async getModeratedChannels(user_id: string, requestOptions?: RequestOptions<'user', true>){
    return await handlePagination(this, '/moderation/channels', new URLSearchParams({ user_id }).toString(), 'GET', { ...requestOptions, useTokenType: 'user' }) as GetModeratedChannelsResponse['data'];
  }

  
  public async refreshToken(token: TokenAdapter<'code', true>){

    const data = await this.requestManager.refreshToken(token.refreshToken);

    token.token = data.access_token;

    token.refreshToken = data.refresh_token;

    return token;

  }

  public async generateUserToken<T extends boolean = true, K extends boolean = false>(options?: GenerateUserTokenOptions<T, K>): Promise<(K extends true ? TokenCodeFlowResponse : TokenAdapter<'code', T>)> {
    return await BaseClient.generateUserToken<T, K>({ ...options, clientID: this.clientID, clientSecret: this.clientSecret });
  }

  public async generateAppToken<T extends boolean = true, K extends boolean = false>(options?: GenerateAppTokenOptions<T, K>): Promise<(K extends true ? TokenClientCredentialsFlowResponse : TokenAdapter<'app', T>)> {
    return await BaseClient.generateAppToken<T, K>({ ...options, clientID: this.clientID, clientSecret: this.clientSecret });
  }

  public static async generateAppToken<T extends boolean = true, K extends boolean = false>(options: PickRequired<GenerateAppTokenOptions<T, K>, 'clientID' | 'clientSecret'>): Promise<(K extends true ? TokenClientCredentialsFlowResponse : TokenAdapter<'app', T>)>{

    const data = await RequestManager.generateAppToken(options);

    if(options?.raw) return data as K extends true ? TokenClientCredentialsFlowResponse : TokenAdapter<'app', T>;

    return new TokenAdapter({ type: 'app', token: data.access_token }) as K extends true ? TokenCodeFlowResponse : TokenAdapter<'app', T>;

  }

  public static async generateUserToken<T extends boolean = true, K extends boolean = false>(options: PickRequired<GenerateUserTokenOptions<T, K>, 'clientID' | 'clientSecret'>): Promise<(K extends true ? TokenCodeFlowResponse : TokenAdapter<'code', T>)> {

    const data = await RequestManager.generateUserToken(options);

    if(options?.raw) return data as K extends true ? TokenCodeFlowResponse : TokenAdapter<'code', T>;

    return new TokenAdapter({ type: 'code', token: data.access_token, refreshToken: data.refresh_token, refresh: options?.refresh ?? true }) as K extends true ? TokenCodeFlowResponse : TokenAdapter<'code', T>;

  }

  public setUserToken(token: TokenAdapter<'code' | 'implicit', boolean>){

    this.userToken = token;

    return this;
  }

  public setAppToken(token: TokenAdapter<'app', boolean>){

    this.appToken = token;

    return this;
  }

}

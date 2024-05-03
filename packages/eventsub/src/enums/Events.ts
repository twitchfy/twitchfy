/**
 * An enum representing the different events that can be emitted by the EventSub client.
 */
export enum Events {
    ConnectionReady = 'connectionReady',
    ConnectionReconnect = 'reconnect',
    SubscriptionCreate = 'subscriptionCreate',
    SubscriptionMessage = 'subscriptionMessage',
    SubscriptionReload = 'subscriptionReload',
    ShardConnect = 'shardConnect'
}
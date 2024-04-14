/**
 * The permissions bitfield of an user.
 */
export enum Permission {
    'Broadcaster' = 1 << 0,
    'Moderator' = 1 << 1,
    'Vip' = 1 << 2,
    'Subscriber' = 1 << 3,
    'SubscriberTier1' = 1 << 4,
    'SubscriberTier2' = 1 << 5,
    'SubscriberTier3' = 1 << 6,
}
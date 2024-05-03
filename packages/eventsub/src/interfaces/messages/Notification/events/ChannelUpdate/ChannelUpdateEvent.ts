/**
 * The event sent by Twitch when a broadcaster updates their channel properties such the title of his stream.
 */
export interface ChannelUpdateEvent {
    /**
     * The ID of the broadcaster who updated his channel.
     */
    broadcaster_user_id: string
    /**
     * The login name of the broadcaster who updated his channel.
     */
    broadcaster_user_login: string
    /**
     * The display name of the broadcaster who updated his channel.
     */
    broadcaster_user_name: string
    /**
     * The title of the stream.
     */
    title: string
    /**
     * The language of the stream.
     */
    language: string
    /**
     * The category ID of the stream.
     */
    category_id: string
    /**
     * The category name of the stream.
     */
    category_name: string
    /**
     * The content classification labels of the stream.
     */
    content_classification_labels: string[]
}
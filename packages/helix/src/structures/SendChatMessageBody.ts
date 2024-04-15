import type { SendChatMessageOptions } from '../interfaces';

export class SendChatMessageBody {

  public broadcaster_id: string;

  public sender_id: string;

  public message: string;

  public reply_parent_message_id?: string;

  public constructor(options: SendChatMessageOptions){

    this.broadcaster_id = options.broadcasterID;

    this.sender_id = options.senderID;

    this.message = options.message;

    this.reply_parent_message_id = options.replyMessageID ?? null;

  }

}
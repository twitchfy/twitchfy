import { Parent } from './Parent';
import { Thread } from './Thread';
import type { ReplyData } from '../../interfaces';

/**
 * A reply to a message including the message which was replied and the first message of the reply thread received in the ChannelChatMessage event.
 */
export class MessageReply {
    
  /**
   * The parent message which was replied.
   */
  public readonly parent: Parent;

  /**
   * The first message of the reply thread.
   */
  public readonly thread: Thread;

  /**
   * Builds up a message reply.
   * @param data The data of the reply.
   */
  public constructor(data: ReplyData){

    this.parent = new Parent(data);

    this.thread = new Thread(data);

  }

}
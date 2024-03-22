import { Parent } from './Parent';
import { Thread } from './Thread';
import type { ReplyData } from '../../interfaces';

export class MessageReply {
    
  public parent: Parent;

  public thread: Thread;

  public constructor(data: ReplyData){

    this.parent = new Parent(data);

    this.thread = new Thread(data);

  }

}
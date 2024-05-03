/**
 * Represents a message that is not fully complete.
 */
export class UncompleteMessage {

  /**
   * The ID of the message.
   */
  public readonly id: string;

  /**
   * The content of the message.
   */
  public readonly content: string;

  /**
   * Builds up a message that is not fully complete.
   * @param data The data of the message.
   */
  public constructor(data: UncompleteMessageData){

    this.id = data.id;

    this.content = data.content;

  }

}

export interface UncompleteMessageData {
    /**
     * The ID of the message.
     */
    id: string;
    /**
     * The content of the message.
     */
    content: string;
}
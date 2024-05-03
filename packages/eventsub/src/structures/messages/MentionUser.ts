/**
 * Represents a user that was mentioned in a message included in a mention fragment. This is not represented by a BaseUser class as we want it to not have a connection or subscription property.
 */
export class MentionUser {
    
  /**
   * The ID of the user who was mentioned.
   */
  public readonly id: string;
      
  /**
    * The login name of the user who was mentioned.
    */
  public readonly login: string;
  
  /**
    * The display name of the user who was mentioned.
    */
  public readonly displayName: string;
  
  /**
   * Builds up a MentionUser.
   * @param data The data for the user who was mentioned.
   */
  public constructor(data: MentionUserData){
    this.id = data.id;
    this.login = data.login;
    this.displayName = data.display_name;
  }
  
  
}

/**
 * The data needed to build up a MentionUser.
 */
export interface MentionUserData {
    /**
     * The ID of the user who was mentioned.
     */
    id: string;
    /**
     * The login name of the user who was mentioned.
     */
    login: string;
    /**
     * The display name of the user who was mentioned.
     */
    display_name: string;
}
import type { BaseUserData } from './BaseUser';

/**
 * Represents a user that is not fully completed as it doesn't have connection and subscription fields from BaseUser.
 */
export class UncompleteUser {

  /**
   * The ID of the user.
   */
  public readonly id: string;

  /**
   * The login name of the user.
   */
  public readonly login: string;


  /**
   * The display name of the user.
   */
  public readonly displayName: string;

  /**
   * Builds up a user that is not fully complete.
   * @param data The data of the user.
   */
  public constructor(data: BaseUserData){

    this.id = data.id;

    this.login = data.login;

    this.displayName = data.display_name;

  }

}
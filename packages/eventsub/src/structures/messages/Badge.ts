import type { BadgeData } from '../../interfaces';

/**
 * A badge which is assigned to an user. 
 */
export class Badge {

  /**
   * The ID of the set which contains the badge.
   */
  public readonly setId: string;

  /**
   * The ID of the badge.
   */
  public readonly id: string;

  /**
   * Additional information about the badge. This field is only presented in subscribed badges and contains the number of months the user has been subscribed for.
   */
  public readonly info: string | null;

  /**
   * Builds up a badge.
   * @param data The data of the badge.
   */
  public constructor(data: BadgeData){


    this.setId = data.set_id;

    this.id = data.id;

    this.info = data.info !== '' ? data.info : null;

  }

}
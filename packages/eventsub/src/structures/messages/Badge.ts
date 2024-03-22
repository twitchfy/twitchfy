import type { BadgeData } from '../../interfaces';

export class Badge {

  public setId: string;

  public id: string;

  public info: string | null;

  public constructor(data: BadgeData){


    this.setId = data.set_id;

    this.id = data.id;

    this.info = data.info !== '' ? data.info : null;

  }

}
export class MentionUser {
    
  public id: string;
    
  public login: string;

  public displayName: string;

  public constructor(id: string, login: string, displayName: string){
    this.id = id;
    this.login = login;
    this.displayName = displayName;
  }


}
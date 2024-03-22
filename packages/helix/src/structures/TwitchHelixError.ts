import type { Error as ErrorType } from '../interfaces';

export class TwitchHelixError extends Error {
  public override name: string;
  public override message: string;
  public readonly status: number;
  public readonly error: string;
  public readonly method: string;
  public readonly url: string;

  public constructor(response: Response, error: ErrorType, method: string) {

    super();

	

    this.name = `\x1b[31m${error.error ?? response.statusText }\x1b[0m`;
    this.message = error.message;
    this.status = response.status;
    this.error = response.statusText;
    this.method = method;
    this.url = response.url;

		

	
  }

	
}
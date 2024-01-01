import type { Response } from 'node-fetch';
import type { Error as ErrorType } from '../interfaces/Error';

export class TwitchHelixError extends Error {
  public override name: string;
  public override message: string;
  public readonly status: number;
  public readonly error: string;
  public readonly url: string;

  public constructor(response: Response, error: ErrorType) {

    super();

	

    this.name = `\x1b[31m${error.error ?? response.statusText }\x1b[0m`;
    this.message = error.message;
    this.status = response.status;
    this.error = response.statusText;
    this.url = response.url;

		

	
  }

	
}
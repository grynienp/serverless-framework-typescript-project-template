import {HttpResponse} from './HttpResponse';

export declare class Error {
  public name: string;
  public message: string;
  public stack: string;
  constructor(message?: string);
}

export class ValidationError extends Error {
  public validationErrors: string[];
  constructor(public message: string, public valErrs: string[]) {
    super(message);
    this.name = 'ValidationError';
    this.message = message;
    this.validationErrors = valErrs;
    this.stack = (new Error() as any).stack;
  }
  public toHttpResponse = (): HttpResponse => ({
    statusCode: 400,
    body: {statusText: this.message, errors: this.validationErrors}
  })
}

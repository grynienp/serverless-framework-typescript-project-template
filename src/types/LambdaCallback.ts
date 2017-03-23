import {LambdaResponse} from './LambdaResponse';

// We dont really use the err-param, since it ruins the HTTP response body.
export type LambdaCallback = (err: Error|null, res: LambdaResponse) => void;

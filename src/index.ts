import * as R from 'ramda';

const config = require('../config/config')(process.env.STAGE);

import {HttpResponse} from './types/HttpResponse';
import {LambdaResponse} from './types/LambdaResponse';
import {LambdaCallback} from './types/LambdaCallback';
import {ExponentData} from './types/schema-models/ExponentData'

const exponentDataSchema = require('./types/schemas/ExponentData.json');

import {validate} from './middleware/validator';

/**
 * Lambda-handler for exponent -events
 *
 * @param  event event with info of Lambda triggering event (for example REST operation)
 * @param  _context
 * @param  callback callback which will be called with param including statusCode and body to return
 */
export function exponentHandler(event: any, _context: any, callback: LambdaCallback) {
  const eventBody: ExponentData = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

  validate(eventBody, exponentDataSchema)
  .then(() => {
    const successResponse: LambdaResponse = stringifyResponseBody({
      statusCode: 200,
      body: { statusText: "success", data: { number: eventBody.number * eventBody.number }}
    });

    callback(null, successResponse);
  })
  .catch((err: any) => { // when validation doesn't pass
    const errResponse: LambdaResponse = stringifyResponseBody(err.toHttpResponse());
    callback(null, errResponse);
  });
}

/**
 * Stringifies the body of a HttpResponse.
 * AWS API Gateway requires the body to be a string.
 *
 * @param  HttpResponse object, of which the body will be stringified.
 * @return object with string body
 */
function stringifyResponseBody(obj: HttpResponse): LambdaResponse {
  return R.merge(obj, {body: JSON.stringify(obj.body)});
}

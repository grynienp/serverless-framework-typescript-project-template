import * as jsonschema from 'jsonschema';

import {ValidationError} from '../types/Errors';
import {HttpResponse} from '../types/HttpResponse';

/**
 * Validate JS objects against a schema.
 *
 * @param obj object to be validated
 * @param schema .json schema against which the object will be validated
 * @return promise which is resolved as true when object passes validation, or rejected with errors
 */
export function validate(obj: {}, schema: jsonschema.Schema): Promise<boolean> {
  const result = jsonschema.validate(obj, schema);

  const promise = new Promise((resolve, reject: (reason: ValidationError) => void) => {
    if (result.valid) {
      resolve(result.valid);
    } else {
      const validationErrors: string[]
        = result.errors.map((err: any): string => { return err.stack; });
      return reject(new ValidationError('invalid request parameters', validationErrors));
    }
  });

  return promise;
}

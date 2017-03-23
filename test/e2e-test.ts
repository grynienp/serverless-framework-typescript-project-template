/* tslint:disable:no-expression-statement */
import {expect} from 'chai';
import 'mocha';

import {exponentHandler} from '../src/index';
import {LambdaResponse} from '../src/types/LambdaResponse';

/*
 * The e2e-tests have to be promisified since they call the handler functions,
 * which don't return anything, and only pass the response data (LambdaResponse)
 * into the callback-function given to them as a param.
 */
describe('Register Payment', () => {
  const dataPath = './testdata/exponent';

  it('should return exponented number with proper data', () => {
    return new Promise((resolve, reject) => {
      const event = {body: JSON.stringify(require(`${dataPath}/success`))};

      exponentHandler(event, {context: null}, (err: any, result: LambdaResponse) => {
        if (err) { reject(err); } else { resolve(result); };
      });
    }).then((result: any) => {
      const body = JSON.parse(result.body);
      expect(result.statusCode).to.equal(200);
      expect(body.statusText).to.equal('success');
      expect(body.data.number).to.equal(25);
    });
  });

  it('should return validation error with missing data (no number)', () => {
    return new Promise((resolve, reject) => {
      const event = {body: JSON.stringify(require(`${dataPath}/missing-data`))};

      exponentHandler(event, {context: null}, (err: any, result: LambdaResponse) => {
        if (err) { reject(err); } else { resolve(result); };
      });
    }).then((result: any) => {
      const body = JSON.parse(result.body);
      expect(result.statusCode).to.equal(400);
      expect(body.statusText).to.equal('invalid request parameters');
      expect(body.errors[0]).to.equal('instance requires property "number"');
    });
  });
});

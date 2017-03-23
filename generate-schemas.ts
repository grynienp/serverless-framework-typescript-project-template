import * as fs from 'fs';
import * as R from 'ramda';
import * as TJS from 'typescript-json-schema';

import {resolve} from 'path';

const mkpath = require('mkpath');

const generateSchema = (typeName: string) => {
  const tsFilePath = `./src/types/schema-models/${typeName}.ts`;
  const program = TJS.getProgramFromFiles([resolve(tsFilePath)]);
  const schema = TJS.generateSchema(program, `${typeName}`, settings);

  // here JSON.stringify makes pretty JSON with 2 space indentation
  const stringifiedSchema = JSON.stringify(schema, null, 2);

  fs.writeFile(`${dir}${typeName}.json`, stringifiedSchema, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log(`Schema for ${typeName} created in ${dir}${typeName}.json.`);
  });
};

const settings: TJS.PartialArgs = {
    generateRequired: true
};

// Add the TypeScript types to this list
// which you wish to be translated to schemas.
const schemaModelNames = [
  'ExponentData'
];

const dir = './build/src/types/schemas/';

// Create the directory in which schemas will be saved in
mkpath(dir, (err: any) => {
    if (err) {
      throw err;
    }

    console.log(`Directory structure ${dir} created.`);
    R.forEach(generateSchema, schemaModelNames);
});

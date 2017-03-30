export interface ExponentData {
  /**
   * Number to exponent
   *
   * @TJS-type number
   */
  number: number
}

/*
 * Decode JSON or any type objects into valid ExponentData.
 */
export function DecodeExponentData(json: any): ExponentData {
  return {
    number: Number(json.number)
  };
}

export default ExponentData;

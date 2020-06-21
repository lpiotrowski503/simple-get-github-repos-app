/**
 * Class for catch errors
 */
export class ErrorHundler {
  /**
   * Method for catch error
   *
   * @param error
   */
  static printError(error: any): any {
    throw new Error(error);
  }
}

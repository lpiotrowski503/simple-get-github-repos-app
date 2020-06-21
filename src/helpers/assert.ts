import { ErrorHundler } from "./error-handler";
/**
 * Class for prevent don't caught errors
 */
export class Assert {
  /**
   * Method for try run if can witch caught error
   *
   * @param resolve
   * @param reject
   */
  static try(resolve: () => void, reject?: (error: Error) => void): boolean {
    try {
      resolve();
      return true;
    } catch (error) {
      if (reject) ErrorHundler.printError(error);
      return false;
    }
  }
}

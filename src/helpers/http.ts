import { ErrorHundler } from "./error-handler";
/**
 * Http class for send request
 */
export class Http {
  /**
   * Method for GET request and catch error in one place
   *
   * @param url
   */
  static async get(url: string): Promise<any> {
    try {
      const response = await fetch(url);
      return response.json();
    } catch (error) {
      return ErrorHundler.printError(error);
    }
  }
}

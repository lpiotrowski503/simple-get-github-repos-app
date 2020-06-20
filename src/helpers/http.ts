import { ErrorHundler } from "./error-handler";
/**
 * Http class for send request and catch error in one place
 */
export class Http {
  static get(url: string): Promise<any> {
    return fetch(url)
      .then((response: any) => response.json())
      .catch((error: any) => ErrorHundler.printError(error));
  }
}

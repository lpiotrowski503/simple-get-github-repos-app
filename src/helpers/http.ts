import { ErrorHundler } from "./error-handler";

export class Http {
  static getUserData(url: string): Promise<any> {
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => ErrorHundler.printError(error));
  }
}

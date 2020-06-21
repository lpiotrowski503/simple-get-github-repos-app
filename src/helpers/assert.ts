import { ErrorHundler } from "./error-handler";

export class Assert {
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

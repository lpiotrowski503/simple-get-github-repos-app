import { ErrorHundler } from "./error-handler";

export class Assert {
  static assert(callback: () => void): void {
    try {
      callback();
    } catch (error) {
      ErrorHundler.printError(error);
    }
  }
}

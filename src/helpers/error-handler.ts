export class ErrorHundler {
  static printError(error: any): any {
    throw new Error(error);
  }
}

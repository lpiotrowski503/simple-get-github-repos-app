/**
 * Event class for create and listening custom events simple way
 */
export class Event {
  /**
   * Method for emit custom event
   *
   * @param chanel
   * @param value
   */
  static emit(chanel: string, value?: any): void {
    window.dispatchEvent(
      new CustomEvent(chanel, {
        detail: value ? value : {},
      })
    );
  }
  /**
   * Method for create custom event listener
   *
   * @param chanel
   * @param callback
   */
  static on(chanel: string, callback: (event: any) => void): void {
    window.addEventListener(chanel, (event: any) => {
      callback(event.detail);
    });
  }
}

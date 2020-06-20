export class Event {
  static emit(chanel: string, value?: any): void {
    window.dispatchEvent(
      new CustomEvent(chanel, {
        detail: value ? value : {},
      })
    );
  }

  static on(chanel: string, callback: (event: any) => void): void {
    window.addEventListener(chanel, (event: any) => {
      callback(event.detail);
    });
  }
}

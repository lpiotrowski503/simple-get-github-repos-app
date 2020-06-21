import { IReposResponse } from "../interfaces/repos.interface";
//
// ────────────────────────────────────────────────── I ──────────
//   :::::: T O   D O : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────
//
/**
 * add get store to all custom events
 * add update store to all custom events
 */
// ────────────────────────────────────────────────────────────────────────────────
/**
 * Store Application
 */
export class Store {
  /**
   * Application state
   */
  private state: IReposResponse[];
  /**
   * Init state
   */
  private initState: IReposResponse[] = [];

  constructor() {
    this.state = this.initState;
  }
  /**
   * Method for update state
   *
   * @param newState
   */
  public updateState(newState: IReposResponse[]): IReposResponse[] {
    this.state = { ...this.state, ...newState };
    return this.state;
  }
  /**
   * Method for actual state
   */
  public getState(): IReposResponse[] {
    return this.state;
  }
}

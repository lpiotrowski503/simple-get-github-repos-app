import { IReposResponse } from "../interfaces/repos.interface";

export class Store {
  private state: IReposResponse[];
  private initState: IReposResponse[] = [];

  constructor() {
    this.state = this.initState;
  }

  public updateState(newState: IReposResponse[]): IReposResponse[] {
    this.state = { ...this.state, ...newState };
    return this.state;
  }

  public getState(): IReposResponse[] {
    return this.state;
  }
}

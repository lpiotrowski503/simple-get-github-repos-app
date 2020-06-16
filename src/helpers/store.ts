import { IRepos } from "../interfaces/repos.interface";

export class Store {
  private state: IRepos[];
  private initState: IRepos[] = [];

  constructor() {
    this.state = this.initState;
  }

  public updateState(newState: any): any {
    this.state = { ...this.state, ...newState };
    return this.state;
  }

  public getState() {
    return this.state;
  }
}

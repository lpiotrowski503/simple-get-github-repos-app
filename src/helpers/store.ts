import { IUserData } from "../interfaces/user-data";

export class Store {
  private state: IUserData;
  private initState: IUserData = {
    avatar_url: "",
    bio: null,
    blog: "",
    company: null,
    created_at: "",
    email: null,
    events_url: "",
    followers: 0,
    followers_url: "",
    following: 0,
    following_url: "",
    gists_url: "",
    gravatar_id: "",
    hireable: null,
    html_url: "",
    id: 0,
    location: null,
    login: "",
    name: null,
    node_id: "",
    organizations_url: "",
    public_gists: 0,
    public_repos: 0,
    received_events_url: "",
    repos_url: "",
    site_admin: false,
    starred_url: "",
    subscriptions_url: "",
    twitter_username: null,
    type: "",
    updated_at: "",
    url: "",
  };

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

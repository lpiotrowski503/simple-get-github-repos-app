/**
 * Repos Responce interface
 */
export interface IReposResponse {
  archive_url: string;
  archived: false;
  assignees_url: string;
  blobs_url: string;
  branches_url: string;
  clone_url: string;
  collaborators_url: string;
  comments_url: string;
  commits_url: string;
  compare_url: string;
  contents_url: string;
  contributors_url: string;
  created_at: Date | string;
  default_branch: string;
  deployments_url: string;
  description: string;
  disabled: boolean;
  downloads_url: string;
  events_url: string;
  fork: boolean;
  forks: number;
  forks_count: number;
  forks_url: string;
  full_name: string;
  git_commits_url: string;
  git_refs_url: string;
  git_tags_url: string;
  git_url: string;
  has_downloads: true;
  has_issues: false;
  has_pages: false;
  has_projects: true;
  has_wiki: true;
  homepage: string;
  hooks_url: string;
  html_url: string;
  id: number;
  issue_comment_url: string;
  issue_events_url: string;
  issues_url: string;
  keys_url: string;
  labels_url: string;
  language: string;
  languages_url: string;
  license: {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
  };
  merges_url: string;
  milestones_url: string;
  mirror_url: null;
  name: string;
  node_id: string;
  notifications_url: string;
  open_issues: number;
  open_issues_count: number;
  owner: Object;
  private: false;
  pulls_url: string;
  pushed_at: Date | string;
  releases_url: string;
  size: number;
  ssh_url: string;
  stargazers_count: number;
  stargazers_url: string;
  statuses_url: string;
  subscribers_url: string;
  subscription_url: string;
  svn_url: string;
  tags_url: string;
  teams_url: string;
  trees_url: string;
  updated_at: Date | string;
  url: string;
  watchers: number;
  watchers_count: number;
}
/**
 * Table Repos interface
 */
export interface IRepos {
  name: string;
  description: string;
  updated_at: Date | string;
  git_url: string;
}
/**
 * Form data interface
 */
export interface IFormData {
  userName: string;
  updated: Date | string;
  id: () => string;
}

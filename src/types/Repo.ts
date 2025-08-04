export interface Repo {
  id: string;
  name: string;
  owner: { login: string };
  forks_count: string;
  html_url: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  language: string;
}

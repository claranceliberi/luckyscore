declare interface Credentials {
  email?: string | undefined;
  password?: string | undefined;
  provider?: "bitbucket" | "github" | "gitlab" | "google" | undefined;
}

declare interface Todo {
  id?: number;
  user_id: string;
  task: string;
  is_complete?: boolean;
  inserted_at?: string;
}

export interface ILink {
  name: string;
  href: string;
}

export interface IPlayerMatch {
  match_id: string;
  player_id: string;
  red_card: number;
  yellow_card: number;
  off_side: number;
  pitch_position: number;
  subbed: string;
  goals: number;
  assists: number;
  big_chances: number;
  successful_dribbles: number;
}

export interface IMatch {
  match_id: string;
  league_id: string;
  league_name: string;
  match_date: string;
  match_status: string;
  match_time: string;
  match_hometeam_id: string;
  match_hometeam_name: string;
  match_hometeam_score: string;
  match_awayteam_id: string;
  match_awayteam_name: string;
  match_awayteam_score: string;
}

export interface IFixtures {
  name: string;
  matches: IMatch[];
}

export interface ITable {
  created_at: string;
  id: string;
}

export interface SupabaseAuthUser {
  avatar_url: string;
  email: string;
  email_verified: string;
  full_name: string;
  iss: string;
  nam: string;
  preferred_username: string;
  provider_id: string;
  sub: string;
  user_name?: string;
}

export const USER_STORAGE_NAME = "lucky_score_auth_user";

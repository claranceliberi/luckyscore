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

export type IMatchprogress =
  | "not_started"
  | "first_half"
  | "half_time"
  | "second_half"
  | "penalty_shootout"
  | "finished";

export enum IEventType {
  Goal = "Goal",
  SHOT = "Shot",
  SHOT_ON_TARGET = "Shot on target",
  FOUL = "Foul",
  CORNER = "Corner",
  YELLOW_CARD = "Yellow card",
  RED_CARD = "Red card",
  OFFSIDE = "Offside",
}
export interface IPlayer extends ITable {
  description: string;
  full_name: string;
  id: string;
  team?: Teams;
  created_at: string;
  team_id: string;
}
export interface PlayerMatchCreate {
  match: string;
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
export interface IPlayerMatch extends ITable, PlayerMatchCreate {
  player: IPlayer;
}

export interface Teams extends ITable {
  id: string;
  name: string;
  description: string;
  letter: string;
}

export interface ICreateMatch {
  to_be_played_at: string;
  season: string;
  description: string;
  match_day: string;
  home_team: string;
  away_team: string;
  away_formation: string;
  home_formation: string;
  time: string;
}

export interface ITableStatistics extends ITable, Teams {
  home_match: Array<IMatch>;
  away_match: Array<IMatch>;
}
export interface IMatch extends ITable {
  id: string;
  match_day: string;
  season: string;
  time: string;
  in_charge: string;
  description: string;
  match_status: MatchStatusEnum;
  home_team: string;
  away_team: string;
  home_shots: number;
  away_shots: number;
  home_score: number;
  away_score: number;
  home_lineup: string;
  away_lineup: string;
  home_formation: string;
  away_formation: string;
  home_corners: number;
  away_corners: number;
  home_shots_on_target: number;
  away_shots_on_target: number;
  home_fouls: number;
  away_fouls: number;
  home_yellow_cards: number;
  away_yellow_cards: number;
  home_red_cards: number;
  away_red_cards: number;
  home_offsides: number;
  away_offsides: number;
  result_status: string;
  first_half_started_at: string;
  first_half_ended_at: string;
  second_half_started_at: string;
  second_half_ended_at: string;
  to_be_played_at: string;
}

export interface IMatchTeamJoin extends IMatch {
  away: Teams;
  home: Teams;
}

export interface IPlayerStat {
  player: {
    id: string;
    name: string;
  };
  amount?: number;
  team: {
    name: string;
  };
}

export interface Events extends ITable {
  id: string;
  player_id: string;
  team_id: string;
  assist_id: string;
  type: string;
  commentary: string;
  match_id: string;
  player: IPlayer;
  assist_player: IPlayer;
  team: Teams;
  match: IMatch;
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

export type MatchFormation =
  | "4-3-3"
  | "4-4-2"
  | "4-2-3-1"
  | "3-4-3"
  | "4-2-2-2"
  | "3-5-2";

// export type FormationType = {
//   [index in MatchFormation]: string;
// };

export type SelectType = { label: string; value: string };

export enum MatchStatusEnum {
  NO_LINEUP = "NO_LINEUP",
  NO_STARTED = "NO_STARTED",
  FIRST_HALF_ONGOING = "FIRST_HALF_ONGOING",
  HALF_TIME = "HALF_TIME",
  SECOND_HALF_ONGOING = "SECOND_HALF_ONGOING",
  PENALTY_SHOOTOUT = "PENALTY_SHOOTOUT",
  FULL_TIME = "FULL_TIME",
}

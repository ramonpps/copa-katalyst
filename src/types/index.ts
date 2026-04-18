// src/types/index.ts

export interface Team {
  id: string;
  nome: string;
  token?: string; // Outros campos que a API possa retornar
}

export interface Match {
  id: string;
  teamA: Team;
  teamB: Team;
  goalsA: number | null;
  goalsB: number | null;
  penaltyGoalsA?: number; // Para o mata-mata
  penaltyGoalsB?: number; // Para o mata-mata
  isFinished: boolean;
}

export interface TeamStanding extends Team {
  points: number;
  goalsScored: number;
  goalsConceded: number;
  goalDifference: number;
}

export interface Group {
  name: string; // 'A', 'B', 'C', etc.
  teams: TeamStanding[];
  matches: Match[];
}

export type GroupRecord = Record<string, Group>;

export interface FinalResultPayload {
  equipeA: string;
  equipeB: string;
  golsEquipeA: number;
  golsEquipeB: number;
  golsPenaltyTimeA: number;
  golsPenaltyTimeB: number;
}
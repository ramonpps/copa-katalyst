// src/utils/simulator.ts
// src/utils/simulator.ts
import type { Match, Team, TeamStanding } from '../types';

// Gera um número aleatório de gols (entre 0 e max)
const getRandomGoals = (max = 5) => Math.floor(Math.random() * (max + 1));

export const simulateMatch = (teamA: Team, teamB: Team, isKnockout: boolean = false): Match => {
  const goalsA = getRandomGoals();
  const goalsB = getRandomGoals();
  
  let penaltyGoalsA = undefined;
  let penaltyGoalsB = undefined;

  // Em fase de mata-mata, empates vão para os pênaltis 
  if (isKnockout && goalsA === goalsB) {
    penaltyGoalsA = 0;
    penaltyGoalsB = 0;
    // Simulação simples de pênaltis evitando empate contínuo
    while (penaltyGoalsA === penaltyGoalsB) {
       penaltyGoalsA += getRandomGoals(1);
       penaltyGoalsB += getRandomGoals(1);
    }
  }

  return {
    id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(7),
    teamA,
    teamB,
    goalsA,
    goalsB,
    penaltyGoalsA,
    penaltyGoalsB,
    isFinished: true,
  };
};

// Gera o Round Robin: todos contra todos no grupo (3 rodadas, 6 jogos) [cite: 65]
export const generateGroupMatches = (teams: TeamStanding[]): Match[] => {
  const matches: Match[] = [];
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      matches.push(simulateMatch(teams[i], teams[j], false));
    }
  }
  return matches;
};
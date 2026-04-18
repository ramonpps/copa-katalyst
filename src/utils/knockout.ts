// src/utils/knockout.ts
// src/utils/knockout.ts
import type { GroupRecord, Match, Team } from '../types';
import { simulateMatch } from './simulator';

export interface KnockoutTree {
  roundOf16: Match[];
  quarterFinals: Match[];
  semiFinals: Match[];
  final: Match;
  champion?: Team;
}

const getWinner = (match: Match): Team => {
  // Se for para os pênaltis, quem fez mais gols de pênalti ganha
  if (match.penaltyGoalsA !== undefined && match.penaltyGoalsB !== undefined) {
    return match.penaltyGoalsA > match.penaltyGoalsB ? match.teamA : match.teamB;
  }
  // Caso contrário, ganha quem fez mais gols no tempo normal
  return (match.goalsA || 0) > (match.goalsB || 0) ? match.teamA : match.teamB;
};

export const generateKnockoutTree = (groups: GroupRecord): KnockoutTree => {
  // Oitavas de final respeitando o chaveamento da Figura 1 do PDF
  const roundOf16: Match[] = [
    // Lado Esquerdo
    simulateMatch(groups['A'].teams[0], groups['B'].teams[1], true), // Jogo 1
    simulateMatch(groups['C'].teams[0], groups['D'].teams[1], true), // Jogo 2
    simulateMatch(groups['E'].teams[0], groups['F'].teams[1], true), // Jogo 3
    simulateMatch(groups['G'].teams[0], groups['H'].teams[1], true), // Jogo 4
    // Lado Direito
    simulateMatch(groups['B'].teams[0], groups['A'].teams[1], true), // Jogo 5
    simulateMatch(groups['D'].teams[0], groups['C'].teams[1], true), // Jogo 6
    simulateMatch(groups['F'].teams[0], groups['E'].teams[1], true), // Jogo 7
    simulateMatch(groups['H'].teams[0], groups['G'].teams[1], true), // Jogo 8
  ];

  // Quartas de final
  const quarterFinals: Match[] = [
    simulateMatch(getWinner(roundOf16[0]), getWinner(roundOf16[1]), true), // Q1: Vencedor J1 x Vencedor J2
    simulateMatch(getWinner(roundOf16[2]), getWinner(roundOf16[3]), true), // Q2: Vencedor J3 x Vencedor J4
    simulateMatch(getWinner(roundOf16[4]), getWinner(roundOf16[5]), true), // Q3: Vencedor J5 x Vencedor J6
    simulateMatch(getWinner(roundOf16[6]), getWinner(roundOf16[7]), true), // Q4: Vencedor J7 x Vencedor J8
  ];

  // Semifinais
  const semiFinals: Match[] = [
    simulateMatch(getWinner(quarterFinals[0]), getWinner(quarterFinals[1]), true), // S1: Vencedor Q1 x Vencedor Q2
    simulateMatch(getWinner(quarterFinals[2]), getWinner(quarterFinals[3]), true), // S2: Vencedor Q3 x Vencedor Q4
  ];

  // Final
  const finalMatch = simulateMatch(getWinner(semiFinals[0]), getWinner(semiFinals[1]), true);
  
  const champion = getWinner(finalMatch);

  return {
    roundOf16,
    quarterFinals,
    semiFinals,
    final: finalMatch,
    champion,
  };
};
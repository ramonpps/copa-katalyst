// src/utils/tiebreakers.ts
// src/utils/tiebreakers.ts
import type { Group, TeamStanding } from '../types';

export const calculateStandings = (group: Group): TeamStanding[] => {
  // Mapa para acumular os pontos e gols facilmente pelo ID do time
  const standingsMap = new Map<string, TeamStanding>();
  
  group.teams.forEach(t => {
    standingsMap.set(t.id, { ...t, points: 0, goalsScored: 0, goalsConceded: 0, goalDifference: 0 });
  });

  // Computa o resultado de todas as partidas finalizadas
  group.matches.forEach(match => {
    if (!match.isFinished) return;

    const teamA = standingsMap.get(match.teamA.id)!;
    const teamB = standingsMap.get(match.teamB.id)!;

    const goalsA = match.goalsA || 0;
    const goalsB = match.goalsB || 0;

    teamA.goalsScored += goalsA;
    teamA.goalsConceded += goalsB;
    teamB.goalsScored += goalsB;
    teamB.goalsConceded += goalsA;

    if (goalsA > goalsB) {
      teamA.points += 3; // Vitória [cite: 68]
    } else if (goalsA < goalsB) {
      teamB.points += 3; // Vitória [cite: 68]
    } else {
      teamA.points += 1; // Empate [cite: 69]
      teamB.points += 1; // Empate [cite: 69]
    }
  });

  // Recalcula o saldo e converte de volta para array
  const updatedStandings = Array.from(standingsMap.values()).map(t => ({
    ...t,
    goalDifference: t.goalsScored - t.goalsConceded
  }));

  // Ordenação baseada nos critérios da avaliação
  return updatedStandings.sort((a, b) => {
    // 1º Critério: Número de pontos [cite: 72]
    if (b.points !== a.points) return b.points - a.points;
    
    // 2º Critério: Saldo de gols [cite: 73]
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    
    // 3º Critério: Sorteio randômico [cite: 74]
    return Math.random() - 0.5; 
  });
};
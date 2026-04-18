// src/utils/groupDraw.ts
// src/utils/groupDraw.ts
import type { Team, GroupRecord, TeamStanding } from '../types';

// Algoritmo Fisher-Yates para embaralhamento (shuffle)
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const drawGroups = (teams: Team[]): GroupRecord => {
  const shuffled = shuffleArray(teams);
  const groupNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const groups: GroupRecord = {};

  groupNames.forEach((name, index) => {
    // Pega 4 times para cada grupo
    const groupTeams = shuffled.slice(index * 4, (index + 1) * 4);
    
    // Inicializa as estatísticas de cada time no grupo
    const standings: TeamStanding[] = groupTeams.map(team => ({
      ...team,
      points: 0,
      goalsScored: 0,
      goalsConceded: 0,
      goalDifference: 0,
    }));

    groups[name] = {
      name,
      teams: standings,
      matches: [],
    };
  });

  return groups;
};
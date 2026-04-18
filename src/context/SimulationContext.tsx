// src/context/SimulationContext.tsx
import { createContext, useState, type ReactNode, useCallback } from 'react';
import type { Team, GroupRecord, FinalResultPayload } from '../types';
import { getAllTeams, postFinalResult } from '../api/worldCupApi';
import { drawGroups } from '../utils/groupDraw';
import { generateGroupMatches } from '../utils/simulator';
import { calculateStandings } from '../utils/tiebreakers';
import { generateKnockoutTree, type KnockoutTree } from '../utils/knockout';

interface SimulationContextData {
  status: 'idle' | 'loading' | 'groups_drawn' | 'groups_simulated' | 'knockout_simulated' | 'finished' | 'error';
  teams: Team[];
  groups: GroupRecord | null;
  knockoutTree: KnockoutTree | null;
  errorMessage: string | null;
  fetchAndDrawGroups: () => Promise<void>;
  simulateGroupStage: () => void;
  simulateKnockoutStage: () => void;
  submitChampion: () => Promise<void>;
}

export const SimulationContext = createContext<SimulationContextData>({} as SimulationContextData);

export const SimulationProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<SimulationContextData['status']>('idle');
  const [teams, setTeams] = useState<Team[]>([]);
  const [groups, setGroups] = useState<GroupRecord | null>(null);
  const [knockoutTree, setKnockoutTree] = useState<KnockoutTree | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchAndDrawGroups = useCallback(async () => {
    setStatus('loading');
    setErrorMessage(null);
    try {
      const data = await getAllTeams();
      setTeams(data);
      const drawnGroups = drawGroups(data);
      setGroups(drawnGroups);
      setStatus('groups_drawn');
    } catch (error) {
      setErrorMessage('Erro ao buscar seleções da API.');
      setStatus('error');
    }
  }, []);

  const simulateGroupStage = useCallback(() => {
    if (!groups) return;
    
    const simulatedGroups: GroupRecord = {};
    
    // Para cada grupo, gera as partidas e calcula a tabela final
    Object.keys(groups).forEach(key => {
      const group = groups[key];
      const matches = generateGroupMatches(group.teams);
      const updatedGroup = { ...group, matches };
      
      updatedGroup.teams = calculateStandings(updatedGroup);
      simulatedGroups[key] = updatedGroup;
    });

    setGroups(simulatedGroups);
    setStatus('groups_simulated');
  }, [groups]);

  const simulateKnockoutStage = useCallback(() => {
    if (!groups) return;
    const tree = generateKnockoutTree(groups);
    setKnockoutTree(tree);
    setStatus('knockout_simulated');
  }, [groups]);

  const submitChampion = useCallback(async () => {
      if (!knockoutTree) return;
      
      setStatus('loading');
      setErrorMessage(null);

      try {
        const { final } = knockoutTree;
        
        // Proteção extra: Garante que os times existem antes de tentar ler o ID
        if (!final.teamA?.id || !final.teamB?.id) {
          throw new Error("Os dados da final estão corrompidos ou incompletos.");
        }

        const payload: FinalResultPayload = {
          equipeA: final.teamA.id,
          equipeB: final.teamB.id,
          golsEquipeA: final.goalsA || 0,
          golsEquipeB: final.goalsB || 0,
          golsPenaltyTimeA: final.penaltyGoalsA || 0,
          golsPenaltyTimeB: final.penaltyGoalsB || 0,
        };

        await postFinalResult(payload);
        setStatus('finished');
      } catch (error: any) {
        console.error("Falha ao submeter campeão:", error);
        setErrorMessage(error.message || 'Erro ao enviar o resultado final para a API.');
        setStatus('error'); // Isso remove o spinner de loading e mostra o erro na tela
      }
    }, [knockoutTree]);

  return (
    <SimulationContext.Provider
      value={{
        status,
        teams,
        groups,
        knockoutTree,
        errorMessage,
        fetchAndDrawGroups,
        simulateGroupStage,
        simulateKnockoutStage,
        submitChampion
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};
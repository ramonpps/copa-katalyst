import { apiClient } from './client';
import type { Team, FinalResultPayload } from '../types';

/**
 * Busca as 32 seleções da copa
 */
export const getAllTeams = async (): Promise<Team[]> => {
  const data = await apiClient<any[]>('/GetAllTeams');
  
  // Imprime no console para podermos espionar a estrutura real da API
  console.log('Estrutura de um time da API:', data[0]);

  // Mapeamento defensivo: Busca o identificador independente de como a API o nomeou
  return data.map((item: any) => ({
    id: item.id || item.token || item.Token || item.Id || crypto.randomUUID(),
    nome: item.nome || item.Nome || item.name || item.Name || 'Desconhecido',
    ...item // Mantém o restante das propriedades intactas
  }));
};

/**
 * Registra o grande Campeão
 */
export const postFinalResult = (payload: FinalResultPayload): Promise<any> => {
  return apiClient<any>('/FinalResult', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};
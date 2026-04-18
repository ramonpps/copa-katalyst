import React from 'react';
import type { TeamStanding } from '../../types';

interface GroupTableProps {
  teams: TeamStanding[];
}

export const GroupTable: React.FC<GroupTableProps> = ({ teams }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="text-xs text-white uppercase bg-gray-800">
          <tr>
            <th className="px-3 py-2 rounded-tl-md">Seleção</th>
            <th className="px-2 py-2 text-center" title="Pontos">Pts</th>
            <th className="px-2 py-2 text-center" title="Partidas Jogadas">J</th>
            <th className="px-2 py-2 text-center" title="Gols Pró">GP</th>
            <th className="px-2 py-2 text-center" title="Gols Contra">GC</th>
            <th className="px-2 py-2 text-center rounded-tr-md" title="Saldo de Gols">SG</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => {
            // Destaca os 2 primeiros colocados (que se classificam)
            const isQualified = index < 2;
            // Assumimos que cada time jogou o número de partidas baseado nos gols/pontos (simplificação visual)
            // Em um cenário real perfeito, contaríamos as partidas finalizadas, mas como o simulador roda tudo de uma vez, fixamos em 3 pós-simulação ou 0 antes.
            const matchesPlayed = team.points > 0 || team.goalsConceded > 0 || team.goalsScored > 0 ? 3 : 0;

            return (
              <tr 
                key={team.id} 
                className={`border-b last:border-0 ${isQualified ? 'bg-elyte-light font-semibold' : 'bg-white'}`}
              >
                <td className="px-3 py-3 flex items-center gap-2">
                  <span className="text-gray-400 w-4 text-right">{index + 1}º</span>
                  <span className="truncate max-w-30" title={team.nome}>{team.nome}</span>
                </td>
                <td className="px-2 py-3 text-center font-bold text-elyte">{team.points}</td>
                <td className="px-2 py-3 text-center">{matchesPlayed}</td>
                <td className="px-2 py-3 text-center">{team.goalsScored}</td>
                <td className="px-2 py-3 text-center">{team.goalsConceded}</td>
                <td className="px-2 py-3 text-center">{team.goalDifference}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
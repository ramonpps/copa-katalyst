import React from 'react';
import { useSimulation } from '../../hooks/useSimulation';
import { GroupTable } from './GroupTable';
import { MatchList } from './MatchList';

export const GroupsBoard: React.FC = () => {
  const { groups } = useSimulation();

  if (!groups) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
      {Object.values(groups).map((group) => (
        <div key={group.name} className="bg-white rounded-lg shadow-md border-t-4 border-elyte overflow-hidden flex flex-col">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-800">Grupo {group.name}</h3>
          </div>
          
          <div className="p-4 grow flex flex-col gap-4">
            <GroupTable teams={group.teams} />
            
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 border-b pb-1">
                Resultados
              </h4>
              <MatchList matches={group.matches} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
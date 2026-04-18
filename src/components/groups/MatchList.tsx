import React from 'react';
import type { Match } from '../../types';

interface MatchListProps {
  matches: Match[];
}

export const MatchList: React.FC<MatchListProps> = ({ matches }) => {
  if (matches.length === 0) {
    return <p className="text-sm text-gray-400 text-center py-4 italic">Partidas ainda não simuladas.</p>;
  }

  return (
    <div className="flex flex-col gap-2 mt-4">
      {matches.map((match) => (
        <div key={match.id} className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded border border-gray-100">
          <span className="w-1/3 text-right truncate pr-2 font-medium" title={match.teamA.nome}>
            {match.teamA.nome}
          </span>
          <div className="w-1/3 flex justify-center items-center gap-2 font-bold text-gray-800 bg-white px-2 py-1 rounded shadow-sm">
            <span>{match.goalsA ?? '-'}</span>
            <span className="text-elyte text-xs">X</span>
            <span>{match.goalsB ?? '-'}</span>
          </div>
          <span className="w-1/3 text-left truncate pl-2 font-medium" title={match.teamB.nome}>
            {match.teamB.nome}
          </span>
        </div>
      ))}
    </div>
  );
};
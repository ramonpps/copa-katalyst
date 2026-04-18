import React from 'react';
import type { Match } from '../../types';

interface MatchCardProps {
  match: Match;
  label: string;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, label }) => {
  // BLINDAGEM CONTRA ERROS: Se a partida não tiver times definidos, renderiza um esqueleto
  if (!match || !match.teamA || !match.teamB) {
    return (
      <div className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }

  const getWinnerId = () => {
    if (match.penaltyGoalsA !== undefined && match.penaltyGoalsB !== undefined) {
      return match.penaltyGoalsA > match.penaltyGoalsB ? match.teamA.id : match.teamB.id;
    }
    return (match.goalsA || 0) > (match.goalsB || 0) ? match.teamA.id : match.teamB.id;
  };

  const winnerId = getWinnerId();

  return (
    <div className="w-full min-w-[200px] bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 p-5 transition-transform hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(154,27,31,0.1)]">
      
      {/* Badge inspirada na seção de carreiras */}
      <div className="flex justify-between items-center mb-4">
        <span className="bg-[#FFF4E5] text-[#D48B3E] text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full">
          {label}
        </span>
        {match.penaltyGoalsA !== undefined && (
          <span className="bg-elyte-light text-elyte text-[10px] uppercase font-bold px-2 py-1 rounded-full">
            Pênaltis
          </span>
        )}
      </div>
      
      <div className="space-y-3">
        {/* Time A */}
        <div className={`flex justify-between items-center ${winnerId === match.teamA.id ? 'font-bold text-gray-900' : 'text-gray-500'}`}>
          <span className="truncate pr-2 text-sm">{match.teamA.nome}</span>
          <div className="flex items-center gap-2">
            {match.penaltyGoalsA !== undefined && <span className="text-xs text-gray-400">({match.penaltyGoalsA})</span>}
            <span className="bg-gray-50 border border-gray-100 w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold">
              {match.goalsA}
            </span>
          </div>
        </div>

        {/* Linha divisória suave */}
        <hr className="border-gray-100" />

        {/* Time B */}
        <div className={`flex justify-between items-center ${winnerId === match.teamB.id ? 'font-bold text-gray-900' : 'text-gray-500'}`}>
          <span className="truncate pr-2 text-sm">{match.teamB.nome}</span>
          <div className="flex items-center gap-2">
            {match.penaltyGoalsB !== undefined && <span className="text-xs text-gray-400">({match.penaltyGoalsB})</span>}
            <span className="bg-gray-50 border border-gray-100 w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold">
              {match.goalsB}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
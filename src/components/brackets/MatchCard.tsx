import React from 'react';
import type { Match } from '../../types';

interface MatchCardProps {
  match: Match;
  label: string;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  // Blindagem contra dados incompletos de partida.
  if (!match || !match.teamA || !match.teamB) {
    return (
      <div className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 animate-pulse">
        <div className="h-5 bg-gray-300 rounded-t-xl -mx-3 -mt-3 mb-3"></div>
        <div className="h-7 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }

  const decidedOnPenalties =
    match.penaltyGoalsA !== undefined && match.penaltyGoalsB !== undefined;

  const getWinnerId = () => {
    if (decidedOnPenalties) {
      return match.penaltyGoalsA! > match.penaltyGoalsB! ? match.teamA.id : match.teamB.id;
    }
    return (match.goalsA || 0) > (match.goalsB || 0) ? match.teamA.id : match.teamB.id;
  };

  const winnerId = getWinnerId();

  const teamARowClass = [
    'flex justify-between items-center',
    winnerId === match.teamA.id ? 'font-bold text-gray-900' : 'text-gray-500',
  ].join(' ');

  const teamBRowClass = [
    'flex justify-between items-center',
    winnerId === match.teamB.id ? 'font-bold text-gray-900' : 'text-gray-500',
  ].join(' ');

  return (
    <div className="w-full min-w-0 bg-white rounded-xl shadow-[0_3px_14px_rgba(0,0,0,0.04)] border border-gray-100 p-3 transition-transform hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(154,27,31,0.10)]">
      <div className="-mx-3 -mt-3 mb-3 px-2.5 py-1 bg-gray-800 rounded-t-xl flex items-center justify-center">
        <span className="text-[9px] text-gray-100 uppercase font-semibold tracking-wide leading-none">
          {decidedOnPenalties ? 'Decisão nos pênaltis' : 'Tempo normal'}
        </span>
      </div>

      <div className="space-y-2.5">
        <div className={teamARowClass}>
          <span className="truncate pr-2 text-xs">{match.teamA.nome}</span>
          <div className="flex items-center gap-1.5 shrink-0">
            {decidedOnPenalties && (
              <span className="text-[10px] text-gray-400">({match.penaltyGoalsA})</span>
            )}
            <span className="bg-gray-50 border border-gray-100 w-7 h-7 flex items-center justify-center rounded-md text-xs font-semibold">
              {match.goalsA}
            </span>
          </div>
        </div>

        <hr className="border-gray-100" />

        <div className={teamBRowClass}>
          <span className="truncate pr-2 text-xs">{match.teamB.nome}</span>
          <div className="flex items-center gap-1.5 shrink-0">
            {decidedOnPenalties && (
              <span className="text-[10px] text-gray-400">({match.penaltyGoalsB})</span>
            )}
            <span className="bg-gray-50 border border-gray-100 w-7 h-7 flex items-center justify-center rounded-md text-xs font-semibold">
              {match.goalsB}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
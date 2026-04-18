import React from 'react';
import { useSimulation } from '../../hooks/useSimulation';
import { MatchCard } from './MatchCard';

export const BracketsBoard: React.FC = () => {
  const { knockoutTree } = useSimulation();

  if (!knockoutTree) return null;

  const titleClass = 'h-6 flex items-center justify-center text-center font-bold text-gray-400 uppercase text-xs tracking-wide';

  return (
    <div className="w-full overflow-x-auto pb-8">
      <div className="min-w-330 px-4">
        <div className="flex items-start justify-center gap-4 xl:gap-6">
          {/* Oitavas - Lado A */}
          <div className="w-42.5 xl:w-45 flex flex-col">
            <h4 className={titleClass}>Oitavas (Lado A)</h4>
            <div className="mt-4 flex flex-col gap-4">
              {knockoutTree.roundOf16.slice(0, 4).map((m, i) => (
                <MatchCard key={m.id} match={m} label={'Jogo ' + (i + 1)} />
              ))}
            </div>
          </div>

          {/* Quartas - Lado A */}
          <div className="w-42.5 xl:w-45 flex flex-col">
            <h4 className={titleClass}>Quartas</h4>
            <div className="mt-12 flex flex-col gap-16">
              {knockoutTree.quarterFinals.slice(0, 2).map((m) => (
                <MatchCard key={m.id} match={m} label="Quartas" />
              ))}
            </div>
          </div>

          {/* Semifinal - Lado A */}
          <div className="w-42.5 xl:w-45 flex flex-col">
            <h4 className={titleClass}>Semifinal</h4>
            <div className="mt-24">
              <MatchCard match={knockoutTree.semiFinals[0]} label="Semi 1" />
            </div>
          </div>

          {/* Grande Final - Centro */}
          <div className="w-42.5 xl:w-45 flex flex-col">
            <h4 className="h-6 flex items-center justify-center text-center font-black text-gray-900 uppercase text-xs tracking-wide">
              Grande Final
            </h4>
            <div className="mt-6">
              <MatchCard match={knockoutTree.final} label="Final" />
            </div>
          </div>

          {/* Semifinal - Lado B */}
          <div className="w-42.5 xl:w-45 flex flex-col">
            <h4 className={titleClass}>Semifinal</h4>
            <div className="mt-24">
              <MatchCard match={knockoutTree.semiFinals[1]} label="Semi 2" />
            </div>
          </div>

          {/* Quartas - Lado B */}
          <div className="w-42.5 xl:w-45 flex flex-col">
            <h4 className={titleClass}>Quartas</h4>
            <div className="mt-12 flex flex-col gap-16">
              {knockoutTree.quarterFinals.slice(2, 4).map((m) => (
                <MatchCard key={m.id} match={m} label="Quartas" />
              ))}
            </div>
          </div>

          {/* Oitavas - Lado B */}
          <div className="w-42.5 xl:w-45 flex flex-col">
            <h4 className={titleClass}>Oitavas (Lado B)</h4>
            <div className="mt-4 flex flex-col gap-4">
              {knockoutTree.roundOf16.slice(4, 8).map((m, i) => (
                <MatchCard key={m.id} match={m} label={'Jogo ' + (i + 5)} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
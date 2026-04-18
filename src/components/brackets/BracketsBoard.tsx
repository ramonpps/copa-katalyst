import React from 'react';
import { useSimulation } from '../../hooks/useSimulation';
import { MatchCard } from './MatchCard';

export const BracketsBoard: React.FC = () => {
  const { knockoutTree } = useSimulation();

  if (!knockoutTree) return null;

  return (
    <div className="w-full flex flex-col gap-12 overflow-x-auto pb-8">
      {/* Container Principal: Três linhas para simular a Figura 1 */}
      <div className="flex justify-between items-center min-w-[1000px] px-4 gap-8">
        
        {/* LADO ESQUERDO: Oitavas (4 jogos) */}
        <div className="flex flex-col gap-8 w-1/4">
          <h4 className="text-center font-bold text-gray-400 uppercase text-xs">Oitavas (Lado A)</h4>
          {knockoutTree.roundOf16.slice(0, 4).map((m, i) => (
            <MatchCard key={m.id} match={m} label={`Jogo ${i + 1}`} />
          ))}
        </div>

        {/* QUARTAS: (2 jogos) */}
        <div className="flex flex-col gap-24 w-1/4">
          <h4 className="text-center font-bold text-gray-400 uppercase text-xs">Quartas</h4>
          {knockoutTree.quarterFinals.slice(0, 2).map((m, i) => (
            <MatchCard key={m.id} match={m} label="Quartas" />
          ))}
        </div>

        {/* FINAL E SEMIS (CENTRO) */}
        <div className="flex flex-col items-center justify-center gap-12 w-1/4 py-10">
          <div className="w-full space-y-4">
             <h4 className="text-center font-bold text-elyte uppercase text-xs">Semifinais</h4>
             <MatchCard match={knockoutTree.semiFinals[0]} label="Semi 1" />
             <MatchCard match={knockoutTree.semiFinals[1]} label="Semi 2" />
          </div>
          
          <div className="w-full pt-10 border-t-2 border-dashed border-gray-200">
             <h4 className="text-center font-black text-gray-900 uppercase text-sm mb-4">🏆 Grande Final</h4>
             <MatchCard match={knockoutTree.final} label="FINAL" isFinal />
             
             {knockoutTree.champion && (
               <div className="mt-8 text-center animate-bounce">
                 <p className="text-xs font-bold text-gray-400 uppercase">Campeão</p>
                 <h3 className="text-2xl font-black text-elyte">{knockoutTree.champion.nome}</h3>
               </div>
             )}
          </div>
        </div>

        {/* QUARTAS: (Lado B - 2 jogos) */}
        <div className="flex flex-col gap-24 w-1/4">
          <h4 className="text-center font-bold text-gray-400 uppercase text-xs">Quartas</h4>
          {knockoutTree.quarterFinals.slice(2, 4).map((m, i) => (
            <MatchCard key={m.id} match={m} label="Quartas" />
          ))}
        </div>

        {/* LADO DIREITO: Oitavas (4 jogos) */}
        <div className="flex flex-col gap-8 w-1/4">
          <h4 className="text-center font-bold text-gray-400 uppercase text-xs">Oitavas (Lado B)</h4>
          {knockoutTree.roundOf16.slice(4, 8).map((m, i) => (
            <MatchCard key={m.id} match={m} label={`Jogo ${i + 5}`} />
          ))}
        </div>

      </div>
    </div>
  );
};
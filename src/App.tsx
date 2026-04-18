import React, { useEffect, useState } from 'react';
import { SimulationProvider } from './context/SimulationContext';
import { useSimulation } from './hooks/useSimulation';
import { Button } from './components/ui/Button';
import { Spinner } from './components/ui/Spinner';
import { GroupsBoard } from './components/groups/GroupsBoard';
import { BracketsBoard } from './components/brackets/BracketsBoard';

const Dashboard: React.FC = () => {
  const {
    status,
    knockoutTree,
    errorMessage,
    fetchAndDrawGroups,
    simulateGroupStage,
    simulateKnockoutStage,
    submitChampion
  } = useSimulation();

  const [isSubmittingChampion, setIsSubmittingChampion] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      fetchAndDrawGroups();
    }
  }, [status, fetchAndDrawGroups]);

  const showChampionInHeader =
    (status === 'knockout_simulated' || status === 'finished') &&
    !!knockoutTree?.champion?.nome;

  const handleSubmitChampion = async () => {
    if (isSubmittingChampion) return;

    setIsSubmittingChampion(true);
    try {
      await submitChampion();
    } finally {
      setIsSubmittingChampion(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-elyte-bg text-gray-800 font-sans overflow-hidden">
      {/* HEADER FIXO */}
      <header className="bg-white shadow-sm border-b-4 border-elyte shrink-0 h-20 flex items-center justify-between px-6 relative z-10">
        {/* Esquerda: Logo e Troféu */}
        <div className="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-elyte" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
          </svg>
          <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
            Copa <span className="text-elyte">Katalyst</span> 2026
          </h1>
        </div>

        {/* Campeão centralizado no header */}
        {showChampionInHeader && (
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 animate-bounce pointer-events-none max-w-[55vw]">
            <span className="text-xs md:text-sm font-black uppercase tracking-wide text-gray-500 whitespace-nowrap">
              Campeão:
            </span>
            <span className="text-sm md:text-xl font-black text-elyte truncate">
              {knockoutTree?.champion?.nome}
            </span>
          </div>
        )}

        {/* Direita: Títulos de Orientação + Botões de Ação */}
        <div className="flex items-center gap-6">
          {status !== 'idle' && status !== 'loading' && (
            <div className="hidden xl:flex flex-col text-right justify-center">
              <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider">
                {status === 'groups_drawn' && 'Sorteio da Fase de Grupos'}
                {status === 'groups_simulated' && 'Resultados da 1ª Fase'}
                {(status === 'knockout_simulated' || status === 'finished') && 'Mata-Mata & Grande Final'}
              </h2>
            </div>
          )}

          {status !== 'idle' && status !== 'loading' && (
            <div className="w-px h-10 bg-gray-200 hidden xl:block"></div>
          )}

          <div className="flex items-center gap-4">
            {status === 'groups_drawn' && (
              <Button onClick={simulateGroupStage} className="px-5! py-2! text-sm! font-bold! shadow-none">
                Simular Rodadas
              </Button>
            )}

            {status === 'groups_simulated' && (
              <Button onClick={simulateKnockoutStage} className="px-5! py-2! text-sm! font-bold! shadow-none">
                Ir para o Mata-Mata
              </Button>
            )}

            {(status === 'knockout_simulated' || isSubmittingChampion) && (
              <Button
                onClick={handleSubmitChampion}
                disabled={isSubmittingChampion}
                className="px-5! py-2! text-sm! font-bold! bg-green-700 hover:bg-green-800 border-none shadow-none"
              >
                {isSubmittingChampion ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin"></span>
                    Registrando...
                  </>
                ) : (
                  'Registrar Campeão'
                )}
              </Button>
            )}

            {status === 'finished' && (
              <div className="flex items-center gap-4">
                <span className="text-green-600 font-bold text-sm flex items-center gap-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Campeão Registrado
                </span>
                <Button onClick={() => window.location.reload()} className="px-5! py-2! text-sm! font-bold! shadow-none">
                  Reiniciar
                </Button>
              </div>
            )}

            {status === 'loading' && !isSubmittingChampion && (
              <span className="text-gray-400 text-sm italic animate-pulse">Processando...</span>
            )}
          </div>
        </div>
      </header>

      {/* ÁREA CENTRAL ROLÁVEL */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10 w-full flex flex-col items-center relative">
        {status === 'loading' && !isSubmittingChampion && (
          <div className="absolute inset-0 flex items-center justify-center bg-elyte-bg/60 backdrop-blur-sm z-50">
            <Spinner />
          </div>
        )}

        <div className="w-full max-w-400 mx-auto pt-2">
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 mb-6 rounded-xl shadow-sm flex items-start gap-3">
              <svg className="h-5 w-5 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <div>
                <p className="font-bold text-sm">Houve um problema</p>
                <p className="text-sm">{errorMessage}</p>
              </div>
            </div>
          )}

          {(status === 'groups_drawn' || status === 'groups_simulated') && (
            <div className="animate-in fade-in duration-500">
              <GroupsBoard />
            </div>
          )}

          {(status === 'knockout_simulated' || status === 'finished' || isSubmittingChampion) && (
            <div className="animate-in fade-in duration-500">
              <BracketsBoard />
            </div>
          )}
        </div>
      </main>

      {/* FOOTER FIXO */}
      <footer className="bg-white border-t border-gray-200 shrink-0 h-14 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 px-6 text-sm text-gray-500 z-10">
        <div className="flex items-center gap-2">
          <span>© 2026 Katalyst Data Management | Processo Seletivo Estágio</span>
          <span className="text-gray-300 hidden md:inline">|</span>
          <span className="hidden md:inline">Candidato: <span className="font-bold text-elyte">Ramon Pedro Pereira Santos</span></span>
        </div>

        <div className="flex items-center gap-6">
          <a href="https://github.com/ramonpps" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors" title="Acesse o GitHub">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold text-xs uppercase tracking-wider">GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/ramonpps/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-500 hover:text-blue-700 transition-colors" title="Acesse o LinkedIn">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span className="font-semibold text-xs uppercase tracking-wider">LinkedIn</span>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <SimulationProvider>
      <Dashboard />
    </SimulationProvider>
  );
}
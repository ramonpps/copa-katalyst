import React from 'react';
import { SimulationProvider } from './context/SimulationContext';
import { useSimulation } from './hooks/useSimulation';
import { Button } from './components/ui/Button';
import { Spinner } from './components/ui/Spinner';
import { GroupsBoard } from './components/groups/GroupsBoard';

// O BracketsBoard será o nosso próximo componente visual
import { BracketsBoard } from './components/brackets/BracketsBoard';

const Dashboard: React.FC = () => {
  const { 
    status, 
    errorMessage, 
    fetchAndDrawGroups, 
    simulateGroupStage, 
    simulateKnockoutStage,
    submitChampion
  } = useSimulation();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-20 flex flex-col">
      {/* Header com a identidade visual ElyteSpark */}
      <header className="bg-white shadow-sm border-b-4 border-elyte sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            <span className="text-elyte">Katalyst</span> World Cup 2026
          </h1>
          {status !== 'idle' && status !== 'loading' && (
             <span className="text-[10px] md:text-xs bg-elyte-light text-elyte px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-elyte/20">
               {status.replace('_', ' ')}
             </span>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 w-full flex-grow">
        
        {/* Notificação de Erro */}
        {errorMessage && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded shadow-sm flex items-start gap-3 animate-bounce">
            <svg className="h-5 w-5 text-red-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-bold">Houve um problema</p>
              <p className="text-sm">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Estado de Carregamento (Spinner Customizado) */}
        {status === 'loading' && (
          <div className="flex flex-col items-center justify-center py-32">
            <Spinner />
          </div>
        )}

        {/* FASE 0: Tela de Boas-vindas / Início */}
        {status === 'idle' && (
          <div className="max-w-3xl mx-auto text-center py-20 px-4">
            <div className="mb-10 inline-block p-6 rounded-3xl bg-elyte-light text-elyte shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.628.283a2 2 0 01-1.186.116l-2.054-.41a8 8 0 00-4.134.075 2 2 0 01-1.722-.18l-.59-.393a2 2 0 00-2.31 3.238l.707.707a2 2 0 01.586 1.414V21a1 1 0 001 1h10a1 1 0 001-1v-3.071a2 2 0 01.586-1.414l.707-.707a2 2 0 00.142-2.31z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.985 6a4 4 0 00-8 0 4 4 0 008 0z" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
              Copa <span className="text-elyte">Katalyst</span> 2026
            </h2>
            <p className="text-lg md:text-xl text-gray-500 mb-12 leading-relaxed max-w-2xl mx-auto">
              Simule o maior evento de futebol do mundo. Sorteie as seleções, acompanhe os pontos em tempo real e descubra quem levará o título.
            </p>
            <Button onClick={fetchAndDrawGroups} className="text-xl px-12 py-5 shadow-2xl hover:scale-105 transform">
              Sortear Grupos e Iniciar
            </Button>
          </div>
        )}

        {/* FASE 1: Grupos Sorteados */}
        {status === 'groups_drawn' && (
          <div className="space-y-12 animate-in fade-in duration-700">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-extrabold text-gray-900">Sorteio Concluído</h2>
                <p className="text-gray-500 mt-1">32 seleções divididas aleatoriamente do Grupo A ao H.</p>
              </div>
              <Button onClick={simulateGroupStage} className="w-full md:w-auto text-lg px-8">
                Simular Rodadas dos Grupos
              </Button>
            </div>
            <GroupsBoard />
          </div>
        )}

        {/* FASE 2: Grupos Simulados */}
        {status === 'groups_simulated' && (
          <div className="space-y-12 animate-in fade-in duration-700">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-extrabold text-gray-900">Resultados da 1ª Fase</h2>
                <p className="text-gray-500 mt-1 text-balance">Confira a pontuação final. Os dois melhores de cada grupo garantiram vaga.</p>
              </div>
              <Button onClick={simulateKnockoutStage} className="w-full md:w-auto text-lg px-8">
                Avançar para o Mata-Mata
              </Button>
            </div>
            <GroupsBoard />
          </div>
        )}

        {/* FASE 3: Mata-Mata ou Finalizado */}
        {(status === 'knockout_simulated' || status === 'finished') && (
          <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-1000">
             <div className="bg-white p-8 rounded-2xl shadow-md border-t-8 border-elyte flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-extrabold text-gray-900">Grande Final</h2>
                <p className="text-gray-500 mt-1">Simulação completa do chaveamento seguindo a regra da Figura 1.</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                {status === 'knockout_simulated' ? (
                  <Button onClick={submitChampion} className="w-full text-lg px-8 py-3">
                    Registrar Campeão na API
                  </Button>
                ) : (
                  <div className="bg-green-50 text-green-700 px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-3 border border-green-200">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    CAMPEÃO ENVIADO COM SUCESSO!
                  </div>
                )}
                <Button variant="outline" onClick={() => window.location.reload()} className="w-full sm:w-auto">
                  Reiniciar
                </Button>
              </div>
            </div>
            
            <BracketsBoard />
          </div>
        )}

      </main>

      <footer className="py-12 bg-white border-t border-gray-100 text-center text-gray-400 text-xs md:text-sm">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-medium text-gray-600">© 2026 Katalyst Data Management | Processo Seletivo Estágio</p>
          <p className="mt-2">Candidato: <span className="text-elyte font-semibold">Ramon Santos</span></p>
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
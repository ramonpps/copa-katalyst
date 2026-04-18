// src/hooks/useSimulation.ts
import { useContext } from 'react';
import { SimulationContext } from '../context/SimulationContext';

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  
  if (context === undefined) {
    throw new Error('useSimulation deve ser usado dentro de um SimulationProvider');
  }
  
  return context;
};
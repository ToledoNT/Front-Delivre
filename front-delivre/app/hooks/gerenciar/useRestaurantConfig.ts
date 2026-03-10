import { RestaurantConfig } from '@/app/interfaces/gerenciar-interfaces';
import { useState } from 'react';

export function useRestaurantConfig(initialConfig: RestaurantConfig) {
  const [config, setConfig] = useState<RestaurantConfig>(initialConfig);

  const handleConfigChange = (field: keyof RestaurantConfig, value: any) => {
    setConfig({ ...config, [field]: value });
  };

  const handleHorarioChange = (index: number, field: string, value: any) => {
    const novosHorarios = [...config.horarioFuncionamento];
    novosHorarios[index] = { ...novosHorarios[index], [field]: value };
    setConfig({ ...config, horarioFuncionamento: novosHorarios });
  };

  const saveConfig = () => {
    alert("Configurações salvas (simulado)");
  };

  return {
    config,
    handleConfigChange,
    handleHorarioChange,
    saveConfig,
  };
}
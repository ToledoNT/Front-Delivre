import { restaurantApi } from "@/app/api/restauranteService";
import { RestaurantConfig } from "@/app/interfaces/gerenciar-interfaces";
import { useState, useEffect } from "react";

export function useRestaurantConfig(initialConfig: RestaurantConfig) {
  const [config, setConfig] = useState<RestaurantConfig>(initialConfig);

  // carregar configuração da API
  useEffect(() => {
    async function loadConfig() {
      try {
        const data = await restaurantApi.getConfig();
        setConfig(data);
      } catch (error) {
        console.error("Erro ao carregar configurações:", error);
      }
    }

    loadConfig();
  }, []);

  const handleConfigChange = (field: keyof RestaurantConfig, value: any) => {
    setConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleHorarioChange = (index: number, field: string, value: any) => {
    const novosHorarios = [...config.horarioFuncionamento];

    novosHorarios[index] = {
      ...novosHorarios[index],
      [field]: value,
    };

    setConfig({
      ...config,
      horarioFuncionamento: novosHorarios,
    });
  };

  const saveConfig = async () => {
    try {
      await restaurantApi.saveConfig(config);
      alert("Configurações salvas com sucesso");
    } catch (error) {
      console.error("Erro ao salvar configurações:", error);
      alert("Erro ao salvar configurações");
    }
  };

  return {
    config,
    handleConfigChange,
    handleHorarioChange,
    saveConfig,
  };
}

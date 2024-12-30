import { api } from "./api";
import { getCookieServer } from "@/lib/cookieServidor";

interface Filtros {
  [key: string]: any;
}

export const excluirDados = async (endpoint: string, filtros: Filtros) => {
  try {
    const token = await getCookieServer();
    if (!confirm("Deseja trocar o status?")) return;

    const response = await api.put(endpoint, filtros, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data || [];
  } catch (error) {
    console.error(`Erro ao buscar dados de ${endpoint}:`, error);
  }
};

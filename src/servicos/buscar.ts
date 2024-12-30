import { api } from "./api";
import { getCookieServer } from "@/lib/cookieServidor";

interface Filtros {
    [key: string]: any;
}

export const buscaDados = async (endpoint: string, filtros: Filtros) =>{
    try {
        const token = await getCookieServer();
        const response = await api.get(endpoint, {
            headers:{
                Authorization: `Bearer ${token}`,
            },
            params: filtros, 
        });
        return response.data || [];
    }catch (error){
        console.log(`Erro ao buscar dados de ${endpoint}`)
    }
}
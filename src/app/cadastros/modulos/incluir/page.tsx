"use client"
import estiloGlobal from '../../../page.module.scss';
import { Header } from '@/app/dashboard/componentes/header';
import { buscaDados } from '@/servicos/buscar';
import { SistemaProps } from '@/lib/sistema.type';
import { useState, useEffect } from 'react';
import { api } from '@/servicos/api';
import { getCookieServer } from '@/lib/cookieServidor';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function IncluirModulo() {
  const [id_modulo, setIdmodulo] = useState<string | null>(null);
  const [nome_modulo, setNomeModulo] = useState<string >('');
  const [id_sistema, setIdSistema] = useState<string | undefined>('');
  const [sistema, setSistema] = useState<SistemaProps[]>([]);
  const router = useRouter();

  useEffect(() => {
    const cookies = document.cookie
      .split('; ')
      .find(row => row.startsWith('id_modulo='))
      ?.split('=')[1];
      setIdmodulo(cookies || null);

    if (cookies) {
      selecionarModulo(cookies);
    }
    
  }, []);
  
  async function selecionarModulo(id_modulo: string) {
    const token = await getCookieServer();
    try {
      const { data } = await api.get(`/detalharmodulo/${id_modulo}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }        
      });

      if (data) {
        setNomeModulo(data.nome_modulo || "");
        setIdSistema(data.id_sistema || "")
      } else {
        toast.warn("Nenhum sistema encontrada para o ID fornecido.");
      }
    } catch (err) {
      toast.error("Erro ao buscar os dados da franquia.");
      console.error(err);
    }
  }

  async function btngravar(){
    if (!id_sistema) {
      alert('Por favor, selecione um sistema.');
      return;
    }

      if(!id_modulo){
        const token = await getCookieServer();
        try {
          await api.post(
            "/criarmodulo",
            { nome_modulo, status: true, id_modulo, id_sistema },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          router.push("../../cadastros/modulos");
        } catch {
          new Error('Erro');
        }
      }else {
      try {
        const token = await getCookieServer();
        await api.put(
          "/atualizarmodulo",
          { nome_modulo, id_modulo, id_sistema},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        toast.success("Gravado com sucesso.");
        router.push("../../cadastros/modulos");
      } catch (err: any) {
        throw new Error('Erro ao atualizar Modulo')
      }        
      }
    }


  const selecionarSistema = async () => {
    const filtros = {
      status: true,
    };
    const sistema = await buscaDados('/listarsistema', filtros);
    setSistema(sistema);
  };

  useEffect(() => {
    selecionarSistema();
  }, []);

  return (
    <>
      <Header />
      <main className={estiloGlobal.dados}>
        <div className={estiloGlobal.titulo}>
          <h1>Incluir Modulo</h1>
        </div>

        <div className={estiloGlobal.barraFuncoes}>
          <div>
            <button
              className={`${estiloGlobal.btn} ${estiloGlobal.incluir}`}
              onClick={btngravar}
            >
              Gravar
            </button>
            <button
              className={`${estiloGlobal.btn} ${estiloGlobal.excluir}`}
              onClick={() => router.push("../../cadastros/modulos")}
            >
              Cancelar
            </button>
          </div>
        </div>

        <form className={estiloGlobal.formCadastro}>
          <table>
            <tbody>
              <tr>
                <td>
                  <label>Sistema:</label>
                </td>
                <td>
                <select
                  id="sistema"
                  className={estiloGlobal.inputPesquisaSelectForm }
                  name="id_sistema"
                  value={id_sistema}
                  onChange={(e) => {setIdSistema(e.target.value)}}
                >
                  <option value="" disabled>
                    Selecione um sistema
                  </option>
                  {sistema.map((item) => (
                    <option key={item.id_sistema} value={item.id_sistema}>
                      {item.nome_sistema}
                    </option>
                  ))}
                </select>
                </td>
            </tr>
              <tr>
                <td>
                  <label>Modulo:</label>
                </td>
                <td>
                  <input
                    id="modulo"
                    type="text"
                    className={estiloGlobal.inputPesquisa}
                    placeholder="Nome do Modulo"
                    value={nome_modulo}
                    onChange={(e) => setNomeModulo(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </main>
    </>
  );
}

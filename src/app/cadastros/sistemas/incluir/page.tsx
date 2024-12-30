"use client"
import estiloGlobal from '../../../page.module.scss';
import { Header } from '@/app/dashboard/componentes/header';
import { api } from '@/servicos/api';
import { getCookieServer } from '@/lib/cookieServidor';
import { useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function IncluirSistema() {
  const [idSistema, setIdSistema] = useState<string | null>(null)
  const [nome_sistema, setNomeSistema] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const cookies = document.cookie
      .split('; ')
      .find(row => row.startsWith('id_sistema='))
      ?.split('=')[1];
    setIdSistema(cookies || null);

    if (cookies) {
      selecionarSistema(cookies);
    }
  }, []);

  async function selecionarSistema(id: string) {
    const token = await getCookieServer();
    try {
      const { data } = await api.get(`/detalharsistema/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }        
      });

      if (data) {
        setNomeSistema(data.nome_sistema || "");
      } else {
        toast.warn("Nenhum sistema encontrada para o ID fornecido.");
      }
    } catch (err) {
      toast.error("Erro ao buscar os dados da franquia.");
      console.error(err);
    }
  }

  async function btnGravar() {
    const token = await getCookieServer();

    if (!idSistema){
      try {
        await api.post(
          "/criarsistema",
          { nome_sistema, status: true, id_sistema: idSistema },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        setErrorMessage(null);
        toast.success("Gravado com sucesso.");
        router.push("../../cadastros/sistemas");
      } catch (err: any) {
        if (err.response?.data?.error) {
          setErrorMessage(err.response.data.error);
        } else {
          setErrorMessage("Erro ao tentar salvar o sistema. Tente novamente.");
        }
      }
    }else {
      try {
        await api.put(
          "/atualizarsistema",
          { nome_sistema, id_sistema: idSistema },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        setErrorMessage(null);
        toast.success("Gravado com sucesso.");
        router.push("../../cadastros/sistemas");
      } catch (err: any) {
        if (err.response?.data?.error) {
          setErrorMessage(err.response.data.error);
        } else {
          setErrorMessage("Erro ao tentar salvar o sistema. Tente novamente.");
        }
      }
    }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await btnGravar();
    };

  const btnCancelar = () => {
    document.cookie = "id_sistema=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    setIdSistema(null);
    router.push('../../cadastros/sistemas');
  };

  return (
    <>
      <Header />
      <main className={estiloGlobal.dados}>
       <div className={estiloGlobal.titulo}>
          <h1>Incluir Sistema</h1>
       </div>
      

       <div className={estiloGlobal.barraFuncoes}>
          <div>
            <button className={`${estiloGlobal.btn} ${estiloGlobal.incluir}`} type="submit" form="formSistema">Gravar</button>
            <button className={`${estiloGlobal.btn} ${estiloGlobal.excluir}`} onClick={btnCancelar} >Cancelar</button>
          </div>
       </div>

       <form className={estiloGlobal.formCadastro} id='formSistema'  onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td><label>Sistema:</label></td>
                <td><input 
                type="text"  
                className={estiloGlobal.inputPesquisa} 
                placeholder='Nome do Sistema'
                required
                name="nome_sistema"
                value={nome_sistema}
                onChange={(e) => setNomeSistema(e.target.value)}
              />
              {errorMessage && (
                <div className={estiloGlobal.error}>
                  <p>{errorMessage}</p>
                </div>
               )}
              </td>
                
              </tr>
            </tbody>

          </table>
       </form>

      </main>
    </>
  );
}

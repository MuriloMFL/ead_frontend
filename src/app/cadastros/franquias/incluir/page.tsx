"use client";
import estiloGlobal from '../../../page.module.scss';
import { Header } from '@/app/dashboard/componentes/header';
import { api } from '@/servicos/api';
import { getCookieServer } from '@/lib/cookieServidor';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function IncluirFranquia() {
  const [idFranquia, setIdFranquia] = useState<string | null>(null);
  const [nome, setNome] = useState<string>("");
  const [responsavel, setResponsavel] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const cookies = document.cookie
      .split('; ')
      .find(row => row.startsWith('id_franquia='))
      ?.split('=')[1];
    setIdFranquia(cookies || null);

    if (cookies) {
      selecionarFranquia(cookies);
    }
  }, []);

  async function selecionarFranquia(id: string) {
    const token = await getCookieServer();

    try {
      const { data } = await api.get(`/detalharfranquia/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data) {
        setNome(data.nome || "");
        setResponsavel(data.responsavel || "");
        setTelefone(data.telefone || "");
      } else {
        toast.warn("Nenhuma franquia encontrada para o ID fornecido.");
      }
    } catch (err) {
      toast.error("Erro ao buscar os dados do sistema.");
      console.error(err);
    }
  }

  async function btnGravar() {
    const token = await getCookieServer();

    if (!idFranquia){
      try {
        await api.post(
          "/criarfranquia",
          { nome, responsavel, telefone, status: true, id_franquia: idFranquia },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        setErrorMessage(null);
        toast.success("Gravado com sucesso.");
        router.push("../../cadastros/franquias");
      } catch (err: any) {
        if (err.response?.data?.error) {
          setErrorMessage(err.response.data.error);
        } else {
          setErrorMessage("Erro ao tentar salvar a franquia. Tente novamente.");
        }
      }
    }else {
      try {
        await api.put(
          "/atualizarfranquia",
          { nome, responsavel, telefone, id_franquia: idFranquia },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        setErrorMessage(null);
        toast.success("Gravado com sucesso.");
        router.push("../../cadastros/franquias");
      } catch (err: any) {
        if (err.response?.data?.error) {
          setErrorMessage(err.response.data.error);
        } else {
          setErrorMessage("Erro ao tentar salvar a franquia. Tente novamente.");
        }
      }
    }
    }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await btnGravar();
  };

  const btnCancelar = () => {
    document.cookie = "id_franquia=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    setIdFranquia(null);
    router.push('../../cadastros/franquias');
  };

  return (
    <>
      <Header />
      <main className={estiloGlobal.dados}>
        <div className={estiloGlobal.titulo}>
          <h1>Incluir Franquia</h1>
        </div>
        <div className={estiloGlobal.barraFuncoes}>
          <div>
            <button
              className={`${estiloGlobal.btn} ${estiloGlobal.incluir}`}
              type="submit"
              form="formFranquia"
            >
              Gravar
            </button>
            <button
              className={`${estiloGlobal.btn} ${estiloGlobal.excluir}`}
              onClick={btnCancelar}
            >
              Cancelar
            </button>
          </div>
        </div>
        <form
          id="formFranquia"
          className={estiloGlobal.formCadastro}
          onSubmit={handleSubmit}
        >
          <table>
            <tbody>
              <tr>
                <td><label>Franquia:</label></td>
                <td>
                  <input
                    type="text"
                    className={estiloGlobal.inputPesquisa}
                    placeholder="Nome da Franquia"
                    required
                    name="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                  {errorMessage && (
                    <div className={estiloGlobal.error}>
                      <p>{errorMessage}</p>
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <td><label>Responsável:</label></td>
                <td>
                  <input
                    type="text"
                    className={estiloGlobal.inputPesquisa}
                    placeholder="Nome do responsável"
                    required
                    name="responsavel"
                    value={responsavel}
                    onChange={(e) => setResponsavel(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td><label>Telefone:</label></td>
                <td>
                  <input
                    type="text"
                    className={estiloGlobal.inputPesquisa}
                    placeholder="Telefone"
                    required
                    name="telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
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

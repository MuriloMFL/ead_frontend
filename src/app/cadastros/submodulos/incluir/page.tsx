"use client"
import estiloGlobal from '../../../page.module.scss';
import { Header } from '@/app/dashboard/componentes/header';
import { api } from '@/servicos/api';
import { getCookieServer } from '@/lib/cookieServidor';
import { useState, useEffect} from 'react';
import { SistemaProps } from '@/lib/sistema.type';
import { ModuloProps } from '@/lib/modulo.type';
import { buscaDados } from '@/servicos/buscar';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function IncluirSubModulo() {
  const [id_submodulo, setIdSubmodulo]     = useState<string | null>(null);
  const [nome_submodulo, setNomeSubModulo] = useState<string>('');
  const [id_sistema, setIdSistema]         = useState<string>('');
  const [id_modulo, setidModulo]           = useState<string>('');
  const [sistema, setSistema]              = useState<SistemaProps[]>([]);
  const [modulo, setModulo]                = useState<ModuloProps[]>([]);
  const router = useRouter();

    useEffect (() => {
      const cookies = document.cookie
        .split('; ')
        .find(row => row.startsWith('id_submodulo'))
        ?.split('=')[1]
        setIdSubmodulo(cookies || null);

        if(cookies){
          detalharSubmodulo(cookies)
        }
    }, [])
    
    async function detalharSubmodulo(id_submodulo: string){
      const token = await getCookieServer();
      try {
        const { data } = await api.get(`/detalharsubmodulo/${id_submodulo}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }        
        });
  
        if (data) {
          setNomeSubModulo(data.nome_submodulo || "");
          setIdSistema(data.id_sistema || "")
          setidModulo(data.id_modulo || "")
        } else {
          toast.warn("Nenhum Submodulo encontrada para o ID fornecido.");
        }
      } catch (err) {
        toast.error("Erro ao buscar os dados do SubModulo.");
        console.error(err);
      }
    }

    async function btngravar(){
        
        if(!id_submodulo){
          const token = await getCookieServer();
          try {
            await api.post(
              "/criarsubmodulo",
              { nome_submodulo, status: true, id_sistema, id_modulo },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            toast.success("Gravado com sucesso.");
            router.push("../../cadastros/submodulos");
          } catch {
            new Error('Erro');
          }
        }else {
        try {
          const token = await getCookieServer();
          await api.put(
            "/atualizarsubmodulo",
            { nome_submodulo, id_submodulo, id_sistema, id_modulo},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          toast.success("Gravado com sucesso.");
          router.push("../../cadastros/submodulos");
        } catch (err: any) {
          throw new Error('Erro ao atualizar SubModulo')
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

    const selecionarModulo = async () => {
      const filtros = {
        status: true,
        id_sistema,
      };
      const modulo = await buscaDados('/listarmodulo', filtros);
      setModulo(modulo);
    };

    useEffect(() => {
      selecionarModulo();
    }, [id_sistema]);

    const btnCancelar = () => {
      document.cookie = "id_submodulo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      setIdSubmodulo(null);
      router.push('../../cadastros/submodulos');
    };   
  return (
    <>
      <Header />
      <main className={estiloGlobal.dados}>
       <div className={estiloGlobal.titulo}>
          <h1>Incluir SubModulo</h1>
       </div>

       <div className={estiloGlobal.barraFuncoes}>
          <div>
            <button className={`${estiloGlobal.btn} ${estiloGlobal.incluir}`} onClick={btngravar}>Gravar</button>
            <button className={`${estiloGlobal.btn} ${estiloGlobal.excluir}`} onClick={btnCancelar}>Cancelar</button>
          </div>
       </div>

       <form className={estiloGlobal.formCadastro}>
          <table>
            <tbody>
            <tr>
              <td><label>Sistema:</label></td>
              <td>
                <select 
                  required
                  className={estiloGlobal.inputPesquisaSelectForm}
                  name='id_sistema'
                  value={id_sistema}
                  onChange={(e) => {setIdSistema(e.target.value)}}
                 >
                  <option value="" disabled>
                    Selecione um Sistema
                  </option>
                  {sistema.map( (item) =>(
                    <option key={item.id_sistema} value={item.id_sistema}>
                      {item.nome_sistema}
                    </option>                    
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td><label>Modulo:</label></td>
              <td>
                <select 
                  required
                  className={estiloGlobal.inputPesquisaSelectForm}
                  name='id_modulo'
                  value={id_modulo}
                  onChange={(e) => {setidModulo(e.target.value)}}
                  >
                  <option value="" disabled>
                    Selecione um Modulo
                  </option>
                  {modulo.map ( (item) => (
                    <option key={item.id_modulo} value={item.id_modulo}>
                      {item.nome_modulo}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td><label>SubModulo:</label></td>
              <td>
                <input 
                  required
                  type="text"  
                  className={estiloGlobal.inputPesquisa} 
                  placeholder='Nome do Submodulo'
                  value={nome_submodulo}
                  onChange={(e) => {setNomeSubModulo(e.target.value)}}/>
              </td>
            </tr>
            </tbody>
          </table>
       </form>

      </main>
    </>
  );
}

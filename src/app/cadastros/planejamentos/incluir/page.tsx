"use client"
import estiloGlobal from '../../../page.module.scss';
import estiloLocal  from './page.module.scss'
import { Header } from '@/app/dashboard/componentes/header';
import { api } from '@/servicos/api';
import { getCookieServer } from '@/lib/cookieServidor';
import { useState, useEffect} from 'react';
import { SistemaProps } from '@/lib/sistema.type';
import { ModuloProps } from '@/lib/modulo.type';
import { buscaDados } from '@/servicos/buscar';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { SubModuloProps } from '@/lib/submodulo.type';

export default function IncluirSubModulo() {
  const [id_planejamento, setIdPlanejamento]       = useState<string | null>(null);
  const [nome_planejamento, setNomePlanejamento]   = useState<string>('');
  const [id_submodulo, setIdSubmodulo]             = useState<string>('');
  const [nome_submodulo, setNomeSubModulo]         = useState<string>('');
  const [id_sistema, setIdSistema]                 = useState<string>('');
  const [id_modulo, setidModulo]                   = useState<string>('');
  const [sistema, setSistema]                      = useState<SistemaProps[]>([]);
  const [modulo, setModulo]                        = useState<ModuloProps[]>([]);
  const [submodulo, setSubModulo]                  = useState<SubModuloProps[]>([]);
  const router = useRouter();

    useEffect (() => {
      const cookies = document.cookie
        .split('; ')
        .find(row => row.startsWith('id_planejamento'))
        ?.split('=')[1]
        setIdPlanejamento(cookies || null);

        if(cookies){
          detalharSubmodulo(cookies)
        }
    }, [])
    
    async function detalharSubmodulo(id_submodulo: string){
      const token = await getCookieServer();
      try {
        const { data } = await api.get(`/detalharplanejamento/${id_planejamento}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }        
        });
  
        if (data) {
          setIdPlanejamento(data.id_planejamento || "")
          setIdSubmodulo(data.id_submodulo || "");
          setIdSistema(data.id_sistema || "")
          setidModulo(data.id_modulo || "")
        } else {
          toast.warn("Nenhum Submodulo encontrada para o ID fornecido.");
        }
      } catch (err) {
        toast.error("Erro ao buscar os dados do Planejamento.");
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

    const selecionarSubModulo = async () => {
      const filtros = {
        status: true,
        id_modulo,
      };
      const submodulo = await buscaDados('/listarsubmodulo', filtros);
      setSubModulo(submodulo);
    };

    useEffect(() => {
      selecionarSubModulo();
    }, [id_modulo]);

    const btnCancelar = () => {
      document.cookie = "id_planejamento=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      setIdPlanejamento(null);
      router.push('../../cadastros/planejamentos');
    };   
  return (
    <>
      <Header />
      <main className={estiloGlobal.dados}>
       <div className={estiloGlobal.titulo}>
          <h1>Incluir Planejamento</h1>
       </div>

       <div className={estiloGlobal.barraFuncoes}>
          <div>
            <button className={`${estiloGlobal.btn} ${estiloGlobal.incluir}`} onClick={btngravar}>Gravar</button>
            <button className={`${estiloGlobal.btn} ${estiloGlobal.excluir}`} onClick={btnCancelar}>Cancelar</button>
          </div>
       </div>

       <form className={`${estiloGlobal.formCadastro} ${estiloGlobal.gridCadastros}`}>
          <table >
            <tbody>
            <tr>
              <td colSpan={3} className={estiloGlobal.cabecalhoFormCadastro}><
                h4>Escolha os dados do planejamento</h4>
              </td>
            </tr>
            <tr>
              <td>
                <select 
                  required
                  className={estiloLocal.inputPesquisaSelectForm}
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

                <td>
                <select 
                  required
                  className={estiloLocal.inputPesquisaSelectForm}
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

                <td>
                <select 
                  required
                  className={estiloLocal.inputPesquisaSelectForm}
                  name='id_submodulo'
                  value={id_submodulo}
                  onChange={(e) => {setIdSubmodulo(e.target.value)}}
                  >
                  <option value="" disabled>
                    Selecione um SubModulo
                  </option>
                  {submodulo.map ( (item) => (
                    <option key={item.id_submodulo} value={item.id_submodulo}>
                      {item.nome_submodulo}
                    </option>
                  ))}
                </select>

              </td>
            </tr>

            <tr>
              <td colSpan={3}>
                <input 
                  required
                  type="text"  
                  className={estiloLocal.inputPlanejamento} 
                  placeholder='Nome do Planejamento'
                  value={nome_planejamento}
                  onChange={(e) => {setNomePlanejamento(e.target.value)}}/>
              </td>
            </tr>

            <tr>
              <td colSpan={3} className={estiloGlobal.cabecalhoFormCadastro}>
                <h4>Etapas do Planejamento</h4>
              </td>
            </tr>
            <tr>
              <td>
                <input 
                  type="checkbox"  
                  className='' 
                  name='modulo_novo'
                  value={nome_planejamento}
                  onChange={(e) => {setNomePlanejamento(e.target.value)}}
                  />
                  <label>Modulo Novo?</label>
              </td>
              <td>
                  <input 
                  type="checkbox"  
                  className='' 
                  name='modulo_novo'
                  value={nome_planejamento}
                  onChange={(e) => {setNomePlanejamento(e.target.value)}}
                  />
                  <label>Elicitação</label>
              </td>

              <td>
                  <input 
                  type="checkbox"  
                  className='' 
                  name='modulo_novo'
                  value={nome_planejamento}
                  onChange={(e) => {setNomePlanejamento(e.target.value)}}
                  />
                  <label>Roteiro</label>
              </td>
              </tr>
              <tr>
              <td>
                  <input 
                  type="checkbox"  
                  className='' 
                  name='modulo_novo'
                  value={nome_planejamento}
                  onChange={(e) => {setNomePlanejamento(e.target.value)}}
                  />
                  <label>Video</label>
              </td>
              <td>
                  <input 
                  type="checkbox"  
                  className='' 
                  name='modulo_novo'
                  value={nome_planejamento}
                  onChange={(e) => {setNomePlanejamento(e.target.value)}}
                  />
                  <label>Validação</label>
              </td>

              <td>
                  <input 
                  type="checkbox"  
                  className='' 
                  name='modulo_novo'
                  value={nome_planejamento}
                  onChange={(e) => {setNomePlanejamento(e.target.value)}}
                  />
                  <label>Finalizado</label>
              </td>
            </tr>

            <tr>
              <td colSpan={3} className={estiloGlobal.cabecalhoFormCadastro}>
                <h4>Proposta</h4>
              </td>
            </tr>
            <tr>
            <td colSpan={3}>
            <textarea
              required
              className={estiloLocal.inputPlanejamento}
              placeholder="Proposta"
              value={nome_planejamento}
              onChange={(e) => setNomePlanejamento(e.target.value)}
              style={{ resize: 'vertical', width: '100%', height: '100px' }}
            />
              </td>             
            </tr>

            <tr>
              <td colSpan={3} className={estiloGlobal.cabecalhoFormCadastro}>
                <h4>Impedimentos</h4>
              </td>
            </tr>
            <tr>
            <td colSpan={3}>
            <textarea
              required
              className={estiloLocal.inputPlanejamento}
              placeholder="Impedimentos"
              value={nome_planejamento}
              onChange={(e) => setNomePlanejamento(e.target.value)}
              style={{ resize: 'vertical', width: '100%', height: '100px'}}
            />
              </td>             
            </tr>

            <tr>
              <td colSpan={3} className={estiloGlobal.cabecalhoFormCadastro}>
                <h4>Observação Final</h4>
              </td>
            </tr>
            <tr>
            <td colSpan={3}>
            <textarea
              required
              className={estiloLocal.inputPlanejamento}
              placeholder="Observação Final"
              value={nome_planejamento}
              onChange={(e) => setNomePlanejamento(e.target.value)}
              style={{ resize: 'vertical', width: '100%', height: '100px' }}
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

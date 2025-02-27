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
import { QuestaoProps } from '@/lib/questao.type';

export default function IncluirProvas() {
  const [id_prova, setIdprova]                           = useState<string | null>(null);
  const [nome_prova, setNomeProva]                       = useState<string>('');
  const [id_submodulo, setIdSubmodulo]                   = useState<string>('');
  const [id_sistema, setIdSistema]                       = useState<string>('');
  const [id_modulo, setidModulo]                         = useState<string>('');
  const [id_questao, setIdQuestao]                       = useState<string>('');
  const [id_questaoSelecionada, setIdQuestaoSelecionada] = useState<string | null>('');
  const [sistema, setSistema]                            = useState<SistemaProps[]>([]);
  const [modulo, setModulo]                              = useState<ModuloProps[]>([]);
  const [submodulo, setSubModulo]                        = useState<SubModuloProps[]>([]);
  const [questoesSemProva, setQuestoesSemProva]          = useState<QuestaoProps[]>([])
  const [questoesDessaProva, setQuestoesDessarova]       = useState<QuestaoProps[]>([])
  const router                                           = useRouter();

    useEffect (() => {
      const cookies = document.cookie
        .split('; ')
        .find(row => row.startsWith('id_prova='))
        ?.split('=')[1]
        setIdprova(cookies || null);

        if(cookies){
          detalharprova(cookies)
          selecionarQuestaoDessaProva(cookies)
        }
    }, [])
    
    async function detalharprova(id_prova: string){
      const token = await getCookieServer();
      try {
        const { data } = await api.get(`/detalharprova/${id_prova}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }        
        });
  
        if (data) {
          setIdprova(data.id_prova || "")
          setNomeProva(data.nome_prova || "");
          setIdSubmodulo(data.id_submodulo || "");
          setIdSistema(data.id_sistema || "")
          setidModulo(data.id_modulo || "")
        } else {
          toast.warn("Nenhum Prova encontrada para o ID fornecido.");
        }
      } catch (err) {
        toast.error("Erro ao buscar os dados dacprova.");
        console.error(err);
      }
    }

    async function btngravar(){
        if(!nome_prova || !id_sistema || !id_modulo || !id_submodulo){
          toast("Dados do cabeçalho devem ser informados")
          return
        }
        if(!id_prova){
          const token = await getCookieServer();
          try {
             await api.post(
              "/criarprova",
              { 
                nome_prova,
                id_sistema,
                id_modulo,
                id_submodulo,},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            toast.success("Gravado com sucesso.");
            router.push("../../cadastros/provas");
          } catch {
            console.error
          }
        }else {
        try {
          const token = await getCookieServer();
          await api.put(
            "/atualizarprova",
            { id_prova,
              nome_prova,
              id_sistema,
              id_modulo,
              id_submodulo,},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          toast.success("Gravado com sucesso.");
          router.push("../../cadastros/provas");
        } catch (err: any) {console.error
          throw new Error('Erro ao atualizar Prova')
          
        }        
        }
      }

      async function btnIncluirQuestao() {
        
      if(!nome_prova || !id_sistema || !id_modulo || !id_submodulo){
        toast.info("Dados do cabeçalho devem ser informados")
        return
      }

      try {
        const token = await getCookieServer();
        if(!id_prova){
          
          try {
            const response = await api.post(
              "/criarprova",
              { 
                nome_prova,
                id_sistema,
                id_modulo,
                id_submodulo,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setIdprova(response.data.id_prova)
            toast.success("Gravado com sucesso.");
          } catch {
            console.error
          }
        }

        if(id_questaoSelecionada){
          try {
            await api.put(
              "/incluirquestaonaprova",{
                id_prova : id_prova,
                id_questao : id_questaoSelecionada
              },{
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            toast.success('Item Incluido')
          } catch (error) {
            
          }
        }
        selecionarQuestaoDessaProva(String(id_prova))
        selecionarQuestaoSemProva()
        setIdQuestaoSelecionada('')
      } catch (error) {
        toast('Erro ao gravar Prova')
      }
      }

      
      async function btnExcluirItem(id_questao : string) {
        try {
          const token = await getCookieServer();
          await api.put(
            "/excluirquestaonaprova",{
              id_questao : id_questao
            },{
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          toast.success('Item Excluido')
          selecionarQuestaoDessaProva(String(id_prova))
          selecionarQuestaoSemProva();
        } catch (error) {
          console.error(error)
          throw new Error('Erro ao excluir item')
        }

      }
    const selecionarQuestaoSemProva = async () => {
      const filtros = {
        status: true,
      };
      const QuestaoSemProva = await buscaDados('/listarquestaosemprova', filtros);
      setQuestoesSemProva(QuestaoSemProva);
    };
  
    useEffect(() => {
      selecionarQuestaoSemProva();
    }, []);

    const selecionarQuestaoDessaProva = async (id_prova: string) => {
      const filtros = {
        id_prova: Number(id_prova),
      };
      const QuestaoDessaProva = await buscaDados('/listarquestao', filtros);
      setQuestoesDessarova(QuestaoDessaProva);
    };

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
      document.cookie = "id_prova=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      setIdprova(null);
      router.push('../../cadastros/provas');
    };   
  return (
    <>
      <Header />
      <main className={estiloGlobal.dados}>
       <div className={estiloGlobal.titulo}>
          <h1>Incluir Prova</h1>
       </div>

       <div className={estiloGlobal.barraFuncoes}>
          <div>
            <button className={`${estiloGlobal.btn} ${estiloGlobal.incluir}`} onClick={btngravar}>Gravar</button>
            <button className={`${estiloGlobal.btn} ${estiloGlobal.excluir}`} onClick={btnCancelar}>Cancelar</button>
          </div>
       </div>

       <form className={`${estiloGlobal.formCadastro} ${estiloGlobal.gridCadastros}`}>
          <div>
              <div>                
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
              </div>
              
              <div>
                <input 
                  required
                  type="text"  
                  className={estiloLocal.inputPlanejamento} 
                  placeholder='Nome da prova'
                  value={nome_prova}
                  onChange={(e) => {setNomeProva(e.target.value)}}
                />
              </div>
              
          </div>
       </form>

       <div className={estiloGlobal.barraFuncoes}>
        <div>
          <select className={estiloLocal.inputPesquisaSelectForm}
          value={String(id_questaoSelecionada)}
          onChange={(e) => setIdQuestaoSelecionada(e.target.value)}
          style={{maxWidth: '330px'}}
          >
            <option value='' disabled>Selecione a questão</option>
            {
              questoesSemProva.map ( (item) => (
                <option 
                value={item.id_questao} 
                key={item.id_questao}
                >
                  {item.questoes.length > 100 ? `${item.questoes.slice(0, 100)}...` : item.questoes}
                </option>
              ))
            }
          </select>
          <button className={`${estiloGlobal.btn} ${estiloGlobal.incluir}`} onClick={btnIncluirQuestao}>
            Incluir Questão
          </button>          
        </div>
      </div>

       <section className={estiloGlobal.grid} >
          <table>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nome</th>
                <th scope="col">Sistema</th>
                <th scope="col">Modulo</th>
                <th scope="col">Submodulo</th>
                <th scope="col" className="acoes">Ações</th>
              </tr>
            </thead>
            <tbody>
              {
                questoesDessaProva.map( (item) => (
                  <tr className={estiloGlobal.griditens} key={item.id_questao} >
                  <td data-label="Nome">{item.id_questao}</td>
                  <td data-label="Questão">
                    {item.questoes.length > 100 ? `${item.questoes.slice(0, 100)}...` : item.questoes}
                  </td>
                  <td data-label="Versão Gestores">{item.nome_sistema}</td>
                  <td data-label="Versão GestorPDV">{item.nome_modulo}</td>
                  <td data-label="Versão SincData">{item.nome_submodulo}</td>
                  <td>
                    <button 
                        className={`${estiloGlobal.btn} ${estiloGlobal.excluir}`} 
                        onClick={() => btnExcluirItem(String(item.id_questao))}
                        
                        >{"Excluir"}
                    </button>
                  </td>
                  </tr>
                ))
              }

            </tbody>
          </table>
        </section> 
      </main>
    </>
  );
}

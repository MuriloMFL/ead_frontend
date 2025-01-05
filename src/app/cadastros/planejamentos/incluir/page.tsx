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
import useUserInfo from '@/servicos/useUserInfo';

export default function IncluirPLanejamento() {
  const [id_planejamento, setIdPlanejamento]       = useState<string | null>(null);
  const [nome_planejamento, setNomePlanejamento]   = useState<string>('');
  const [id_submodulo, setIdSubmodulo]             = useState<string>('');
  const [id_sistema, setIdSistema]                 = useState<string>('');
  const [id_modulo, setidModulo]                   = useState<string>('');
  const [sistema, setSistema]                      = useState<SistemaProps[]>([]);
  const [modulo, setModulo]                        = useState<ModuloProps[]>([]);
  const [submodulo, setSubModulo]                  = useState<SubModuloProps[]>([]);
  const [id_usuario, setIDUsuario]                 = useState<string | null>('');
  const [modulo_novo,setModuloNovo]                = useState<boolean>(false);
  const [previsao_inicio,setPrevisaoInicio]        = useState<string>('');
  const [previsao_fim,setPrevisaoFim]              = useState<string>('');
  const [etapa_elicitacao,setEtapaElicitacao]      = useState<boolean>(false);
  const [etapa_roteiro,setEtapaRoteiro]            = useState<boolean>(false);
  const [etapa_video,setEtapaVideo]                = useState<boolean>(false);
  const [etapa_validacao,setEtapaValidacao]        = useState<boolean>(false);
  const [etapa_finalizado,setEtapaFinalizado]      = useState<boolean>(false);
  const [proposta,setProposta]                     = useState<string>();
  const [roteiro,setRoteiro]                       = useState<string>('.');
  const [impedimentos,setImpedimentos]             = useState<string>();
  const [observacoes,setObservacao]                = useState<string>();
  const router                                     = useRouter();
  const informacao_usuario                         = useUserInfo();

  useEffect(() => {
    if (informacao_usuario?.id_usuario) {
      setIDUsuario(String(informacao_usuario.id_usuario) ?? null);
    }
  }, [informacao_usuario]);

    useEffect (() => {
      const cookies = document.cookie
        .split('; ')
        .find(row => row.startsWith('id_planejamento='))
        ?.split('=')[1]
        setIdPlanejamento(cookies || null);

        if(cookies){
          detalharplanejamento(cookies)
        }
    }, [])
    
    async function detalharplanejamento(id_planejamento: string){
      const token = await getCookieServer();
      try {
        const { data } = await api.get(`/detalharplanejamento/${id_planejamento}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }        
        });
  
        if (data) {
          setIdPlanejamento(data.id_planejamento || "")
          setNomePlanejamento(data.nome_planejamento || "");
          setIdSubmodulo(data.id_submodulo || "");
          setIdSistema(data.id_sistema || "")
          setidModulo(data.id_modulo || "")
          setIDUsuario(data.id_usuario || "")
          setModuloNovo(data.modulo_novo || "")
          setPrevisaoInicio(data.previsao_inicio ? data.previsao_inicio.split("T")[0] : "");
          setPrevisaoFim(data.previsao_fim ? data.previsao_fim.split("T")[0] : "");
          setEtapaElicitacao(data.etapa_elicitacao || "")
          setEtapaRoteiro(data.etapa_roteiro || "")
          setEtapaVideo(data.etapa_video || "")
          setEtapaValidacao(data.etapa_validacao || "")
          setEtapaFinalizado(data.etapa_finalizado || "")
          setProposta(data.proposta || "")
          setRoteiro(data.roteiro || "")
          setImpedimentos(data.impedimentos || "")
          setObservacao(data.observacoes || "")
        } else {
          toast.warn("Nenhum dado encontrada para o ID fornecido.");
        }
      } catch (err) {
        toast.error("Erro ao buscar os dados do Planejamento.");
        console.error(err);
      }
    }

    async function btngravar(){
        if(!id_planejamento){
          const token = await getCookieServer();
          try {
            await api.post(
              "/criarplanejamento",
              { 
                nome_planejamento,
                id_sistema,
                id_modulo,
                id_submodulo,
                id_usuario,
                modulo_novo,
                previsao_inicio,
                previsao_fim,
                etapa_elicitacao,
                etapa_roteiro,
                etapa_video,
                etapa_validacao,
                etapa_finalizado,
                proposta,
                roteiro,
                impedimentos,
                observacoes},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            toast.success("Gravado com sucesso.");
            router.push("../../cadastros/planejamentos");
          } catch {
            console.error
          }
        }else {
        try {
          const token = await getCookieServer();
          await api.put(
            "/atualizarplanejamento",
            { id_planejamento,
              nome_planejamento,
              id_sistema,
              id_modulo,
              id_submodulo,
              id_usuario,
              modulo_novo,
              previsao_inicio,
              previsao_fim,
              etapa_elicitacao,
              etapa_roteiro,
              etapa_video,
              etapa_validacao,
              etapa_finalizado,
              proposta,
              roteiro,
              impedimentos,
              observacoes},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          toast.success("Gravado com sucesso.");
          router.push("../../cadastros/planejamentos");
        } catch (err: any) {console.error
          throw new Error('Erro ao atualizar Planejamento')
          
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
            <button className={`${estiloGlobal.btn} ${estiloGlobal.imprimir}`} onClick={() => window.print()}>Imprimir</button>
          </div>
       </div>

       <form className={`${estiloGlobal.formCadastro} ${estiloGlobal.gridCadastros}`}>
          <div>
              <div>
                <div className={estiloGlobal.cabecalhoFormCadastro}>
                <h4>Escolha os dados do planejamento</h4>
                </div>
                
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
                  placeholder='Nome do Planejamento'
                  value={nome_planejamento}
                  onChange={(e) => {setNomePlanejamento(e.target.value)}}
                />
              </div>

              <div className={estiloGlobal.cabecalhoFormCadastro}>
                <h4>Previsão de inicio e Fim</h4>
              </div>

              <div className={estiloGlobal.checks}>
                <div>
                  <label>Previsão de Inicio: </label>
                  <input 
                      type='date'
                      name='data-inicio'
                      className={estiloGlobal.inputPesquisa}
                      value={String(previsao_inicio)}
                      onChange={(e) => setPrevisaoInicio(e.target.value) }
                    />
                </div>
                <div>
                <label>Previsão de entrega: </label>
                <input 
                    type='date'
                    name='data-previsao'
                    className={estiloGlobal.inputPesquisa}
                    value={String(previsao_fim)}
                    onChange={(e) => setPrevisaoFim(e.target.value) }
                  />
              </div>
                </div>


              <div className={estiloGlobal.cabecalhoFormCadastro}>
                <h4>Etapas do Planejamento</h4>
              </div>

              <div className={estiloGlobal.checks}>
                <div>
                  <input 
                    type="checkbox"  
                    className='' 
                    name='modulo_novo'
                    checked={modulo_novo}
                    onChange={(e) => {setModuloNovo(e.target.checked)}}
                  />
                  <label> Modulo Novo?  </label>
                </div>

                <div>
                  <input 
                    type="checkbox"  
                    className='' 
                    name='etapa_elicitacao'
                    checked={etapa_elicitacao}
                    onChange={(e) => {setEtapaElicitacao(e.target.checked)}}
                  />
                  <label> Elicitação </label>
                </div>

                <div>
                  <input 
                    type="checkbox"  
                    className='' 
                    name='etapa_roteiro'
                    checked={etapa_roteiro}
                    onChange={(e) => {setEtapaRoteiro(e.target.checked)}}
                  />
                  <label> Roteiro </label>
                </div>

                <div>
                  <input 
                    type="checkbox"  
                    className='' 
                    name='etapa_video'
                    checked={etapa_video}
                    onChange={(e) => {setEtapaVideo(e.target.checked)}}
                  />
                  <label>Video</label>
                </div>

                <div>
                  <input 
                    type="checkbox"  
                    className='' 
                    name='etapa_validacao'
                    checked={etapa_validacao}
                    onChange={(e) => {setEtapaValidacao(e.target.checked)}}
                  />
                  <label>Validação</label>
                </div>

                <div>
                  <input 
                    type="checkbox"  
                    className='' 
                    name='etapa_finalizado'
                    checked={etapa_finalizado}
                    onChange={(e) => {setEtapaFinalizado(e.target.checked)}}
                  />
                  <label>Finalizado</label>
                </div>
             </div>

            <div className={estiloGlobal.cabecalhoFormCadastro}>
              <h4>Proposta</h4>
            </div>

            <textarea
              required
              className={estiloLocal.inputPlanejamento}
              placeholder="Proposta"
              value={proposta}
              onChange={(e) => setProposta(e.target.value)}
              style={{ resize: 'vertical', width: '100%', height: '100px' }}
            />

            <div className={estiloGlobal.cabecalhoFormCadastro}>
              <h4>Impedimentos</h4>
            </div>

            <textarea
              required
              className={estiloLocal.inputPlanejamento}
              placeholder="Impedimentos"
              value={impedimentos}
              onChange={(e) => setImpedimentos(e.target.value)}
              style={{ resize: 'vertical', width: '100%', height: '100px'}}
            />

            <div className={estiloGlobal.cabecalhoFormCadastro}>
              <h4>Observação Final</h4>
            </div>

            <textarea
              required
              className={estiloLocal.inputPlanejamento}
              placeholder="Observação Final"
              value={observacoes}
              onChange={(e) => setObservacao(e.target.value)}
              style={{ resize: 'vertical', width: '100%', height: '100px' }}
            />

          </div>
       </form>

      </main>
    </>
  );
}

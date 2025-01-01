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

export default function IncluirQuestao() {
  const [id_questao, setIdQuestao]                 = useState<string | null>(null);
  const [questao, setNomeQuestao]                  = useState<string>('');
  const [alternativa_A, setAlternativaA]           = useState<string>('');
  const [alternativa_B, setAlternativaB]           = useState<string>('');
  const [alternativa_C, setAlternativaC]           = useState<string>('');
  const [alternativa_D, setAlternativaD]           = useState<string>('');
  const [correta, setCorreta]                      = useState<string>('A');
  const [observacao, setObservacao]                = useState<string>('');
  const [order, setOrder]                          = useState<string>('');
  const [id_submodulo, setIdSubmodulo]             = useState<string>('');
  const [id_sistema, setIdSistema]                 = useState<string>('');
  const [id_modulo, setidModulo]                   = useState<string>('');
  const [sistema, setSistema]                      = useState<SistemaProps[]>([]);
  const [modulo, setModulo]                        = useState<ModuloProps[]>([]);
  const [submodulo, setSubModulo]                  = useState<SubModuloProps[]>([]);
  const router = useRouter();

  useEffect(() => {
    const cookies = document.cookie
        .split('; ')
        .find(row => row.startsWith('id_questao='))
        ?.split('=')[1];

    if (cookies) {
        detalharquestao(cookies);
        setIdQuestao(cookies);
    } else {
        setIdQuestao(null);
    }
    }, []);


    async function detalharquestao(id_questao: string){
      const token = await getCookieServer();
      try {
        const { data } = await api.get(`/detalharquestao/${id_questao}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }        
        });
  
        if (data) {
          setIdQuestao(data.id_questao || "")
          setIdSubmodulo(data.id_submodulo || "");
          setIdSistema(data.id_sistema || "")
          setidModulo(data.id_modulo || "")
          setNomeQuestao(data.questao || "")
          setAlternativaA(data.alternativa_A || "")
          setAlternativaB(data.alternativa_B || "")
          setAlternativaC(data.alternativa_C || "")
          setAlternativaD(data.alternativa_D || "")
          setCorreta(data.correta || "")
          setObservacao(data.observacao || "")
        } else {
          toast.warn("Nenhuma Questão encontrada para o ID fornecido.");
        }
      } catch (err) {
        toast.error("Erro ao buscar os dados.");
        console.error(err);
      }
    }

    async function btngravar(){
        
        if(!id_questao){
          const token = await getCookieServer();
          try {
            await api.post(
              "/criarquestoes",
              { id_sistema, 
                id_modulo, 
                id_submodulo, 
                questao, 
                alternativa_A, 
                alternativa_B, 
                alternativa_C, 
                alternativa_D,
                correta,
                observacao},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            toast.success("Gravado com sucesso.");
            router.push("../../cadastros/questoes");
          } catch {
            toast.error("Erro ao incluir.");
            new Error('Erro');
          }
        }else {
        try {
          const token = await getCookieServer();
          await api.put(
            "/atualizarquestao",
            { id_questao,
              id_sistema, 
              id_modulo, 
              id_submodulo, 
              questao, 
              alternativa_A, 
              alternativa_B, 
              alternativa_C, 
              alternativa_D,
              correta,
              observacao},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          toast.success("Atualizado com sucesso. ");
          router.push("../../cadastros/questoes");
        } catch (err: any) {
          
          const errorMessage =
            err.response?.data?.message ||
            err.response?.statusText ||   
            err.message ||               
            "Erro ao Atualizar.";        

          toast.error(`Erro ao atualizar: ${errorMessage}`);
          
          console.error("Erro detalhado:", err);

          throw new Error(errorMessage);
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
      document.cookie = "id_questao=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      setIdQuestao(null);
      router.push('../../cadastros/questoes');
    };   
  return (
    <>
      <Header />
      <main className={estiloGlobal.dados}>
       <div className={estiloGlobal.titulo}>
          <h1>Incluir Questão</h1>
       </div>

       <div className={estiloGlobal.barraFuncoes}>
          <div>
            <button className={`${estiloGlobal.btn} ${estiloGlobal.incluir}`} onClick={btngravar}>Gravar</button>
            <button className={`${estiloGlobal.btn} ${estiloGlobal.excluir}`} onClick={btnCancelar}>Cancelar</button>
          </div>
       </div>

       <form className={estiloGlobal.formCadastro}>
          <div>
              <div>
              <h4>Escolha o sistema e modulo: </h4>
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
                
                <select 
                  required
                  className={estiloGlobal.inputPesquisaSelectForm}
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
                <h4>Pergunta*: </h4>
                <textarea 
                    required
                    className={estiloGlobal.inputPesquisa} 
                    placeholder='Digite a Pergunta'
                    value={questao}
                    onChange={(e) => {setNomeQuestao(e.target.value)}}
                    style={{ resize: 'vertical', width: '100%', height: '100px' }}
                />
              </div>
              <div>
                <h4>Alternativa A*: </h4>
                <textarea 
                    required
                    className={estiloGlobal.inputPesquisa} 
                    placeholder='Digite a alternativa A'
                    value={alternativa_A}
                    onChange={(e) => {setAlternativaA(e.target.value)}}
                    style={{ resize: 'vertical', width: '100%', height: '100px' }}
                />
              </div>
              <div>
                <h4>Alternativa B*: </h4>
                <textarea 
                    required
                    className={estiloGlobal.inputPesquisa} 
                    placeholder='Digite a alternativa B'
                    value={alternativa_B}
                    onChange={(e) => {setAlternativaB(e.target.value)}}
                    style={{ resize: 'vertical', width: '100%', height: '100px' }}
                />
              </div>
              <div>
                <h4>Alternativa C: </h4>
                <textarea 
                    required
                    className={estiloGlobal.inputPesquisa} 
                    placeholder='Digite a alternativa C'
                    value={alternativa_C}
                    onChange={(e) => {setAlternativaC(e.target.value)}}
                    style={{ resize: 'vertical', width: '100%', height: '100px' }}
                />
              </div>
              <div>
                <h4>Alternativa D: </h4>
                <textarea 
                    required
                    className={estiloGlobal.inputPesquisa} 
                    placeholder='Digite a alternativa D'
                    value={alternativa_D}
                    onChange={(e) => {setAlternativaD(e.target.value)}}
                    style={{ resize: 'vertical', width: '100%', height: '100px' }}
                />
              </div>
              <div>
                <h4>Correta?</h4>
                <select 
                  className={estiloGlobal.inputPesquisaSelect}
                  value={correta}
                  onChange={(e) => {setCorreta(e.target.value)}}
                >
                  <option value='A'>A</option>
                  <option value='B'>B</option>
                  <option value='C'>C</option>
                  <option value='D'>D</option>
                </select>
              </div>
              <div>
                <h4>Observação: </h4>
                <textarea 
                    required
                    className={estiloGlobal.inputPesquisa} 
                    placeholder='Digite a Observação'
                    value={observacao}
                    onChange={(e) => {setObservacao(e.target.value)}}
                    style={{ resize: 'vertical', width: '100%', height: '100px' }}
                />
              </div>
          </div>
       </form>

      </main>
    </>
  );
}

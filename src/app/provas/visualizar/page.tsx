"use client"
import estiloGlobal from '../../page.module.scss'
import estiloLocal  from './page.module.scss'
import { Header } from '@/app/dashboard/componentes/header';
import { api } from '@/servicos/api';
import { getCookieServer } from '@/lib/cookieServidor';
import { useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import useUserInfo from '@/servicos/useUserInfo';
import { QuestaoProps } from '@/lib/questao.type';
import { buscaDados } from '@/servicos/buscar';

export default function VisualizarProva(){
  const [id_prova, setIdProva]                     = useState<string | null>(null);
  const [id_usuario, setIdUsuario]                 = useState<string>('');
  const [id_franquia, setIdFranquia]               = useState<string>('');
  const [id_sistema, setIdSistema]                 = useState<string | null>(null);
  const [id_modulo, setIdModulo]                   = useState<string | null>(null);
  const [id_submodulo, setIdSubModulo]             = useState<string | null>(null);
  const [nome_prova, setNomeProva]                 = useState<string>('');

  const [id_questao, setIdQuestao]                  = useState<string[]>([])
  const [alternativaMarcada, setAlternativaMarcada] = useState<Record<string, string>>({});
  const [questao, setQuestao]                       = useState<QuestaoProps[]>([]);
  const informacao_usuario = useUserInfo();
  const router = useRouter();

    useEffect (() => {
      const cookies = document.cookie
        .split('; ')
        .find(row => row.startsWith('id_prova_visualizar='))
        ?.split('=')[1]
        setIdProva(cookies || null);
        if(cookies){
          detalharprova(cookies)
        }
    }, [])
    
    useEffect(() => {
      // Verifica quando informacao_usuario está disponível e atualiza os estados
      if (informacao_usuario?.id_usuario && informacao_usuario?.id_franquia) {
        setIdUsuario(String(informacao_usuario?.id_usuario));
        setIdFranquia(String(informacao_usuario?.id_franquia));
      }
    }, [informacao_usuario]);

    async function detalharprova(id_prova: string){
      const token = await getCookieServer();
      try {
        const { data } = await api.get(`/detalharprova/${id_prova}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }        
        });
  
        if (data) {
          setIdProva     (data.id_prova || "")
          setIdSistema   (data.id_sistema || "")
          setIdModulo    (data.id_modulo || "")
          setIdSubModulo (data.id_submodulo || "")
          setNomeProva   (data.nome_prova || "")
        } else {
          toast.warn("Nenhuma prova encontrada para o ID fornecido.");
        }

        } catch (err) {
        toast.error("Erro ao buscar os dados da Video.");
        console.error(err);
      }
    }

    try {
      const handlebuscar = async () => {
        const filtros = {
          status: true,
          id_prova: Number(id_prova),
        }
        
        const response = await buscaDados('/listarquestao', filtros)
        setQuestao(response)
      }
      
      useEffect(()=>{
        handlebuscar();
      },[id_prova]);

    } catch (error) {
      toast.warn("Nenhuma Questão encontrada para o ID fornecido.");
    }

    const handleSelecionarAlternativa = (idQuestao: string, alternativa: string) => {
      setAlternativaMarcada((prev) => ({
        ...prev,
        [idQuestao]: alternativa,
      }));
    };

    const btngravar = async () => {
      try {
        const token = await getCookieServer();
        // Itera sobre todas as questões e envia uma por uma
        for (const [idQuestao, alternativa] of Object.entries(alternativaMarcada)) {
          await api.post(
            "/criarmvquestao",
            { 
              id_sistema, 
              id_submodulo, 
              id_modulo, 
              id_usuario: id_usuario, 
              id_franquia: id_franquia, 
              id_prova: id_prova,
              id_questao: idQuestao,  
              alternativa_marcada: alternativa, 
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
      } catch (err: any) {
        console.error(err);
        toast.error("Erro ao atualizar Prova");
      }
    
      try {
        const token = await getCookieServer();
        await api.post(
          "/criarmvprova",
          { 
            id_sistema, 
            id_submodulo, 
            id_modulo, 
            id_usuario:   id_usuario, 
            id_franquia:  id_franquia, 
            id_prova:     id_prova,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Gravado com sucesso.");
        router.push("/provas");
      } catch (err) {
        console.error(err);
        toast.error("Erro ao atualizar MVProva");
      }
      router.push('/provas')
    };

    const btnCancelar = () => {
      document.cookie = "id_prova_visualizar=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      setIdProva(null);
      router.push('/provas');
    };   

  return (
    <>
      <Header />
      <main className={estiloGlobal.dados}>
       <div className={estiloGlobal.titulo}>
          <h1>{nome_prova}</h1>
       </div>

       <div className={estiloGlobal.barraFuncoes}>
          <div>
            <button className={`${estiloGlobal.btn} ${estiloGlobal.incluir}`} onClick={btngravar}>Gravar Prova</button>
            <button className={`${estiloGlobal.btn} ${estiloGlobal.excluir}`} onClick={btnCancelar}>Voltar</button>
          </div>
       </div>

       <div className={estiloGlobal.formCadastro}>
          {
            questao.map( (item) => (
              <div className={estiloGlobal.formCadastro} key={item.id_questao}>
                <h3>{item.questoes}</h3>
                <div>
                  <input 
                  type='radio' 
                  name={String(item.id_questao)}
                  value="A"
                  onChange={() => handleSelecionarAlternativa(String(item.id_questao), "A")}
                  checked={alternativaMarcada[item.id_questao] === "A"}                  
                  ></input>
                  <label style={{padding: 10}}>{item.alternativa_A}</label>
                </div>
                <div>
                  <input 
                  type='radio' 
                  name={String(item.id_questao)}
                  value="B"
                  onChange={() => handleSelecionarAlternativa(String(item.id_questao), "B")}
                  checked={alternativaMarcada[item.id_questao] === "B"} 
                  ></input>
                  <label style={{padding: 10}}>{item.alternativa_B}</label>
                </div>

                {item.alternativa_C && (
                <div>
                  <input 
                  type='radio' 
                  name={String(item.id_questao)}
                  value="C"
                  onChange={() => handleSelecionarAlternativa(String(item.id_questao), "C")}
                  checked={alternativaMarcada[item.id_questao] === "C"} 
                  ></input>
                  <label style={{padding: 10}}>{item.alternativa_C}</label>
                </div>
                )}
                {item.alternativa_D && (
                  <div>
                  <input 
                  type='radio' 
                  name={String(item.id_questao)}
                  value="D"
                  onChange={() => handleSelecionarAlternativa(String(item.id_questao), "D")}
                  checked={alternativaMarcada[item.id_questao] === "D"}                   
                  ></input>
                  <label style={{padding: 10}}>{item.alternativa_D}</label>
                </div>
                )}
              </div>
            ))
          }
       </div>
      </main>
    </>
  );
}

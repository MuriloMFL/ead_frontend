"use client"
import estiloGlobal from '../../page.module.scss'
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

  const [questao, setQuestao]                      = useState<QuestaoProps[]>([]);
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

    async function btngravar(){
      try {
        const token = await getCookieServer();
        await api.post(
          "/criarmvprova",
          { 
            id_sistema, 
            id_submodulo, 
            id_modulo, 
            id_usuario : id_usuario, 
            id_franquia : id_franquia, 
            id_prova
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Gravado com sucesso.");
        router.push("/provas");
      } catch (err: any) {
        console.error(err)
        throw new Error('Erro ao atualizar Prova')
      }        
    }

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
              <div className={estiloGlobal.formCadastro}>
                <h3>{item.questoes}</h3>
                <div>
                  <input type='radio' name={String(item.id_questao)}></input><p>{item.alternativa_A}</p>
                </div>
                <div>
                  <input type='radio' name={String(item.id_questao)}></input><p>{item.alternativa_B}</p>
                </div>

                {item.alternativa_C && (
                <div>
                  <input type='radio' name={String(item.id_questao)}></input><p>{item.alternativa_C}</p>
                </div>
                )}
                {item.alternativa_D && (
                  <div>
                  <input type='radio' name={String(item.id_questao)}></input><p>{item.alternativa_D}</p>
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

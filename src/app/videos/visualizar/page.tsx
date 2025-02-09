"use client"
import estiloGlobal from '../../page.module.scss'
import { Header } from '@/app/dashboard/componentes/header';
import { api } from '@/servicos/api';
import { getCookieServer } from '@/lib/cookieServidor';
import { useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import useUserInfo from '@/servicos/useUserInfo';

export default function IncluirVideo() {
  const [id_video, setIdVideo]                     = useState<string | null>(null);
  const [id_usuario, setIdUsuario]                 = useState<string>('');
  const [id_franquia, setIdFranquia]               = useState<string>('');
  const [id_sistema, setIdSistema]                 = useState<string | null>(null);
  const [id_modulo, setIdModulo]                   = useState<string | null>(null);
  const [id_submodulo, setIdSubModulo]             = useState<string | null>(null);
  const [nome_video, setNomeVideo]                 = useState<string>('');
  const [link, setLink]                            = useState<string>('');
  const [observacao, setObservacao]                = useState<string>('');
  const [finalizado, setFinalizado]                = useState<string>('');
  const informacao_usuario = useUserInfo();
  const router = useRouter();

    useEffect (() => {
      const cookies = document.cookie
        .split('; ')
        .find(row => row.startsWith('id_video_visualizar='))
        ?.split('=')[1]
        setIdVideo(cookies || null);
        if(cookies){
          detalharvideo(cookies)
        }
    }, [])

    useEffect(() => {
      // Verifica quando informacao_usuario está disponível e atualiza os estados
      if (informacao_usuario?.id_usuario && informacao_usuario?.id_franquia) {
        setIdUsuario(String(informacao_usuario?.id_usuario));
        setIdFranquia(String(informacao_usuario?.id_franquia));
      }
    }, [informacao_usuario]);

    async function detalharvideo(id_video: string){
      const token = await getCookieServer();      
      try {
        const { data } = await api.get(`/detalharvideo/${id_video}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }        
        });
  
        if (data) {
          setIdVideo     (data.id_video || "")
          setIdSistema   (data.id_sistema || "")
          setIdModulo    (data.id_modulo || "")
          setIdSubModulo (data.id_submodulo || "")
          setNomeVideo   (data.nome_video || "")
          setLink        (data.link || "")
          setObservacao  (data.observacao || "")
        } else {
          toast.warn("Nenhum Video encontrada para o ID fornecido.");
        }
      } catch (err) {
        toast.error("Erro ao buscar os dados da Video.");
        console.error(err);
      }
    }

    async function btngravar(){
      try {
        const token = await getCookieServer();
        await api.post(
          "/criarmvvideo",
          { 
            id_sistema, 
            id_submodulo, 
            id_modulo, 
            id_usuario : id_usuario, 
            id_franquia : id_franquia, 
            id_video
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Gravado com sucesso.");
        router.push("/videos");
      } catch (err: any) {
        console.error(err)
        throw new Error('Erro ao atualizar Video')
      }        
    }

    const btnCancelar = () => {
      document.cookie = "id_video_visualizar=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      setIdVideo(null);
      router.push('/videos');
    };   

    function transformarLink(link: string): string {
      if (link.includes("youtube.com/watch?v=")) {
        return link.replace("watch?v=", "embed/");
      } else if (link.includes("youtu.be/")) {
        return link.replace("youtu.be/", "youtube.com/embed/");
      }
      return link; 
    }

  return (
    <>
      <Header />
      <main className={estiloGlobal.dados}>
       <div className={estiloGlobal.titulo}>
          <h1>{nome_video}</h1>
       </div>

       <div className={estiloGlobal.barraFuncoes}>
          <div>
            <button className={`${estiloGlobal.btn} ${estiloGlobal.incluir}`} onClick={btngravar}>Marcar Como Visto</button>
            <button className={`${estiloGlobal.btn} ${estiloGlobal.excluir}`} onClick={btnCancelar}>Voltar</button>
          </div>
       </div>

       <form className={estiloGlobal.formCadastro}>
       {link ? (
        <iframe
          width="100%"
          height="650"
          src={transformarLink(link)}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Carregando vídeo...</p>
      )}

        <h4>Observações</h4>
        <textarea 
            className={estiloGlobal.inputPesquisa} 
            placeholder='Observações do Video'
            value={observacao}
            readOnly
            onChange={(e) => {setObservacao(e.target.value)}}
            style={{ resize: 'vertical', width: '100%', height: '150px'}}
        />
       </form>
      </main>
    </>
  );
}

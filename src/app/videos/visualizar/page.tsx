"use client"
import estiloGlobal from '../../page.module.scss'
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

export default function IncluirVideo() {
  const [id_video, setIdVideo]                     = useState<string | null>(null);
  const [nome_video, setNomeVideo]                 = useState<string>('');
  const [link, setLink]                            = useState<string>('');
  const [observacao, setObservacao]                = useState<string>('');
  const [order, setOrder]                          = useState<string>('0');
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
    
    async function detalharvideo(id_video: string){
      const token = await getCookieServer();
      try {
        const { data } = await api.get(`/detalharvideo/${id_video}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }        
        });
  
        if (data) {
          setIdVideo(data.id_video || "")
          setNomeVideo(data.nome_video || "")
          setLink(data.link || "")
          setObservacao(data.observacao || "")
        } else {
          toast.warn("Nenhum Video encontrada para o ID fornecido.");
        }
      } catch (err) {
        toast.error("Erro ao buscar os dados da Video.");
        console.error(err);
      }
    }

    async function btngravar(){
        
        if(!id_video){
          const token = await getCookieServer();
          try {
            await api.post(
              "/criarvideo",
              { nome_video, link, observacao, order },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            toast.success("Gravado com sucesso.");
            router.push("../../cadastros/videos");
          } catch {
            new Error('Erro');
          }
        }else {
        try {
          const token = await getCookieServer();
          await api.put(
            "/atualizarvideo",
            { nome_video, link, observacao, order},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          toast.success("Gravado com sucesso.");
          router.push("../../cadastros/videos");
        } catch (err: any) {
          throw new Error('Erro ao atualizar Video')
        }        
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
      }
      return link; // Se o link já estiver no formato correto, retorna inalterado
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
            <button className={`${estiloGlobal.btn} ${estiloGlobal.incluir}`} onClick={btngravar}>Gravar</button>
            <button className={`${estiloGlobal.btn} ${estiloGlobal.excluir}`} onClick={btnCancelar}>Cancelar</button>
          </div>
       </div>

       <form className={estiloGlobal.formCadastro}>
       <iframe
          width="100%"
          height="600"
          src={link ? transformarLink(link) : ""}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <h4>Observações</h4>
        <textarea 
            required
            className={estiloGlobal.inputPesquisa} 
            placeholder='Observações do Video'
            value={observacao}
            onChange={(e) => {setObservacao(e.target.value)}}
            style={{ resize: 'vertical', width: '100%', height: '100px'}}
        />

       </form>

      </main>
    </>
  );
}

"use client"
import estiloGlobal from '../../page.module.scss'
import { Header } from '@/app/dashboard/componentes/header';
import { api } from '@/servicos/api';
import { getCookieServer } from '@/lib/cookieServidor';
import React ,{ useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import useUserInfo from '@/servicos/useUserInfo';


export default function VisualizarFaq() {
  const [id_faq, setIdFaq]                         = useState<string | null>(null);
  const [id_usuario, setIdUsuario]                 = useState<string>('');
  const [id_franquia, setIdFranquia]               = useState<string>('');
  const [id_sistema, setIdSistema]                 = useState<string | null>(null);
  const [id_modulo, setIdModulo]                   = useState<string | null>(null);
  const [id_submodulo, setIdSubModulo]             = useState<string | null>(null);
  const [nome_faq, setNomeFaq]                     = useState<string>('');
  const [link, setLink]                            = useState<string>('');
  const [observacao, setObservacao]                = useState<string>('');
  const informacao_usuario = useUserInfo();
  const router = useRouter();

    useEffect (() => {
      const cookies = document.cookie
        .split('; ')
        .find(row => row.startsWith('id_faq_visualizar='))
        ?.split('=')[1]
        setIdFaq(cookies || null);
        if(cookies){
          detalharFaq(cookies)
        }
    }, [])
    
    useEffect(() => {
      if (informacao_usuario?.id_usuario && informacao_usuario?.id_franquia) {
        setIdUsuario(String(informacao_usuario?.id_usuario));
        setIdFranquia(String(informacao_usuario?.id_franquia));
      }
    }, [informacao_usuario]);

    async function detalharFaq(id_faq: string) {
      const token = await getCookieServer();
      try {
        const { data } = await api.get(`/detalharfaq/${id_faq}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (data) {
          setNomeFaq(data.nome_faq || '');
          setLink(data.link || '');
          setIdSistema(data.id_sistema || '');
          setIdModulo(data.id_modulo || '');
          setIdSubModulo(data.id_submodulo || '');
          
        } else {
          toast.warn('Nenhum dado encontrado para o ID fornecido.');
        }
      } catch (err) {
        toast.error('Erro ao buscar os dados da FAQ.');
        console.error(err);
      }
    }

    async function btngravar(){
      try {
        const token = await getCookieServer();
        await api.post(
          "/criarmvfaq",
          { 
            id_sistema   : Number(id_sistema), 
            id_submodulo : Number(id_submodulo), 
            id_modulo    : Number(id_modulo), 
            id_usuario   : Number(id_usuario), 
            id_franquia  : Number(id_franquia), 
            id_faq       : Number(id_faq)
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Gravado com sucesso.");
        router.push("/faqs");
      } catch (err: any) {
        console.error(err)
        throw new Error('Erro ao atualizar FAQ')
      }        
    }

    const btnCancelar = () => {
      document.cookie = "id_faq_visualizar=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      setIdFaq(null);
      router.push('/faqs');
    };   

  return (
    <>
      <Header />
      <main className={estiloGlobal.dados}>
       <div className={estiloGlobal.titulo} style={{height: 100}}>
          <h1>{nome_faq}</h1>
       </div>

       <div className={estiloGlobal.barraFuncoes}>
          <div>
            <button className={`${estiloGlobal.btn} ${estiloGlobal.incluir}`} onClick={btngravar}>Marcar Como Visto</button>
            <button className={`${estiloGlobal.btn} ${estiloGlobal.excluir}`} onClick={btnCancelar}>Voltar</button>
          </div>
       </div>
       
       <div className={estiloGlobal.dados}>
       <div className={`${estiloGlobal.conteudoHtml}`} dangerouslySetInnerHTML={{ __html: link || '<p>Nenhum conteúdo disponível.</p>' }} />
       </div>


      </main>
    </>
  );
}

"use client"
import estiloGlobal from '../../page.module.scss'
import { Header } from '@/app/dashboard/componentes/header';
import { api } from '@/servicos/api';
import { getCookieServer } from '@/lib/cookieServidor';
import React ,{ useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import useUserInfo from '@/servicos/useUserInfo';
import { buscaDados } from '@/servicos/buscar';
import { ReleaseItemProps } from '@/lib/releaseItem.type';
import { Bold } from 'lucide-react';


export default function VisualizarReleaseItem() {
  const [id_item_release, setIdItem]               = useState<string | null>(null);
  const [id_release, setIdRelease]                 = useState<string | null>(null);
  const [id_usuario, setIdUsuario]                 = useState<string>('');
  const [id_franquia, setIdFranquia]               = useState<string>('');
  const [id_sistema, setIdSistema]                 = useState<string | null>(null);
  const [id_modulo, setIdModulo]                   = useState<string | null>(null);
  const [id_submodulo, setIdSubModulo]             = useState<string | null>(null);
  const [nome_release, setNomeReleaseItem]         = useState<string>('');
  const [link, setLink]                            = useState<string>('');
  const [observacao, setObservacao]                = useState<string>('');
  const informacao_usuario = useUserInfo();
  const router = useRouter();
  const [release, setRelease] = useState<ReleaseItemProps[]>([])

    useEffect (() => {
      try {
        const cookies = document.cookie
        .split('; ')
        .find(row => row.startsWith('id_release_visualizar='))
        ?.split('=')[1]
        setIdRelease(cookies || null);
        if(cookies){
          handlebuscar(cookies)
        }   
      } catch (error) {
        console.log('id release não encontrado')
      }
    }, [])
    
    useEffect(() => {
      if (informacao_usuario?.id_usuario && informacao_usuario?.id_franquia) {
        setIdUsuario(String(informacao_usuario?.id_usuario));
        setIdFranquia(String(informacao_usuario?.id_franquia));
      }
    }, [informacao_usuario]);

    const handlebuscar = async (id_release: string) => {
      const filtros = {
      status : status ==='true' ? true : false,
      id_release: id_release
      }
      const release = await buscaDados('/listarreleaseitem', filtros)
      setRelease(release);
    }

    async function btngravar(){
      try {
        const token = await getCookieServer();
        await api.post(
          "/criarmvrelease",
          { 
            id_sistema   : Number(id_sistema), 
            id_submodulo : Number(id_submodulo), 
            id_modulo    : Number(id_modulo), 
            id_usuario   : Number(id_usuario), 
            id_franquia  : Number(id_franquia), 
            id_release   : Number(id_release)
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Gravado com sucesso.");
        router.push("/releases");
      } catch (err: any) {
        console.error(err)
        throw new Error('Erro ao atualizar Release')
      }        
    }

    const btnCancelar = () => {
      document.cookie = "id_release_visualizar=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      setIdRelease(null);
      router.push('/releases');
    };   

  return (
    <>
      <Header />
      <main className={estiloGlobal.dados}>
       <div className={estiloGlobal.barraFuncoes}>
          <div>
            <button className={`${estiloGlobal.btn} ${estiloGlobal.incluir}`} onClick={btngravar}>Marcar Como Visto</button>
            <button className={`${estiloGlobal.btn} ${estiloGlobal.excluir}`} onClick={btnCancelar}>Voltar</button>
          </div>
       </div>
       {
        release.map((item) =>(
        <div className={estiloGlobal.dados} style={{width: '100%'}} key={item.id_item_release}>
          <div className={`${estiloGlobal.titulo} ${estiloGlobal.grid}`}>
            <h1>{item.nome_release}</h1>
          </div>
          <div className={estiloGlobal.titulo}>
            <h3>
              <b>Sistema:</b> {item.nome_sistema} | 
              <b>Modulo:</b> {item.nome_modulo} | 
              <b>Submodulo:</b> {item.nome_submodulo}
            </h3>
          </div>
          <br/>
            <div className={`${estiloGlobal.conteudoHtml}`} dangerouslySetInnerHTML={{ __html: item.observacao || '<p>Nenhum conteúdo disponível.</p>' }} />     
        </div>
        ))
       }
      </main>
    </>
  );
}

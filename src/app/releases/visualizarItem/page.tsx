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
import { cookies } from 'next/headers';

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
  const [release, setRelease] = useState<ReleaseItemProps | null>(null);

    useEffect (() => {
        const cookies = document.cookie
        .split('; ')
        .find(row => row.startsWith('id_release_visualizar_item='))
        ?.split('=')[1]
        setIdItem(cookies || null);
        if(cookies){
          handlebuscar(cookies)
        }   
    }, [])

    const handlebuscar = async (id_item_release: string) => {
      const filtros = {
        status : status ==='true' ? true : false,
      }
      const release = await buscaDados(`/detalharreleaseitem/${id_item_release}`, filtros)
      setRelease(release);
    }

    const btnCancelar = () => {
      document.cookie = "id_release_visualizar_item=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      setIdRelease(null);
      router.push('/releases');
    };   

  return (
    <>
      <Header />
      <main className={estiloGlobal.dados}>
       <div className={estiloGlobal.barraFuncoes}>
          <div>
            <button className={`${estiloGlobal.btn} ${estiloGlobal.excluir}`} onClick={btnCancelar}>Voltar</button>
          </div>
       </div>
       {release && (
          <div className={estiloGlobal.dados} style={{ width: '100%' }} key={release.id_item_release}>
            <div className={`${estiloGlobal.titulo} ${estiloGlobal.grid}`}>
              <h1>{release.nome_release}</h1>
            </div>
            <div className={estiloGlobal.titulo}>
              <h3>
                <b>Sistema:</b> {release.nome_sistema} |
                <b> Módulo:</b> {release.nome_modulo} |
                <b> Submódulo:</b> {release.nome_submodulo}
              </h3>
            </div>
            <br />
            <div
              className={`${estiloGlobal.conteudoHtml}`}
              dangerouslySetInnerHTML={{ __html: release.observacao || '<p>Nenhum conteúdo disponível.</p>' }}
            />
          </div>
        )}
      </main>
    </>
  );
}

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

export default function IncluirVideo() {
  const [id_video, setIdVideo]                     = useState<string | null>(null);
  const [nome_video, setNomeVideo]                 = useState<string>('');
  const [link, setLink]                            = useState<string>('');
  const [observacao, setObservacao]                = useState<string>('');
  const [order, setOrder]                          = useState<string>('0');
  const [id_submodulo, setIdSubmodulo]             = useState<string>('');
  const [id_sistema, setIdSistema]                 = useState<string>('');
  const [id_modulo, setidModulo]                   = useState<string>('');
  const [sistema, setSistema]                      = useState<SistemaProps[]>([]);
  const [modulo, setModulo]                        = useState<ModuloProps[]>([]);
  const [submodulo, setSubModulo]                  = useState<SubModuloProps[]>([]);
  const router = useRouter();

    useEffect (() => {
      const cookies = document.cookie
        .split('; ')
        .find(row => row.startsWith('id_video='))
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
          setIdSubmodulo(data.id_submodulo || "");
          setIdSistema(data.id_sistema || "")
          setidModulo(data.id_modulo || "")
          setNomeVideo(data.nome_video || "")
          setLink(data.link || "")
          setObservacao(data.observacao || "")
          setOrder(data.order || "")
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
              { id_sistema, id_modulo, id_submodulo, nome_video, link, observacao, order },
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
            { id_video, id_sistema, id_modulo, id_submodulo, nome_video, link, observacao, order},
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
      document.cookie = "id_video=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      setIdVideo(null);
      router.push('../../cadastros/videos');
    };   
  return (
    <>
      <Header />
      <main className={estiloGlobal.dados}>
       <div className={estiloGlobal.titulo}>
          <h1>Incluir Videos</h1>
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
                <h4>Nome do Video</h4>
                <input 
                    required
                    type="text"  
                    className={estiloGlobal.inputPesquisa}
                    placeholder='Nome do Video'
                    value={nome_video}
                    onChange={(e) => {setNomeVideo(e.target.value)}}
                    style={{width: '100%'}}
                />
              </div>
              <div>
                <h4>Link do Video</h4>
                <input 
                    required
                    type="text"  
                    className={estiloGlobal.inputPesquisa} 
                    placeholder='Link dao Video'
                    value={link}
                    onChange={(e) => {setLink(e.target.value)}}
                    style={{width: '100%'}}
                />
              </div>

              <div>
                <h4>Observações</h4>
                <textarea 
                    required
                    className={estiloGlobal.inputPesquisa} 
                    placeholder='Observações do Video'
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

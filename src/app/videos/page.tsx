"use client"
import estiloGlobal from '../page.module.scss'
import { Header } from '../dashboard/componentes/header'
import { useEffect, useState } from 'react'
import { videoProps } from '@/lib/video.lype'
import { useRouter } from 'next/navigation'
import { buscaDados } from '@/servicos/buscar'
import { toast } from 'react-toastify'
import { SistemaProps } from '@/lib/sistema.type'
import useUserInfo from '@/servicos/useUserInfo'

export default function Videos(){
    const [id_video, setIdVideo]      = useState<string | null>(null)
    const [nome_video, setNomeVideo]  = useState<string>()
    const [id_sistema, setIdSistema]  = useState<string>()
    const [finalizado, setFinalizado] = useState<string>('false')
    const [sistema, setSistema]       = useState<SistemaProps[]>([])
    const [video, setVideo]           = useState<videoProps[]>([])
    const [id_usuario, setIdUsuario]  = useState<string>()
    const informacao_usuario          = useUserInfo();
    const router                      = useRouter();
    
    const handlebuscar = async () => {
      const filtros: any = await {
        status : true,
        nome_video: nome_video,
        id_sistema: Number(id_sistema) > 0 ? id_sistema : undefined, 
        finalizado: finalizado === 'true' ? true : finalizado === 'false' ? false : undefined,
        id_usuario: Number(id_usuario)
      }
      const response = await buscaDados('/listarvideo', filtros)
      setVideo(response)
    }
    useEffect (  ()=>{
      setIdUsuario(String(informacao_usuario?.id_usuario));
      if (id_usuario){
       handlebuscar()
      }

    },[id_usuario])

    //Buscar Sistemas
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

    // Visualizar Video Selecionado
    const handleVisualizar = async (id_video: number) =>{
      document.cookie = `id_video_visualizar=${id_video}; path=/; max-age=86000`
        router.push('/videos/visualizar')
    }  

    return (
        <>
        <Header />
        <main className={estiloGlobal.dados}>
            <div className={estiloGlobal.titulo}>
                <h1>Videos</h1>
            </div>
          <div className={estiloGlobal.barraFuncoes}>
          <form  onSubmit={(e) => { e.preventDefault(); handlebuscar(); }}>
          <div>

            <select 
              className={estiloGlobal.inputPesquisaSelectForm}
              name='id_sistema'
              value={id_sistema}
              onChange={(e) => {setIdSistema(e.target.value)}}
              >
              <option value=''>
                Selecione um Sistema
              </option>
              {sistema.map( (item) =>(
                <option key={item.id_sistema} value={item.id_sistema}>
                  {item.nome_sistema}
                </option>                    
              ))}
            </select>

            <select 
              className={estiloGlobal.inputPesquisaSelect} 
              value={finalizado} 
              onChange={(e) => setFinalizado(e.target.value)}
            >
              <option value="true">Finalizado</option>
              <option value="false">Pendente</option>
            </select>

            <input 
              type="text" 
              placeholder="Pesquisar Video" 
              className={estiloGlobal.inputPesquisa} 
              value={nome_video}
              onChange={(e) => setNomeVideo(e.target.value)}
            />

            <button type="submit" className={estiloGlobal.btn}>Buscar</button>
            <button className={`${estiloGlobal.btn} ${estiloGlobal.imprimir}`} onClick={() => window.print()}>Imprimir</button>
          
          </div>
        </form>
        </div>

        <section className={estiloGlobal.grid}>
          <table>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Video</th>
                <th scope="col">Sistema</th>
                <th scope="col">Modulo</th>
                <th scope="col">SubModulo</th>
                <th scope="col" className="acoes">Ações</th>
              </tr>
            </thead>

            {video.map ((item) =>(
              <tbody key={item.id_video}>
                <tr className={estiloGlobal.griditens}>
                  <td data-label="ID">{item.id_video}</td>
                  <td data-label="Video">{item.nome_video}</td>
                  <td data-label="Sistema">{item.nome_sistema}</td>
                  <td data-label="Modulo">{item.nome_modulo}</td>
                  <td data-label="SubModulo">{item.nome_submodulo}</td>
                  <td>
                    <button 
                        className={`${estiloGlobal.btn} ${estiloGlobal.alterar}`} 
                        onClick={(e) => handleVisualizar(Number(item.id_video))}
                        >Visualizar
                    </button>
                  </td>
                </tr>
            </tbody>
              ))}
          </table>
        </section>
        </main>
        </>
  
    )
}
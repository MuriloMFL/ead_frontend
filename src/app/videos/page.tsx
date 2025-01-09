"use client"
import estiloGlobal from '../page.module.scss'
import { Header } from '../dashboard/componentes/header'
import { useEffect, useState } from 'react'
import { videoProps } from '@/lib/video.lype'
import { useRouter } from 'next/navigation'
import { buscaDados } from '@/servicos/buscar'
import { toast } from 'react-toastify'

export default function Videos(){
    const [id_video, setIdVideo] = useState<string | null>(null)
    const [nome_video, setNomeVideo] = useState<string>()
    const [status, setStatus] = useState<string>('true')
    const [video, setVideo] = useState<videoProps[]>([])
    const router = useRouter();
    
    const handlebuscar = async () => {
      const filtros = {
        status : status ==='true' ? true : status ==='false' ? false : false,
        nome_video: nome_video
      }
      const response = await buscaDados('/listarvideo', filtros)
      setVideo(response)
    }
    useEffect ( ()=>{
      handlebuscar()
    },[])

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
              className={estiloGlobal.inputPesquisaSelect} 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="true">Ativo</option>
              <option value="false">Inativo</option>
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
              <tbody >
                <tr className={estiloGlobal.griditens} key={item.id_video}>
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
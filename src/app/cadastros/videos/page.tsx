"use client"
import { useEffect, useState } from 'react'
import estiloGlobal from '../../page.module.scss'
import { Header } from '@/app/dashboard/componentes/header'
import { videoProps } from '@/lib/video.lype'
import { useRouter } from 'next/navigation'
import { buscaDados } from '@/servicos/buscar'
import { excluirDados } from '@/servicos/excluir'

export default function CadastrarVideos(){
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
   
    const handleincluir = () => {
      document.cookie = "id_video=; path=/; expires= Thu, 1 Jan 1970 00:00:00 UTC;"
      setIdVideo(null);
      router.push('/cadastros/videos/incluir')
    }

    const handleExcluir = async (id_video: number) => {
      const response = await excluirDados('/trocarstatusvideo', {id_video})
      handlebuscar()
    }

    const handleAlterar = (id_video: number) =>{
      document.cookie = `id_video=${id_video}; path=/; max-age=86000`
      router.push('/cadastros/videos/incluir')
    }

    return (
        <>
        <Header />

        <main className={estiloGlobal.dados}>
            <div className={estiloGlobal.titulo}>
                <h1>Cadastro de Videos</h1>
            </div>
            <div className={estiloGlobal.barraFuncoes}>
          <div>
            <button className={`${estiloGlobal.btn} ${estiloGlobal.incluir}`} onClick={handleincluir}>
              Incluir
            </button>
            <button className={`${estiloGlobal.btn} ${estiloGlobal.imprimir}`} onClick={() => window.print()}>Imprimir</button>
          </div>
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

            {video.map ( (item) =>(
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
                        onClick={() => handleAlterar(Number(item.id_video))}
                        >Alterar
                    </button>
                    <button 
                        className={`${estiloGlobal.btn} ${item.status ? estiloGlobal.excluir : estiloGlobal.incluir}`}
                        onClick={() => handleExcluir(Number(item.id_video))}
                        >{item.status ? "Excluir" : "Ativar"}
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
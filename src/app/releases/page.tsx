"use client"
import estiloGlobal from '../page.module.scss'
import { Header } from '../dashboard/componentes/header'
import { useEffect, useState } from 'react'
import { buscaDados } from '@/servicos/buscar'
import { useRouter } from 'next/navigation'
import { ReleaseProps } from '@/lib/release.type'

export default function Provas(){
    const [status, setStatus] = useState<string>('true')
    const [id_release, setIdRelease] = useState<string | null>(null)
    const [numero_release, setNumeroRelease] = useState<string>('')
    const [release, setRelease] = useState<ReleaseProps[]>([])
    const router = useRouter();

    const handlebuscar = async () => {
      const filtros = {
      status : status ==='true' ? true : false,
      numero_release: numero_release
      }
      const release = await buscaDados('/listarrelease', filtros)
      setRelease(release);
    }
  
    useEffect( ()=> {
        handlebuscar()
    }, [])

    const handleVisualizar = (id_release : string) =>{
      document.cookie = `id_release_visualizar=${id_release}; path=/; max-age=86000`
      router.push('/releases/visualizar')
    }
    return (
        <>
        <Header />
        <main className={estiloGlobal.dados}>
            <div className={estiloGlobal.titulo}>
                <h1>Release</h1>
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
              placeholder="Pesquisar Release" 
              className={estiloGlobal.inputPesquisa} 
              value={numero_release}
              onChange={(e) => setNumeroRelease(e.target.value)}
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
                <th scope="col">Numero</th>
                <th scope="col">Data</th>
                <th scope="col">Gestores</th>
                <th scope="col">GestorPDV</th>
                <th scope="col">Sincdata</th>
                <th scope="col">Balcão</th>
                <th scope="col">Responsavel</th>
                <th scope="col" className="acoes">Ações</th>
              </tr>
            </thead>
            <tbody>
              {
                release.map((item) => (
                  <tr className={estiloGlobal.griditens} key={item.id_release}>
                  <td data-label="Numero">{item.numero_release}</td>
                  <td data-label="Data">{item.data_inclusao}</td>
                  <td data-label="Versão Gestores">{item.versao_gestores}</td>
                  <td data-label="Versão GestorPDV">{item.versao_gestorpdv}</td>
                  <td data-label="Versão SincData">{item.versao_sincdata}</td>
                  <td data-label="Versão Balcão">{item.versao_balcao}</td>
                  <td data-label="Responsavel">{item.nome_usuario}</td>
                  <td>
                    <button 
                        className={`${estiloGlobal.btn} ${estiloGlobal.alterar}`} 
                        onClick={() => handleVisualizar(String(item.id_release))}
                        >Visualizar
                    </button>
                  </td>
                </tr>
                ))
              }

            </tbody>
          </table>
        </section>           
        </main>

        </>

    )
}
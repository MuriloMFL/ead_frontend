"use client"
import estiloGlobal from '../page.module.scss'
import { Header } from '../dashboard/componentes/header'
import { useEffect, useState } from 'react'
import { buscaDados } from '@/servicos/buscar'
import { useRouter } from 'next/navigation'
import { ReleaseProps } from '@/lib/release.type'
import { toast } from 'react-toastify'


export default function Provas(){
    const [status, setStatus] = useState<string>('true')
    const [id_release, setIdRelease] = useState<string | null>(null)
    const [numero_release, setNumeroRelease] = useState<string>('')
    const [release, setRelease] = useState<ReleaseProps[]>([])

    const [id_item_release, setIdReleaseItem] = useState<string | null>(null)
    const [release_item, setReleaseItem] = useState<ReleaseProps[]>([])
    const [nome_release, setNome_Release] = useState<string>('')
    const [resumo, setNome_Resumo] = useState<string>('')

    const router = useRouter();
    const [tipo_pesquisa, settipo_pesquisa] = useState('release')

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

    const handlebuscar_item = async () => {
      const filtros = {
      status : status ==='true' ? true : false,
      nome_release: nome_release,
      resumo: resumo
      }
      const release_item = await buscaDados('/listarreleaseitem', filtros)
      setReleaseItem(release_item);
    }  

    const handleVisualizar = (id_release : string) =>{
      document.cookie = `id_release_visualizar=${id_release}; path=/; max-age=86000`
      router.push('/releases/visualizar')  
    }

    const handleVisualizarItem = (id_item_release : string) =>{
      document.cookie = `id_release_visualizar_item=${id_item_release}; path=/; max-age=86000`
      router.push('/releases/visualizarItem')
    }
    
    return (
        <>
        <Header />
        <main className={estiloGlobal.dados}>
            <div className={estiloGlobal.titulo}>
                <h1>Release</h1>
            </div>
        <div className={estiloGlobal.barraFuncoes}>

        <form onSubmit={(e) => { e.preventDefault();}}>
          <div>
        <select className={estiloGlobal.inputPesquisaSelect} onChange={(e) => settipo_pesquisa((e).target.value)} >
          <option value='release'>Release</option>
          <option value='item_release'>Itens da Release</option>
        </select>
            {
              tipo_pesquisa == 'release' ? (
                <>
                <input 
                  type="text" 
                  placeholder="Pesquisar N° Release" 
                  className={estiloGlobal.inputPesquisa}  
                  value={numero_release}
                  onChange={(e) => setNumeroRelease(e.target.value)}
                /> 
              <button 
                type="submit" 
                className={estiloGlobal.btn}
                onClick={handlebuscar}
              >
                  Buscar
              </button>
              <button className={`${estiloGlobal.btn} ${estiloGlobal.imprimir}`} onClick={() => window.print()}>Imprimir</button>
         
                </>
              ) : (
                <>
                <input 
                  type="text" 
                  placeholder="Pesquisar por Titulo" 
                  className={estiloGlobal.inputPesquisa} 
                  value={String(nome_release)}
                  onChange={(e) => setNome_Release(e.target.value)}
                /> 
              <button 
                type="submit" 
                className={estiloGlobal.btn} 
                onClick={handlebuscar_item}
              >Buscar</button>
              <button className={`${estiloGlobal.btn} ${estiloGlobal.imprimir}`} onClick={() => window.print()}>Imprimir</button>
         
                </>
              )
            }

          </div>
        </form>
        </div>
        
        {
          tipo_pesquisa == 'release' ? (
          <>
        <section className={estiloGlobal.grid}>
          <table>
            <thead>
              <tr>
                <th scope="col">Release</th>
                <th scope="col">Data</th>
                <th scope="col">Gestores</th>
                <th scope="col">GestorPDV</th>
                <th scope="col">Sincdata</th>
                <th scope="col">Balcão</th>
                <th scope="col">Responsavel</th>
                <th scope="col" className="acoes">Ações</th>
              </tr>
            </thead>
            
              {
                release.map((item) => (
                  <tbody key={item.id_release}>
                  <tr className={estiloGlobal.griditens} >
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
                </tbody>
                ))
              }

            
          </table>
          </section>        
          </>
          ): (
          <>
        <section className={estiloGlobal.grid}>
          <table>
            <thead>
              <tr>
                <th scope="col">Release</th>
                <th scope="col">Titulo</th>
                <th scope="col">descrição</th>
                <th scope="col" className="acoes">Ações</th>
              </tr>
            </thead>
            
              {
                release_item.map((item2) => (
                  <tbody key={item2.id_item_release}>
                  <tr className={estiloGlobal.griditens} >
                  <td data-label="Numero">{item2.numero_release}</td>
                  <td data-label="Titulo">{item2.nome_release}</td>
                  <td data-label="Descrição">{item2.resumo}</td>
                  <td>
                    <button 
                        className={`${estiloGlobal.btn} ${estiloGlobal.alterar}`} 
                        onClick={() => handleVisualizarItem(String(item2.id_item_release))}
                        >Visualizar
                    </button>
                  </td>
                </tr>
                </tbody>
                ))
              } 
          </table>
          </section>
          </>
          )
        }
   
        </main>

        </>

    )
}
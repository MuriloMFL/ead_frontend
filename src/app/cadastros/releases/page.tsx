"use client"
import { useEffect, useState } from 'react'
import estiloGlobal from '../../page.module.scss'
import { Header } from '@/app/dashboard/componentes/header'
import { buscaDados } from '@/servicos/buscar'
import { ReleaseProps } from '@/lib/release.type'
import { useRouter } from 'next/navigation'
import { excluirDados } from '@/servicos/excluir'
import { toast } from 'react-toastify'

export default function CadastrarReleases(){
  const [status, setStatus] = useState<string>('true')
  const [id_release, setIdRelease] = useState<string | null>(null)
  const [numero_release, setNumeroRelease] = useState<string>('')
  const [finalizado, setFinalizado] = useState<string>('false')
  const [release, setRelease] = useState<ReleaseProps[]>([])
  const router = useRouter();

  const handlebuscar = async () => {
    const filtros = {
    status : status ==='true' ? true : false,
    numero_release: numero_release,
    finalizado: finalizado ==='true' ? finalizado : false
    }
    const release = await buscaDados('/listarrelease', filtros)
    setRelease(release);
  }
  
  useEffect( ()=> {
      handlebuscar()
  }, [])
  
    const handleincluir = () => {
      document.cookie = "id_release=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      setIdRelease(null)
      router.push('/cadastros/releases/incluir')
    }

    const handleExcluir = async (id_release: number) => {
      if(!id_release){
        console.error("ID não encontrado")
        return;
      }
      const response = await excluirDados('/trocarstatusrelease', {id_release});
      if(response){
        handlebuscar();
      }
    }
    const handleAlterar = (id_release : number) =>{
      document.cookie = `id_release=${id_release}; path=/; max-age=86400;`;
      router.push('/cadastros/releases/incluir')
    }

    return (
        <>
        <Header />
        <main className={estiloGlobal.dados}>
            <div className={estiloGlobal.titulo}>
                <h1>Cadastros de Release</h1>
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

            <select 
              className={estiloGlobal.inputPesquisaSelect} 
              value={finalizado} 
              onChange={(e) => setFinalizado(e.target.value)}
            >
              <option value="true">Finalizado</option>
              <option value="false">Editando</option>
            </select>

            <input 
              type="text" 
              placeholder="Pesquisar Release" 
              className={estiloGlobal.inputPesquisa} 
              value={numero_release}
              onChange={(e) => setNumeroRelease(e.target.value)}
            />

            <button type="submit" className={estiloGlobal.btn}>Buscar</button>
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

              {
                release.map( (item) => (
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
                        onClick={() => handleAlterar(Number(item.id_release))}
                        >Alterar
                    </button>

                    <button 
                        className={`${estiloGlobal.btn} ${item.status ?  estiloGlobal.excluir : estiloGlobal.incluir}`}
                        onClick={() => handleExcluir(Number(item.id_release))}
                        >{item.status ? "Excluir" : "Ativar"}
                    </button>
                  </td>
                </tr>
                </tbody>
                ))
                
              }

            
          </table>
        </section>            
        </main>

        </>

    )
}
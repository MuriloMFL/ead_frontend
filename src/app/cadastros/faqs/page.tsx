"use client"
import { useEffect, useState } from 'react'
import estiloGlobal from '../../page.module.scss'
import { Header } from '@/app/dashboard/componentes/header'
import { faqProps } from '@/lib/faq.type'
import { buscaDados } from '@/servicos/buscar'
import { useRouter } from 'next/navigation'
import { excluirDados } from '@/servicos/excluir'

export default function CadastrarFaqs(){
    const [id_faq, setIdFaq] = useState<string | null>(null)
    const [nome_faq, setNomeFaq] = useState<string>('')
    const [status, setStatus] = useState<string>('true')
    const [faq, setFaq] = useState<faqProps[]>([])
    const router = useRouter()

    const handlebuscar = async () => {
      const filtros = {
        status : status === 'true' ? true : status === 'false' ? false : undefined,
        nome_faq : nome_faq
      }
      const response = await buscaDados('/listarfaq', filtros)
      setFaq(response)
    }
    useEffect ( ()=> {
      handlebuscar()
    }, [])
    
    const handleincluir = () => {
      document.cookie = "id_faq=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      setIdFaq(null)
      router.push('/cadastros/faqs/incluir')
    }

    const handleExcluir = async (id_faq : number) => {
      const response = await excluirDados('/trocarstatusfaq', {id_faq})
      if(response){
        handlebuscar()
      }
    }

    const handleAlterar = (id_faq: number) =>{
      document.cookie = `id_faq=${id_faq} path=/ max-age=86400;`
      router.push('/cadastros/faqs/incluir')
    }



    return (
        <>
        <Header />

        <main className={estiloGlobal.dados}>
        <div className={estiloGlobal.titulo}>
                <h1>Cadastro de FAQs</h1>
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
              placeholder="Pesquisar FAQ" 
              className={estiloGlobal.inputPesquisa} 
              value={nome_faq}
              onChange={(e) => setNomeFaq(e.target.value)}
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
                <th scope="col">FAQ</th>
                <th scope="col">Sistema</th>
                <th scope="col">Modulo</th>
                <th scope="col">SubModulo</th>
                <th scope="col" className="acoes">Ações</th>
              </tr>
            </thead>
            <tbody>
              {
                faq.map ( (item) => (
                  <tr className={estiloGlobal.griditens} key={item.id_faq}>
                  <td data-label="ID">{item.id_faq}</td>
                  <td data-label="FQS">{item.nome_faq}</td>
                  <td data-label="Sistema">{item.nome_sistema}</td>
                  <td data-label="Modulo">{item.nome_modulo}</td>
                  <td data-label="SubModulo">{item.nome_submodulo}</td>
                  <td>
                    <button 
                        className={`${estiloGlobal.btn} ${estiloGlobal.alterar}`} 
                        onClick={() => handleAlterar(Number(id_faq))}
                        >Alterar
                    </button>
                    <button 
                        className={`${estiloGlobal.btn} ${item.status ? estiloGlobal.excluir : estiloGlobal.incluir}`}
                        onClick={() => handleExcluir(Number(item.id_faq))}
                        >{item.status ? "Excluir" : "Ativar"}
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
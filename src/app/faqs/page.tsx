"use client"
import estiloGlobal from '../page.module.scss'
import { Header } from '../dashboard/componentes/header'
import { useEffect, useState } from 'react'
import { buscaDados } from '@/servicos/buscar'
import { useRouter } from 'next/navigation'
import { faqProps } from '@/lib/faq.type'
import { toast } from 'react-toastify'

export default function Faqs(){
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

    const handleVisualizar = (id_faq : number) =>{
      document.cookie = `id_faq_visualizar=${id_faq}; path=/; max-age=86000;`
      router.push('/faqs/visualizar')
    }
    return (
        <>
        <Header />

        <main className={estiloGlobal.dados}>
            <div className={estiloGlobal.titulo}>
                <h1>Documentação</h1>
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
              placeholder="Pesquisar FAQ" 
              className={estiloGlobal.inputPesquisa} 
              value={nome_faq}
              onChange={(e) => setNomeFaq(e.target.value)}
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
                <th scope="col">Documento</th>
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
                        onClick={() => handleVisualizar(Number(item.id_faq))}
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
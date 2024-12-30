"use client"
import estiloGlobal from '../page.module.scss'
import { Header } from '../dashboard/componentes/header'
import { useEffect, useState } from 'react'
import { aulaProps } from '@/lib/aula.type'
import { buscaDados } from '@/servicos/buscar'
import { useRouter } from 'next/navigation'

export default function Aulas(){
    const [id_aula, setIdAula] = useState<string | null>(null)
    const [nome_aula, setNomeAula] = useState<string>('')
    const [status, setStatus] = useState<string>('true')
    const [aula, setAula] = useState<aulaProps[]>([])
    const router = useRouter()
    
    const handlebuscar = async () => {
      const filtros = {
        status: status ==='true' ? true : status ==='false' ? false : undefined,
        nome_aula : nome_aula        
      }
      const response = await buscaDados('/listaraula', filtros);
      if(response){
        setAula(response);
      }else {
        alert("Erro ao receber Lista de aulas do serviço ")
      }
    }
    useEffect ( ()=> {
      handlebuscar()
    },[])

    const handleVisualizar = ( ()=>{

    })
    return (
        <>
        <Header />
        
        <main className={estiloGlobal.dados}>
            <div className={estiloGlobal.titulo}>
                <h1>Aulas</h1>
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
              placeholder="Pesquisar Aulas" 
              className={estiloGlobal.inputPesquisa} 
              value={nome_aula}
              onChange={(e) => setNomeAula(e.target.value)}
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
                <th scope="col">Aula</th>
                <th scope="col">Sistema</th>
                <th scope="col">Modulo</th>
                <th scope="col">Submodulo</th>
                <th scope="col" className="acoes">Ações</th>
              </tr>
            </thead>
            <tbody>
              {
                aula.map((item) => (
                  <tr className={estiloGlobal.griditens} key={item.id_aula}>
                  <td data-label="ID">{item.id_aula}</td>
                  <td data-label="Aula">{item.nome_aula}</td>
                  <td data-label="Sistema">{item.nome_sistema}</td>
                  <td data-label="Modulo">{item.nome_modulo}</td>
                  <td data-label="Submodulo">{item.nome_submodulo}</td>
                  <td>
                    <button 
                        className={`${estiloGlobal.btn} ${estiloGlobal.alterar}`}
                        onClick={() => handleVisualizar}
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
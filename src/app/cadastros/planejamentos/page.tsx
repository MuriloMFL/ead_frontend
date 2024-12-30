"use client"
import { useEffect, useState } from 'react'
import estiloGlobal from '../../page.module.scss'
import { Header } from '@/app/dashboard/componentes/header'
import { PlanejamentoProps } from '@/lib/planejamento.type'
import { buscaDados } from '@/servicos/buscar'
import { useRouter } from 'next/navigation'
import { excluirDados } from '@/servicos/excluir'

export default function CadastrarPlanejamento(){
    const [status, setStatus] = useState<string>('true')
    const [etapa_finalizado, setEtapaFinalizada] = useState<string>('false')
    const [id_planejamento, setIdPlanejamento] = useState<string | null>(null)
    const [nome_planejamento, setNomePlanejamento] = useState<string>('') 
    const [planejamentos, setPlanejamentos] = useState<PlanejamentoProps[]>([])
    const router = useRouter();

    const handleincluir = () => {
      document.cookie = "id_planejamento=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      setIdPlanejamento(null)
      router.push('/cadastros/planejamentos/incluir')
    }

    const handleExcluir = async (id_planejamento: number) => {
      if(!id_planejamento){
        console.error("ID do Planejamento Inválido")
      }
      const response = await excluirDados('/trocarstatusplanejamento', {id_planejamento});
      if(response){
        handlebuscar();
      }
    }

    const handleAlterar = (id_planejamento : number) =>{
      document.cookie = `id_planejamento=${id_planejamento}; path=/; max-age=86400;`;
      router.push('/cadastros/planejamentos/incluir')
    }

    const handlebuscar = async () => {
      const filtros = {
        status: status === 'true' ? true : status ==='false' ? false : true,
        nome_planejamento : nome_planejamento,
        etapa_finalizado : etapa_finalizado === 'true' ? true : etapa_finalizado ==='false' ? false : false,
      }
      const planejamento = await buscaDados('/listarplanejamento', filtros)
      setPlanejamentos(planejamento)

    }
    useEffect (() => {
      handlebuscar()
    },[])

    return (
        <>
        <Header />

        <main className={estiloGlobal.dados}>
            <div className={estiloGlobal.titulo}>
                <h1>Cadastros de Planejamento</h1>
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
              value={etapa_finalizado} 
              onChange={(e) => setEtapaFinalizada(e.target.value)}
            >
              <option value="true">Finalizado</option>
              <option value="false">Pendente</option>
            </select>

            <input 
              type="text" 
              placeholder="Pesquisar Planejamento" 
              className={estiloGlobal.inputPesquisa} 
              value={nome_planejamento}
              onChange={(e) => setNomePlanejamento(e.target.value)}
            />
            <button type="submit" className={estiloGlobal.btn} >Buscar</button>
          </div>
        </form>
        </div>

        <section className={estiloGlobal.grid}>
          <table>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Planejamento</th>
                <th scope="col">Sistema</th>
                <th scope="col">Modulo</th>
                <th scope="col">Andamento</th>
                <th scope="col">Responsavel</th>
                <th scope="col" className="acoes">Ações</th>
              </tr>
            </thead>
            <tbody>
                  {
                  planejamentos.map((item) => (
                      <tr className={estiloGlobal.griditens} key={item.id_planejamento}>
                          <td data-label="ID">{item.id_planejamento}</td>
                          <td data-label="Nome Planejamento">{item.nome_planejamento}</td>
                          <td data-label="Sistema">{item.nome_sistema}</td>
                          <td data-label="Modulo">{item.nome_modulo}</td>
                          <td data-label="Andamento">{item.etapa_finalizado ? "Finalizado" : "Pendente"}</td>
                          <td data-label="Responsavel">{item.nome_usuario}</td>
                          <td>
                              <button 
                                  className={`${estiloGlobal.btn} ${estiloGlobal.alterar}`} 
                                  onClick={() => handleAlterar(Number(item.id_planejamento))}
                              >Alterar</button>
                              <button 
                                  className={`${estiloGlobal.btn} ${item.status ? estiloGlobal.excluir : estiloGlobal.incluir}`}
                                  onClick={() => handleExcluir((item.id_planejamento))}
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
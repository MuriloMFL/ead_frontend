"use client"
import { useEffect, useState } from 'react'
import estiloGlobal from '../../page.module.scss'
import { Header } from '@/app/dashboard/componentes/header'
import { QuestaoProps } from '@/lib/questao.type'
import { useRouter } from 'next/navigation'
import { buscaDados } from '@/servicos/buscar'
import { excluirDados } from '@/servicos/excluir'

export default function CadastrarQuestoes(){
  const [id_questao, setIdQuestao]  = useState<string | null>(null)
  const [questoes, setNomeQuestao]  = useState<string>('')
  const [status, setStatus] = useState<string>('true')
  const [questao, setQuestao] = useState<QuestaoProps[]>([])
  const router = useRouter();

    const handleincluir = () => {
      document.cookie = "id_questao=; path=/; expires:Thu , 1 Jan 1970 00:00:00"
      setIdQuestao(null)
      router.push('/cadastros/questoes/incluir')
    }
    const handleExcluir = async (id_questao: number) => {
      const response = await excluirDados('/trocarstatusquestao', {id_questao})
      handlebuscar()
    }
    const handleAlterar = (id_questao: number) =>{
      document.cookie = `id_questao=${id_questao} max-age=86000`
      router.push('/cadastros/questoes/incluir')
    }

    const handlebuscar = async () => {
      const filtros = {
        status : status ==='true' ? true : status ==='false' ? false : undefined,
        questoes : questoes
      }
      const response = await buscaDados('/listarquestao', filtros)
      setQuestao(response)
    }

    useEffect (()=>{
      handlebuscar()
    },[])

    return (
        <>
        <Header />

        <main className={estiloGlobal.dados}>
            <div className={estiloGlobal.titulo}>
                <h1>Cadastros de Questões</h1>
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
              placeholder="Pesquisar Questão" 
              className={estiloGlobal.inputPesquisa} 
              value={questoes}
              onChange={(e) => setNomeQuestao(e.target.value)}
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
                <th scope="col">Questão</th>
                <th scope="col">Sistema</th>
                <th scope="col">Modulo</th>
                <th scope="col">SubModulo</th>
                <th scope="col" className="acoes">Ações</th>
              </tr>
            </thead>
            <tbody>
              {
                questao.map( (item)=> (
                  <tr className={estiloGlobal.griditens} key={item.id_questao}>
                  <td data-label="ID">{item.id_questao}</td>
                  <td data-label="Questão">{item.questoes}</td>
                  <td data-label="Sistema">{item.nome_sistema}</td>
                  <td data-label="Modulo">{item.nome_modulo}</td>
                  <td data-label="SubModulo">{item.nome_submodulo}</td>
                  <td>
                    <button 
                        className={`${estiloGlobal.btn} ${estiloGlobal.alterar}`} 
                        onClick={() => handleAlterar((Number(item.id_questao)))}
                        >Alterar
                    </button>
                    <button 
                        className={`${estiloGlobal.btn} ${item.status? estiloGlobal.excluir : estiloGlobal.incluir}`}
                        onClick={() => handleExcluir((Number(item.id_questao)))}
                        >{item.status ? "Excluir" : "Incluir"}
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
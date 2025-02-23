"use client"
import { useEffect, useState } from 'react'
import estiloGlobal from '../../page.module.scss'
import { Header } from '@/app/dashboard/componentes/header'
import { provaProps } from '@/lib/prova.types'
import { buscaDados } from '@/servicos/buscar'
import { excluirDados } from '@/servicos/excluir'
import { useRouter } from 'next/navigation'
import useUserInfo from '@/servicos/useUserInfo'
import { toast } from 'react-toastify'

export default function CadastrarProvas(){
  const [id_prova, setIdProva] = useState<string | null>(null)
  const [id_usuario, setIdUsuario] = useState<string | null>(null)
  const [nome_prova, setNomeProba] = useState<string>('')
  const [status, setStatus] = useState<string>('true')
  const [prova, setProva] = useState<provaProps[]>([])
  const router = useRouter();

    const handlebuscar = async () => {
      const filtros = {
        status: status ==='true'? true : status ==='false' ? false : undefined,
        nome_prova: nome_prova,
        id_usuario: 1
      }
      
      const response = await buscaDados('/listarprova', filtros)
      setProva(response)
    }
    
    useEffect(()=>{
      handlebuscar();
    },[]);

    const handleincluir = () => {
      document.cookie = "id_prova=; path=; expires=Thu, 1 Jan 1970 00:00:00 UTC;"
      setIdProva(null)
      router.push('/cadastros/provas/incluir')
    }

    const handleExcluir = async (id_prova: number) => {
      const response = await excluirDados('/trocarstatusprova', {id_prova});
      if(response){
       await  handlebuscar();
      }
    }
    const handleAlterar = (id_prova: number) =>{
      document.cookie =`id_prova=${id_prova}; max-age=8600;`
      router.push('/cadastros/provas/incluir')
    }


    return (
        <>
        <Header />
        
        <main className={estiloGlobal.dados}>
            <div className={estiloGlobal.titulo}>
                <h1>Cadastro de Provas</h1>
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
              placeholder="Pesquisar Prova" 
              className={estiloGlobal.inputPesquisa} 
              value={nome_prova}
              onChange={(e) => setNomeProba(e.target.value)}
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
                <th scope="col">Prova</th>
                <th scope="col">Sistema</th>
                <th scope="col">Modulo</th>
                <th scope="col">SubModulo</th>
                <th scope="col" className="acoes">Ações</th>
              </tr>
            </thead>
            <tbody>
              {
                prova.map( (item) => (
                  <tr className={estiloGlobal.griditens} key={item.id_prova}>
                  <td data-label="ID">{item.id_prova}</td>
                  <td data-label="Prova">{item.nome_prova}</td>
                  <td data-label="Sistema">{item.nome_sistema}</td>
                  <td data-label="Modulo">{item.nome_modulo}</td>
                  <td data-label="SubModulo">{item.nome_submodulo}</td>
                  <td>
                    <button 
                        className={`${estiloGlobal.btn} ${estiloGlobal.alterar}`} 
                        onClick={() => handleAlterar(item.id_prova)}
                        >Alterar
                    </button>
                    <button 
                        className={`${estiloGlobal.btn} ${item.status ? estiloGlobal.excluir : estiloGlobal.incluir}`}
                        onClick={() => handleExcluir(item.id_prova)}
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
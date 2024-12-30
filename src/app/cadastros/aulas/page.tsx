'use client'; 
import { useEffect, useState } from 'react';
import estiloGlobal from '../../page.module.scss'
import { Header } from '@/app/dashboard/componentes/header'
import { aulaProps } from '@/lib/aula.type';
import { useRouter } from 'next/navigation';
import { buscaDados } from '@/servicos/buscar';
import { excluirDados } from '@/servicos/excluir';

export default function CadastrarAulas(){
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

    const handleincluir = () => {
      document.cookie = "id_aula=; espires=Thu, 1 Jan 1970 00:00:00 UTC; path=/;"
      setIdAula(null)
      router.push('/cadastros/aulas/incluir')
    }

    const handleExcluir = async (id_aula: number) => {
      const response = await excluirDados('/trocarstatusaula', {id_aula})
      if(response) {
        handlebuscar()
      }
    }

    const handleAlterar = (id_aula: number) =>{
      document.cookie = `id_aula=${id_aula} max-age=86000`
      router.push('/cadastros/aulas/incluir')
    }

    return (
        <>
        <Header />

        <main className={estiloGlobal.dados}>
            <div className={estiloGlobal.titulo}>
                <h1>Cadastro de Aulas</h1>
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
              placeholder="Pesquisar Aula" 
              className={estiloGlobal.inputPesquisa} 
              value={nome_aula}
              onChange={(e) => setNomeAula(e.target.value)}
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
                        onClick={() => handleAlterar(item.id_aula)}
                        >Alterar
                    </button>
                    <button 
                        className={`${estiloGlobal.btn} ${item.status ? estiloGlobal.excluir : estiloGlobal.incluir}`}
                        onClick={() => handleExcluir(item.id_aula)}
                        >{item.status ? "Excluir":"Ativar"}
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
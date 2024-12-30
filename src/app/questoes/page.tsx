"use client"
import estiloGlobal from '../page.module.scss'
import { Header } from '../dashboard/componentes/header'

export default function Questoes(){

    const handlebuscar = () => {

    }
    const handleVisualizar = () =>{

    }
    return (
        <>
        <Header />

        <main className={estiloGlobal.dados}>
            <div className={estiloGlobal.titulo}>
                <h1>Questões</h1>
            </div>
            <div className={estiloGlobal.barraFuncoes}>
         <form  onSubmit={(e) => { e.preventDefault(); handlebuscar(); }}>
          <div>
            <select 
              className={estiloGlobal.inputPesquisaSelect} 
              value={"status"} 
              onChange={(e) => (e.target.value)}
            >
              <option value="true">Ativo</option>
              <option value="false">Inativo</option>
            </select>
            <input 
              type="text" 
              placeholder="Pesquisar Questões" 
              className={estiloGlobal.inputPesquisa} 
              value=""
              onChange={(e) => (e.target.value)}
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
                <th scope="col">Questão</th>
                <th scope="col">Sistema</th>
                <th scope="col">Modulo</th>
                <th scope="col">Aba</th>
                <th scope="col" className="acoes">Ações</th>
              </tr>
            </thead>
            <tbody>
                <tr className={estiloGlobal.griditens} >
                  <td data-label="ID">item.id_prova</td>
                  <td data-label="Questão">item.questao</td>
                  <td data-label="Sistema">item.sistema</td>
                  <td data-label="Modulo">item.modulo</td>
                  <td data-label="Aba">item.aba</td>
                  <td>
                  <button 
                        className={`${estiloGlobal.btn} ${estiloGlobal.alterar}`} 
                        onClick={() => handleVisualizar}
                        >Visualizar
                    </button>
                  </td>
                </tr>
            </tbody>
          </table>
        </section>
        </main>

        </>

    )
}
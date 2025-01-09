"use client"
import estiloGlobal from "../../../page.module.scss";
import estiloLocal from "./page.module.scss"
import { useState, useEffect } from "react";
import { ReleaseProps } from "@/lib/release.type";
import { buscaDados } from "@/servicos/buscar";

export function DashboardPrincipal(){
    const [status, setStatus] = useState<string>('true')
    const [id_release, setIdRelease] = useState<string | null>(null)
    const [nome_release, setNomeRelease] = useState<string>('')
    const [release, setRelease] = useState<ReleaseProps[]>([]) 
    const [qtd_modulos, setQtdModulos] = useState<string>('')
    const [qtd_submodulos, setQtdSubModulos] = useState<string>('')
    const [qtd_aulas, setQtdAulas] = useState<string>('')

    const handlebuscar = async () => {
        const filtros = {
        status : true,
        }
        const release = await buscaDados('/listarrelease', filtros)
        setRelease(release);
    }
    
    useEffect( ()=> {
        handlebuscar()
    }, [])

    const BuscarModulos = async () => {
      const filtros = {
        status : true,
      }
      const modulos = await buscaDados('/contarmodulos', filtros)
      setQtdModulos(modulos)
      
    }
    useEffect ( ()=> {
      BuscarModulos()
    }, [qtd_modulos])

    const BuscarSubModulos = async () => {
      const filtros = {
        status : true,
      }
      const submodulos = await buscaDados('/contarsubmodulos', filtros)
      setQtdSubModulos(submodulos)
      
    }
    useEffect ( ()=> {
      BuscarSubModulos()
    }, [qtd_submodulos])

    const BuscarAulas = async () => {
      const filtros = {
        status : true,
      }
      const aulas = await buscaDados('/contaraulas', filtros)
      if(aulas){
        setQtdAulas(aulas)
      }else {
        setQtdAulas('0')
      }
    }
    useEffect ( ()=> {
      BuscarAulas()
    }, [qtd_aulas])
    return(
        <main className={estiloGlobal.dados}>
            <div className={estiloGlobal.titulo}>
                <h1>Dashboard</h1>
            </div>

            <div className={estiloLocal.modulos}>
                <div className={estiloLocal.amostra}>
                    <div className={estiloLocal.tituloAmostras}><h3>Modulos</h3></div>
                    <h1 className={estiloLocal.dadosAmostra}>{qtd_modulos}</h1>
                    <p className={estiloLocal.dadosrodape}>Modulos Ativos</p>
                </div>
                <div className={estiloLocal.amostra}>
                    <div className={estiloLocal.tituloAmostras}><h3>Sub-Modulos</h3></div>
                    <h1 className={estiloLocal.dadosAmostra}>{qtd_submodulos}</h1>
                    <p className={estiloLocal.dadosrodape}>Sub-modulos Ativos</p>
                </div>
                <div className={estiloLocal.amostra}>
                    <div className={estiloLocal.tituloAmostras}><h3>Aulas</h3></div>
                    <h1 className={estiloLocal.dadosAmostra}>{qtd_aulas}</h1>
                    <p className={estiloLocal.dadosrodape}>Aulas Ativas</p>
                </div>
                <div className={estiloLocal.amostra}>
                    <div className={estiloLocal.tituloAmostras}><h3>Questões</h3></div>
                    <h1 className={estiloLocal.dadosAmostra}>90%</h1>
                    <p className={estiloLocal.dadosrodape}>de acertos</p>
                </div>

                <div className={estiloLocal.amostra}>
                    <div className={estiloLocal.tituloAmostras}><h3>Provas</h3></div>
                    <h1 className={estiloLocal.dadosAmostra}>87%</h1>
                    <p className={estiloLocal.dadosrodape}>5 Provas feitas</p>
                </div>

                <div className={estiloGlobal.titulo} >
                    <h1>Release</h1>
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
            <tbody>
              {
                release.slice(0,5).map( (item) => (
                  <tr className={estiloGlobal.griditens} key={item.id_release}>
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
                        >Visualizar
                    </button>

                  </td>
                </tr>
                ))
              }

            </tbody>
          </table>
        </section>      
            </div>    
        </main>
    )
}
"use client"
import estiloGlobal from '../../../page.module.scss';
import { Header } from '@/app/dashboard/componentes/header';
import { api } from '@/servicos/api';
import { getCookieServer } from '@/lib/cookieServidor';
import { FranquiaProps } from '@/lib/franquia.type';
import { useState, useEffect} from 'react';

export default function IncluirRelease() {
  const [id_release, setIdRelease]             = useState<string | null>(null)
  const [numero_release, setnumeroRelease]     = useState<string>('')
  const [versao_gestores, setVersaoGestores]   = useState<string>('')
  const [versao_sincdata, setVersaoSincdata]   = useState<string>('')
  const [versao_gestorpdv, setVersaoGestorPDV] = useState<string>('')
  const [versao_balcao, setVersaoBalcao]       = useState<string>('')
  const [id_usuario, setIdUsuario]             = useState<string>('')
  const [data_inclusao, setDataInicio]         = useState<string>('')
  const [finalizado, setFinalizado]            = useState<string>('false')
  return (
    <>
      <Header />
      <main className={estiloGlobal.dados}>
       <div className={estiloGlobal.titulo}>
          <h1>Incluir Release</h1>
       </div>

       <div className={estiloGlobal.barraFuncoes}>
          <div>
            <button className={`${estiloGlobal.btn} ${estiloGlobal.incluir}`}>Gravar</button>
            <button className={`${estiloGlobal.btn} ${estiloGlobal.excluir}`}>Cancelar</button>
          </div>
       </div>

       <form className={estiloGlobal.formCadastro}>
          <div className={estiloGlobal.gridCadastros}>
            <div className={estiloGlobal.checks}>
              <div>
                <label>Numero Release: </label>
                <input 
                  type='number' 
                  className={estiloGlobal.inputPesquisa} 
                  placeholder='Numero'
                  style={{width: '130px', appearance: 'none', WebkitAppearance: 'none'}}
                />
              </div>

             <div>
              <label>Status: </label>
              <select className={estiloGlobal.inputPesquisaSelect}>
                <option value='true'>Finalizado</option>
                <option value='false'>Editando</option>
              </select>
            </div>

            </div>
          </div>

          <div className={estiloGlobal.gridCadastros}>
                <div>
                  <label>Versão Gestores: </label>
                  <input 
                    type='text' 
                    className={estiloGlobal.inputPesquisa} 
                    placeholder='Versão Gestores'
                    style={{width: '160px'}}
                  />
                </div>

                <div>
                  <label>Versão GestorPDV: </label>
                  <input 
                    type='text' 
                    className={estiloGlobal.inputPesquisa} 
                    placeholder='Versão GestorPDV'
                    style={{width: '160px'}}
                  />
                </div>

                <div>
                <label>Versão Sincdata: </label>
                <input 
                  type='text' 
                  className={estiloGlobal.inputPesquisa} 
                  placeholder='Versão Sincdata'
                  style={{width: '160px'}}
                />
                </div>

                <div>
                  <label>Versão balcão: </label>
                  <input 
                    type='text' 
                    className={estiloGlobal.inputPesquisa} 
                    placeholder='Versão balcão'
                    style={{width: '160px'}}
                  />
                </div>
            </div>
       </form>

      <div className={estiloGlobal.barraFuncoes}>
        <div>
          <button className={`${estiloGlobal.btn} ${estiloGlobal.incluir}`}>
            Incluir
          </button>          
        </div>
      </div>

       <section className={estiloGlobal.grid}>
          <table>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nome</th>
                <th scope="col">Sistema</th>
                <th scope="col">Modulo</th>
                <th scope="col">Submodulo</th>
                <th scope="col" className="acoes">Ações</th>
              </tr>
            </thead>
            <tbody>
                  <tr className={estiloGlobal.griditens}>
                  <td data-label="Nome">item.ID</td>
                  <td data-label="Nome">item.nome_release</td>
                  <td data-label="Versão Gestores">item.id_sistema</td>
                  <td data-label="Versão GestorPDV">item.id_modulo</td>
                  <td data-label="Versão SincData">item.id_submodulo</td>
                  <td>
                    <button 
                        className={`${estiloGlobal.btn} ${estiloGlobal.alterar}`} 
                        >Alterar
                    </button>

                    <button 
                        className={`${estiloGlobal.btn} ${estiloGlobal.excluir}`}
                        
                        >{"Excluir"}
                    </button>
                  </td>
                  </tr>
            </tbody>
          </table>
        </section> 

      </main>
    </>
  );
}

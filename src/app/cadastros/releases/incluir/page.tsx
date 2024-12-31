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

       <form className={`${estiloGlobal.formCadastro}  ${estiloGlobal.gridCadastros}`}>
       <h4 className={estiloGlobal.cabecalhoFormCadastro}>Insira os dados da Release</h4>
        <div>
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

          <div style={{display: 'flex'}}>
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
          </div>
          <h4 className={estiloGlobal.cabecalhoFormCadastro}>Insira as alterações e correções</h4>
       </form>

      </main>
    </>
  );
}

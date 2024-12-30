import estiloGlobal from '../../../page.module.scss';
import { Header } from '@/app/dashboard/componentes/header';
import { api } from '@/servicos/api';
import { getCookieServer } from '@/lib/cookieServidor';
import { FranquiaProps } from '@/lib/franquia.type';
import { useState, useEffect} from 'react';

export default function IncluirRelease() {

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
          <table>
            <tr>
              <td><label>Codigo:</label></td>
              <td><input type='number' className={estiloGlobal.inputPesquisa} placeholder='ID'/></td>
            </tr>
            <tr>
              <td><label>Release:</label></td>
              <td><input type="text"  className={estiloGlobal.inputPesquisa} placeholder='Nome da Franquia'/></td>
            </tr>
            <tr>
              <td><label>Responsavel:</label></td>
              <td><input type="text"  className={estiloGlobal.inputPesquisa} placeholder='Nome do responsavel'/></td>
            </tr>
            <tr>
              <td><label>Telefone:</label></td>
              <td><input type="text"  className={estiloGlobal.inputPesquisa} placeholder='Telefone'/></td>
            </tr>
          </table>
       </form>

      </main>
    </>
  );
}

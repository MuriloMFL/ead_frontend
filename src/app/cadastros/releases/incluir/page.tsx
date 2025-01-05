"use client"
import estiloLocal from './page.module.scss'
import estiloGlobal from '../../../page.module.scss';
import { Header } from '@/app/dashboard/componentes/header';
import { api } from '@/servicos/api';
import { getCookieServer } from '@/lib/cookieServidor';
import { FranquiaProps } from '@/lib/franquia.type';
import { useState, useEffect, useDebugValue} from 'react';
import { Grid } from 'lucide-react';
import { buscaDados } from '@/servicos/buscar';
import { SistemaProps } from '@/lib/sistema.type';
import { ModuloProps } from '@/lib/modulo.type';
import { SubModuloProps } from '@/lib/submodulo.type';

export default function IncluirRelease() {
  const [id_release, setIdRelease]                  = useState<string | null>(null)
  const [numero_release, setnumeroRelease]          = useState<string>('')
  const [versao_gestores, setVersaoGestores]        = useState<string>('')
  const [versao_sincdata, setVersaoSincdata]        = useState<string>('')
  const [versao_gestorpdv, setVersaoGestorPDV]      = useState<string>('')
  const [versao_balcao, setVersaoBalcao]            = useState<string>('')
  const [id_usuario, setIdUsuario]                  = useState<string>('')
  const [data_inclusao, setDataInicio]              = useState<string>('')
  const [finalizado, setFinalizado]                 = useState<string>('false')

  const [exibirInclusaoItem, setExibirInclusaoItem] = useState(false)

  const [id_sistema, setIdSistema]                  = useState<string | null>(null)
  const [id_modulo, setIdModulo]                    = useState<string | null>(null)
  const [id_submodulo, setIdSubmodulo]              = useState<string | null>(null)
  const [sistema, setSistema]                       = useState<SistemaProps[]>([]);
  const [modulo, setModulo]                         = useState<ModuloProps[]>([]);
  const [submodulo, setSubModulo]                   = useState<SubModuloProps[]>([]);
  const [nomeItemRelease, setNomeItemRelease]       = useState<string>('')

  const btnIncluirItem = () => {
    setExibirInclusaoItem(true)
  }

  const btnGravarItem = () => {
    setExibirInclusaoItem(false)
  }

  const btnCancelarInclusaoItem = () => {
    setExibirInclusaoItem(false)
  }

    const selecionarSistema = async () => {
      const filtros = {
        status: true,
      };
      const sistema = await buscaDados('/listarsistema', filtros);
      setSistema(sistema);
    };
  
    useEffect(() => {
      selecionarSistema();
    }, []);

    const selecionarModulo = async () => {
      const filtros = {
        status: true,
        id_sistema,
      };
      const modulo = await buscaDados('/listarmodulo', filtros);
      setModulo(modulo);
    };

    useEffect(() => {
      selecionarModulo();
    }, [id_sistema]);

    const selecionarSubModulo = async () => {
      const filtros = {
        status: true,
        id_modulo,
      };
      const submodulo = await buscaDados('/listarsubmodulo', filtros);
      setSubModulo(submodulo);
    };

    useEffect(() => {
      selecionarSubModulo();
    }, [id_modulo]);

  return (
    <>
      <Header />
      <main className={estiloGlobal.dados}>
        {
          !exibirInclusaoItem ? (
        <>
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
          <button className={`${estiloGlobal.btn} ${estiloGlobal.incluir}`} onClick={btnIncluirItem}>
            Incluir Item
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

        </>
          ) : (
        <>
          <div className={estiloGlobal.titulo}>
              <h1>Incluir Item da Release</h1>
          </div>

          <div className={estiloGlobal.barraFuncoes}>
            <div>
              <button className={`${estiloGlobal.btn} ${estiloGlobal.incluir}`} onClick={btnGravarItem}>
                Gravar item
              </button>  
              <button className={`${estiloGlobal.btn} ${estiloGlobal.excluir}`} onClick={btnCancelarInclusaoItem}>
                Cancelar item
              </button>         
            </div>
          </div> 

          <form className={`${estiloGlobal.formCadastro} ${estiloGlobal.gridCadastros}`}>
          <div>
              <div>                
                <select 
                  required
                  className={estiloLocal.inputPesquisaSelectForm}
                  name='id_sistema'
                  value={String(id_sistema)}
                  onChange={(e) => {setIdSistema(e.target.value)}}
                 >
                  <option value="" disabled>
                    Selecione um Sistema
                  </option>
                  {sistema.map( (item) =>(
                    <option key={item.id_sistema} value={item.id_sistema}>
                      {item.nome_sistema}
                    </option>                    
                  ))}
                </select>
 
                <select 
                  required
                  className={estiloLocal.inputPesquisaSelectForm}
                  name='id_modulo'
                  value={ String(id_modulo)}
                  onChange={(e) => {setIdModulo(e.target.value)}}
                  >
                  <option value="" disabled>
                    Selecione um Modulo
                  </option>
                  {modulo.map ( (item) => (
                    <option key={item.id_modulo} value={item.id_modulo}>
                      {item.nome_modulo}
                    </option>
                  ))}
                </select>
                
                <select 
                  required
                  className={estiloLocal.inputPesquisaSelectForm}
                  name='id_submodulo'
                  value={String(id_submodulo)}
                  onChange={(e) => {setIdSubmodulo(e.target.value)}}
                  >
                  <option value="" disabled>
                    Selecione um SubModulo
                  </option>
                  {submodulo.map ( (item) => (
                    <option key={item.id_submodulo} value={item.id_submodulo}>
                      {item.nome_submodulo}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <input 
                  required
                  type="text"  
                  className={estiloLocal.inputNomeReleaseItem} 
                  placeholder='Titulo do Item da release'
                  value={nomeItemRelease}
                  onChange={(e) => {setNomeItemRelease(e.target.value)}}
                />
              </div>

              <div>
                <div>
                  <input 
                  type='radio'
                  name='tipo_release'
                  />

                  <label style={{margin: '3px'}}>Alteração</label>
                  <input 
                  type='radio'
                  name='tipo_release'
                  />
                  <label style={{margin: '3px'}}>Correção</label>
                </div>
              </div>

              <div>
                <br/>
                <label>Digite as Alterações no sistema</label>
                <textarea 
                style={{width: '100%', height: '300px'}}
                className={estiloGlobal.inputPesquisa}
                />
              </div>
          </div>
       </form>       
        </>
          )
        }

    
 
      </main>
    </>
  );
}

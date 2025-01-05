"use client"
import estiloLocal from './page.module.scss'
import estiloGlobal from '../../../page.module.scss';
import { Header } from '@/app/dashboard/componentes/header';
import { api } from '@/servicos/api';
import { getCookieServer } from '@/lib/cookieServidor';
import { useState, useEffect, useDebugValue} from 'react';
import { buscaDados } from '@/servicos/buscar';
import { SistemaProps } from '@/lib/sistema.type';
import { ModuloProps } from '@/lib/modulo.type';
import { SubModuloProps } from '@/lib/submodulo.type';
import useUserInfo from '@/servicos/useUserInfo';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { ItemReleaseProps } from '@/lib/reliaseItem.type';

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

  const informacao_usuario                          = useUserInfo();
  const router = useRouter();
  const [exibirInclusaoItem, setExibirInclusaoItem] = useState(false)

  const [id_item_release, setIdItemRelease]         = useState<string | null>(null)
  const [id_submodulo, setIdSubmodulo]             = useState<string>('');
  const [id_sistema, setIdSistema]                 = useState<string>('');
  const [id_modulo, setidModulo]                   = useState<string>('');
  const [sistema, setSistema]                       = useState<SistemaProps[]>([]);
  const [modulo, setModulo]                         = useState<ModuloProps[]>([]);
  const [submodulo, setSubModulo]                   = useState<SubModuloProps[]>([]);
  const [nomeItemRelease, setNomeItemRelease]       = useState<string>('')
  const [itemrelease, setItemRelease]               = useState<ItemReleaseProps[]>([])
  const [correcao, setcorrecao]                     = useState<boolean>(false)
  const [alteracao, setalteracao]                   = useState<boolean>(false)
  const [observacao, setobservacao]                 = useState<string>('')

  useEffect (() => {
    const cookies = document.cookie
      .split('; ')
      .find(row => row.startsWith('id_release='))
      ?.split('=')[1]
      setIdRelease(cookies || null);
      
      if(cookies){
        detalharrelease(cookies)
      }
  }, [])

  async function detalharrelease(id_release : string) {
    const token = await getCookieServer();
    try {
      const {data} = await api.get(`/detalharrelease/${id_release}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      
    if(data) {
      setIdRelease(data.id_release || "")
      setnumeroRelease(data.numero_release || "")
      setVersaoBalcao(data.versao_balcao || "")
      setVersaoGestorPDV(data.versao_gestorpdv || "")
      setVersaoGestores(data.versao_gestores || "")
      setVersaoSincdata(data.versao_sincdata || "")
      setIdUsuario(informacao_usuario?.id_usuario || "") 
      setFinalizado(data.finalizado || false) 
    }else {
      toast('Erro ao buscar informações.')
    }
    } catch (err) {
      toast.error("Erro ao buscar os dados.");
      console.error(err);      
    }
  }

  async function detalharitem(id_item_release : string){
  const token = await getCookieServer();
  try {
    const{data} = await api.get(`/detalharreleaseitem/${id_item_release}`,{ 
      headers:{
        Authorization: `Bearer ${token}`,
      },
    });
    if(data) {
      setIdItemRelease(data.id_item_release || "")
      setNomeItemRelease(data.nome_release || "")
      setIdSistema(data.id_sistema || "")
      setidModulo(data.id_modulo || null)
      setIdSubmodulo(data.id_submodulo || "")
      setcorrecao(data.correcao || "")
      setalteracao(data.alteracao || "")
      setobservacao(data.observacao || "")
    }
  } catch (err) {
    toast.error("Erro ao buscar os dados.");
    console.error(err);  
  }
  }

  const limparCampos = () => {
    setIdItemRelease(null);
    setIdSistema('');
    setidModulo('');
    setIdSubmodulo('');
    setNomeItemRelease('');
    setcorrecao(false);
    setalteracao(false);
    setobservacao('');
  };

  const handlebuscar = async () => {
    const filtros = {
      id_release: id_release ? parseInt(id_release, 10) : undefined,
    }
    const Itemrelease = await buscaDados('/listarreleaseitem', filtros)
    setItemRelease(Itemrelease);
  }

  useEffect (() => {
    if(id_release){
      handlebuscar();
    }
  },[id_release])

  const btnIncluirItem = async () => {
    if(!id_release){
      const token = await getCookieServer();
      
      try {
        await api.post('/criarrelease', {
          numero_release , 
          versao_gestores, 
          versao_sincdata, 
          versao_gestorpdv, 
          versao_balcao,
          id_usuario : informacao_usuario?.id_usuario,
          finalizado : Boolean(finalizado)
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        toast('Cadastrado com Sucesso')
      } catch (error) {
        toast( 'Erro ao cadastrar Release')
        throw new Error('Erro ao cadastrar Release')
      }
    }

    setExibirInclusaoItem(true)
    limparCampos();
  }

  const btnGravarItem = async () => {

    if(!id_item_release){
    const token = await getCookieServer();
    try {
      await api.post("/criarreleaseitem", {
        nome_release : nomeItemRelease, 
        numero_release, 
        id_release, 
        id_sistema, 
        id_modulo, 
        id_submodulo,
        correcao, 
        alteracao, 
        observacao
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }) 
      toast.success("Gravado com sucesso.");
    } catch (error) {
      toast('Erro ao criar Item da Release')
      throw new Error('Erro ao criar Item da Release')
      
    }
    }else {
      try {
        const token = await getCookieServer();
        await api.put("/atualizarreleaseitem", {
          id_item_release,
          nome_release : nomeItemRelease, 
          numero_release, 
          id_release, 
          id_sistema, 
          id_modulo, 
          id_submodulo,
          correcao, 
          alteracao, 
          observacao
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })    
        toast.success("Atualizado com sucesso."); 
      } catch (error) {
        toast('Erro o atualizar Item da Release')
        throw new Error('Erro ao atualizar Item da Release')
      }
 
    }
    setExibirInclusaoItem(false)
    limparCampos();
    handlebuscar();
  }

  const btnAlterarItem = (id_item_release: string) => {
    setExibirInclusaoItem(true)
    detalharitem(String(id_item_release))
 
  }

  const btnCancelarInclusaoItem = () => {
    setExibirInclusaoItem(false)
    limparCampos();
  }

  const btnGravar = () =>{
    
  }

  const btncancelar = ()=>{
    router.push('/cadastros/releases')
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
            <button className={`${estiloGlobal.btn} ${estiloGlobal.incluir}`} >Gravar</button>
            <button className={`${estiloGlobal.btn} ${estiloGlobal.excluir}`} onClick={btncancelar}>Cancelar</button>
          </div>
       </div>

       <form className={estiloGlobal.formCadastro}>
          <div className={estiloGlobal.gridCadastros}>
            <div className={estiloGlobal.checks}>
              <div>
                <label>Numero Release: </label>
                <input 
                  required={true}
                  type='number' 
                  className={estiloGlobal.inputPesquisa} 
                  placeholder='Numero'
                  style={{width: '130px', appearance: 'none', WebkitAppearance: 'none'}}
                  value={numero_release}
                  onChange={(e) => setnumeroRelease((e).target.value) }
                />
              </div>

             <div>
              <label>Modo: </label>
              <select 
                className={estiloGlobal.inputPesquisaSelect} 
                value={String(finalizado)}
                onChange={(e) => setFinalizado((e).target.value)}
              >
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
                  required
                    type='text' 
                    className={estiloGlobal.inputPesquisa} 
                    placeholder='Versão Gestores'
                    style={{width: '160px'}}
                    value={versao_gestores}
                    onChange={(e) => setVersaoGestores((e).target.value) }
                  />
                </div>

                <div>
                  <label>Versão GestorPDV: </label>
                  <input 
                  required
                    type='text' 
                    className={estiloGlobal.inputPesquisa} 
                    placeholder='Versão GestorPDV'
                    style={{width: '160px'}}
                    value={versao_gestorpdv}
                    onChange={(e) => setVersaoGestorPDV((e).target.value) }
                  />
                </div>

                <div>
                <label>Versão Sincdata: </label>
                <input 
                required
                  type='text' 
                  className={estiloGlobal.inputPesquisa} 
                  placeholder='Versão Sincdata'
                  style={{width: '160px'}}
                  value={versao_sincdata}
                  onChange={(e) => setVersaoSincdata((e).target.value) }
                />
                </div>

                <div>
                  <label>Versão balcão: </label>
                  <input 
                  required
                    type='text' 
                    className={estiloGlobal.inputPesquisa} 
                    placeholder='Versão balcão'
                    style={{width: '160px'}}
                    value={versao_balcao}
                    onChange={(e) => setVersaoBalcao((e).target.value) }
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
            {
              itemrelease.map((item) =>(
                <tbody>
                <tr className={estiloGlobal.griditens} key={item.id_item_release}>
                <td data-label="Nome">{item.id_item_release}</td>
                <td data-label="Nome">{item.nome_release}</td>
                <td data-label="Sistema">{item.nome_sistema}</td>
                <td data-label="Modulo">{item.nome_modulo}</td>
                <td data-label="SubModulo">{item.nome_submodulo}</td>
                <td>
                  <button 
                      className={`${estiloGlobal.btn} ${estiloGlobal.alterar}`} 
                      onClick={() => btnAlterarItem(String(item.id_item_release))} 
                      >Alterar
                  </button>

                  <button 
                      className={`${estiloGlobal.btn} ${estiloGlobal.excluir}`}
                      
                      >{"Excluir"}
                  </button>
                </td>
                </tr>
          </tbody>
              ))
            }

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
                  value={id_sistema}
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
                  value={id_modulo}
                  onChange={(e) => {setidModulo(e.target.value)}}
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
                  value={id_submodulo}
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
                <input 
                type='checkbox'
                name='alteracao'
                checked={alteracao} 
                onChange={(e) => {setalteracao(e.target.checked)}}
                />
                <label style={{margin: '3px'}}>Alteração</label>
                </div>

                <div> 
                <input 
                type='checkbox'
                name='correcao'
                checked={correcao} 
                onChange={(e) => {setcorrecao(e.target.checked)}}
                />
                <label style={{margin: '3px'}}>Correção</label>
              </div>
            
              <div>
                <br/>
                <label>Digite as Alterações no sistema</label>
                <textarea 
                style={{width: '100%', height: '300px'}}
                className={estiloGlobal.inputPesquisa}
                value={observacao}
                onChange={(e) => setobservacao(e.target.value)}
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

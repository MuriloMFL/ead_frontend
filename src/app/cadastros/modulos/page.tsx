'use client'; 
import estiloGlobal from '../../page.module.scss'
import { Header } from '@/app/dashboard/componentes/header'
import { useEffect, useState } from 'react';
import { buscaDados } from '@/servicos/buscar';
import { ModuloProps } from '@/lib/modulo.type';
import { useRouter } from 'next/navigation';
import { excluirDados } from '@/servicos/excluir';

export default function CadastrarModulos(){
  const [status, setStatus] = useState<string>('true');
  const [idModulo, setIdModulo] = useState<string | null>(null) 
  const [nome_modulo, setNomeModulo] = useState<string>('')
  const [modulo, setModulo] = useState<ModuloProps[]>([])

    const handlebuscar = async () => {
        const filtros = {
          status: status === 'true' ? true : status === 'false' ? false : undefined,
          nome_modulo : nome_modulo,
        };
        const modulo = await buscaDados('/listarmodulo', filtros);
        setModulo(modulo)     
    };

    useEffect(()=>{
      handlebuscar();
    },[]);
    
    const router = useRouter();

    const handleincluir = () => {
      document.cookie = "id_modulo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      setIdModulo(null);
      router.push('/cadastros/modulos/incluir');
    }

    const handleExcluir = async (id_modulo : number) => {
      if(!id_modulo){
        console.error("ID do modulo inválido");
        return;
      }
      const response = await excluirDados('/trocarstatusmodulo', {id_modulo});
      if(response){
        handlebuscar();
      }
    }

    const handleAlterar = async (id_modulo: number) =>{
      document.cookie = `id_modulo=${id_modulo}; path=/; max-age=86400;`
      router.push("/cadastros/modulos/incluir");
    }

    return (
        <>
        <Header />

        <main className={estiloGlobal.dados}>
            <div className={estiloGlobal.titulo}>
                <h1>Cadastro de modulos</h1>
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
              placeholder="Pesquisar Modulos" 
              className={estiloGlobal.inputPesquisa} 
              value={nome_modulo}
              onChange={(e) => setNomeModulo(e.target.value)}
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
                <th scope="col">Modulo</th>
                <th scope="col">Sistema</th>
                <th scope="col" className="acoes">Ações</th>
              </tr>
            </thead>
            <tbody>
              {modulo.map((item)=> ( 
                <tr className={estiloGlobal.griditens} key={item.id_modulo}>
                  <td data-label="ID">{item.id_modulo}</td>
                  <td data-label="Modulo">{item.nome_modulo}</td>
                  <td data-label="Sistema">{item.nome_sistema}</td>               
                  <td>
                    <button 
                        className={`${estiloGlobal.btn} ${estiloGlobal.alterar}`} 
                        onClick={() => handleAlterar(Number(item.id_modulo))}
                        >Alterar
                    </button>
                    <button 
                        className={`${estiloGlobal.btn} ${item.status ? estiloGlobal.excluir : estiloGlobal.incluir}`}
                        onClick={() => handleExcluir((item.id_modulo))}
                        >{item.status ? "Excluir" : "Ativar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        </main>

        </>

    )
}
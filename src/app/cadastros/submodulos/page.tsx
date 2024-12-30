'use client'; 
import { useEffect, useState } from 'react';
import estiloGlobal from '../../page.module.scss'
import { Header } from '@/app/dashboard/componentes/header'
import { SubModuloProps } from '@/lib/submodulo.type';
import { buscaDados } from '@/servicos/buscar';
import { useRouter } from 'next/navigation';
import { excluirDados } from '@/servicos/excluir';

export default function CadastrarSubmodulo(){
    const [id_submodulo, setIdSubModulo] = useState<number | null >(null)
    const [nome_submodulo, setNomeSubModulo] = useState<string>('')
    const [nome_modulo, setNomeModulo] = useState<string>('')
    const [nome_sistema, setNomeSistema] = useState<string>('')
    const [status, setStatus] = useState<string>('true');
    const [submodulo, setSubModulo] = useState<SubModuloProps[]>([])
    const router = useRouter();

    const handleincluir = () => {
      document.cookie = "id_submodulo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      setIdSubModulo(null)
      router.push('/cadastros/submodulos/incluir')
    }

    const handleExcluir = async (id_submodulo: number) => {
      if(!id_submodulo){
        console.error("Id Não encontrado")
        return
      }

      const response = await excluirDados('/trocarstatussubmodulo', {id_submodulo})
      if(response){
        handlebuscar();
      }
    }

    const handlebuscar = async () => {
      const filtros ={
        status : status === 'true' ? true : status ==='false' ? false : true,
        nome_submodulo : nome_submodulo
      }
      const submodulo = await buscaDados('/listarsubmodulo', filtros);
      setSubModulo(submodulo);
    }

    useEffect ( ()=>{
      handlebuscar()
    },[])

    const handleAlterar = async (id_submodulo: number) =>{
      document.cookie = `id_submodulo=${id_submodulo}; path=/; max-age=86400;`
      router.push("/cadastros/submodulos/incluir");
    }

    return (
        <>
        <Header />

        <main className={estiloGlobal.dados}>
            <div className={estiloGlobal.titulo}>
                <h1>Cadastro de Submodulo</h1>
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
              placeholder="Pesquisar SubModulos" 
              className={estiloGlobal.inputPesquisa} 
              value={nome_submodulo}
              onChange={(e) => setNomeSubModulo(e.target.value)}
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
                <th scope="col">SubModulos</th>
                <th scope="col">Modulo</th>
                <th scope="col">Sistema</th>
                <th scope="col" className="acoes">Ações</th>
              </tr>
            </thead>
            <tbody>
              { submodulo.map((item) => (
                <tr className={estiloGlobal.griditens} key={item.id_submodulo}>
                <td data-label="ID">        {item.id_submodulo}</td>
                <td data-label="SubModulos">{item.nome_submodulo}</td>
                <td data-label="Modulos">   {item.nome_modulo}</td>
                <td data-label="Sistema">   {item.nome_sistema}</td>
                <td>
                  <button 
                      className={`${estiloGlobal.btn} ${estiloGlobal.alterar}`} 
                      onClick={() => handleAlterar(Number(item.id_submodulo))}
                      >Alterar
                  </button>
                  <button 
                      className={`${estiloGlobal.btn} ${item.status ? estiloGlobal.excluir : estiloGlobal.incluir}`}
                      onClick={() => handleExcluir((item.id_submodulo))}
                      >{item.status ? "Excluir": "Ativar"}
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
'use client'; 
import estiloGlobal from '../../page.module.scss'
import { Header } from '@/app/dashboard/componentes/header'
import { SistemaProps } from '@/lib/sistema.type';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { buscaDados } from '@/servicos/buscar';
import { excluirDados } from '@/servicos/excluir';

export default function CadastrarSistemas(){
  const [status, setStatus] = useState<string>('true');
  const [nome_sistema, setNomeSistema] = useState<string>('')
  const [sistema, setSistema] = useState<SistemaProps[]>([]) 
  const [idsistema, setIdsistema] = useState<string | null>(null) 
  
    const handlebuscar = async () => {
        const filtros = {
          status: status === 'true' ? true : status === 'false' ? false : undefined,
          nome_sistema: nome_sistema,
        };
        const sistema = await buscaDados('/listarsistema', filtros);
        setSistema(sistema)     
    };
    
    const router = useRouter();

    const handleincluir = () =>{
      document.cookie = "id_sistema=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      setIdsistema(null);
      router.push('/cadastros/sistemas/incluir');
    }

    const handleexcluir = async (id_sistema: number) => {
      if (!id_sistema) {
        console.error("ID do sistema inválido");
        return;
      }
      const response = await excluirDados('/trocarstatussistema', { id_sistema });

      if (response) {
        handlebuscar();
      }
    };

    const handleAlterar = async (id_sistema: number) => {
      document.cookie = `id_sistema=${id_sistema}; path=/; max-age=86400;`;
      router.push("/cadastros/sistemas/incluir");
    }

    useEffect(()=>{
      handlebuscar();
    },[]);

    return (
        <>
        <Header />

        <main className={estiloGlobal.dados}>
            <div className={estiloGlobal.titulo}>
                <h1>Cadastro de sistemas</h1>
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
              placeholder="Pesquisar Sistema" 
              className={estiloGlobal.inputPesquisa} 
              value={nome_sistema}
              onChange={(e) => setNomeSistema(e.target.value)}
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
                <th scope="col">Sistema</th>
                <th scope="col" className="acoes">Ações</th>
              </tr>
            </thead>
            <tbody>
            {sistema.map((item) => (
                <tr className={estiloGlobal.griditens} key={item.id_sistema}>
                  <td data-label="ID">{item.id_sistema}</td>
                  <td data-label="Sistema">{item.nome_sistema}</td>
                  <td>
                    <button 
                        className={`${estiloGlobal.btn} ${estiloGlobal.alterar}`}
                        onClick={() => handleAlterar(Number(item.id_sistema))}
                        >Alterar
                    </button>
                    <button 
                        className={`${estiloGlobal.btn} ${item.status ? estiloGlobal.excluir : estiloGlobal.incluir}`}
                        onClick={() => handleexcluir((item.id_sistema))}
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
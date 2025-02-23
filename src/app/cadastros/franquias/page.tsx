'use client'; 
import estiloGlobal from '../../page.module.scss';
import { Header } from '@/app/dashboard/componentes/header';
import { api } from '@/servicos/api';
import { getCookieServer } from '@/lib/cookieServidor';
import { FranquiaProps } from '@/lib/franquia.type';
import { useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { buscaDados } from '@/servicos/buscar';

export default function CadastrarFranquias() {

  const [status, setStatus] = useState<string>('true');
  const [nome, setNome] = useState<string>('');
  const [franquias, setFranquias] = useState<FranquiaProps[]>([]);
  const [idFranquia, setIdFranquia] = useState<string | null>(null);
  
  const handleBuscar = async () => {
    const filtros = {
      status: status === 'true' ? true : status === 'false' ? false : undefined,
      nome: nome 
    };

    const resultado = await buscaDados('/listarfranquia', filtros);
    setFranquias(resultado);
  };

  useEffect(() => {
    handleBuscar(); 
  }, []);

  const handleAlterar = async (id_franquia: number) => {
    document.cookie = `id_franquia=${id_franquia}; path=/; max-age=86400;`;
    router.push("/cadastros/franquias/incluir");
  }

  const handleExcluir = async (id_franquia: number) => {
    if (!confirm('Tem certeza de que deseja Trocar o status esta franquia?')) {
      return;
    }
    try {
      const token = await getCookieServer();
      await api.put(
        '/trocarstatusfranquia',
        { id_franquia },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Status da Franquia trocado com sucesso!');
      handleBuscar();
    } catch (err) {
      toast.error('Erro ao trocar status da franquia. Tente novamente.');
    }
  };

  const router = useRouter();

  const Incluir = () =>{
    document.cookie = "id_franquia=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    setIdFranquia(null);
    router.push('/cadastros/franquias/incluir');
  }

  return (
    <>
      <Header />
      <main className={estiloGlobal.dados}>
        <div className={estiloGlobal.titulo}>
          <h1>Cadastro de Franquias</h1>
        </div>

          <div className={estiloGlobal.barraFuncoes}>
          <div>
            <button className={`${estiloGlobal.btn} ${estiloGlobal.incluir}`} onClick={Incluir}>
              Incluir
            </button>
            <button className={`${estiloGlobal.btn} ${estiloGlobal.imprimir}`} onClick={() => window.print()}>Imprimir</button>
          </div>
          <form  onSubmit={(e) => { e.preventDefault(); handleBuscar(); }}>
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
              placeholder="Pesquisar franquia" 
              className={estiloGlobal.inputPesquisa} 
              value={nome} 
              onChange={(e) => setNome(e.target.value)}
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
                <th scope="col">Franquia</th>
                <th scope="col">Responsável</th>
                <th scope="col">Telefone</th>
                <th scope="col" className="acoes">Ações</th>
              </tr>
            </thead>
            <tbody>
              {franquias.map((item) => (
                <tr className={estiloGlobal.griditens} key={item.id_franquia}>
                  <td data-label="ID">{item.id_franquia}</td>
                  <td data-label="Franquia">{item.nome}</td>
                  <td data-label="Responsável">{item.responsavel}</td>
                  <td data-label="Telefone">{item.telefone}</td>
                  <td>
                    <button 
                        className={`${estiloGlobal.btn} ${estiloGlobal.alterar}`} 
                        onClick={() => handleAlterar(Number(item.id_franquia))}
                        >Alterar
                    </button>
                    <button 
                        className={`${estiloGlobal.btn} ${item.status ? estiloGlobal.excluir : estiloGlobal.incluir}`}
                        onClick={() => handleExcluir(Number(item.id_franquia))}
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
  );
}

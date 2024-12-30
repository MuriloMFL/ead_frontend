'use client'; 

import estilo from './page.module.scss';
import estiloGlobal from '../../page.module.scss';
import { Header } from '@/app/dashboard/componentes/header';
import { api } from '@/servicos/api';
import { getCookieServer } from '@/lib/cookieServidor';
import { FranquiaProps } from '@/lib/franquia.type';
import { useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';

async function buscarFranquias(filtros: { status?: boolean; nome?: string; responsavel?: string }): Promise<FranquiaProps[]> {
  try {
    const token = await getCookieServer();
    const { status, nome, responsavel } = filtros;

    const response = await api.get('/listarfranquia', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { status, nome, responsavel },  
    });

    return response.data || [];
  } catch (err) {
    console.error('Erro ao buscar franquias:', err);
    return [];
  }
}

export default function CadastrarFranquias() {
  
  const [status, setStatus] = useState<string>('true');
  const [nome, setNome] = useState<string>('');
  const [franquias, setFranquias] = useState<FranquiaProps[]>([]);

  // Função para lidar com o envio do formulário
  const handleBuscar = async () => {
    const filtros = {
      status: status === 'true' ? true : status === 'false' ? false : undefined,
      nome: nome 
    };

    const resultado = await buscarFranquias(filtros);
    setFranquias(resultado);
  };
  useEffect(() => {
    handleBuscar(); 
  }, []);

  const handleExcluir = async (id_franquia: number) => {
    if (!confirm('Tem certeza de que deseja inativar esta franquia?')) {
      return;
    }
    try {
      const token = await getCookieServer();
      console.log('ID enviado:', id_franquia);
      await api.put(
        '/inativarfranquia',
        { id_franquia },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('ID enviado:', id_franquia);
      alert('Franquia inativada com sucesso!');
      handleBuscar();
    } catch (err) {
      console.error('Erro ao inativar franquia:', err);
      alert('Erro ao inativar a franquia. Tente novamente.');
    }
  };

  const router = useRouter();
  const Incluir = async() =>{
    router.push('/cadastros/franquias/incluir');
  }

  return (
    <>
      <Header />
      <main className={estiloGlobal.dados}>
        <div className={estiloGlobal.titulo}>
          <h1>Cadastro de Franquias</h1>
        </div>

        <form className={estiloGlobal.barraFuncoes} onSubmit={(e) => { e.preventDefault(); handleBuscar(); }}>
          <div>
            <button className={`${estiloGlobal.btn} ${estiloGlobal.incluir}`} onClick={Incluir}>
              Incluir
            </button>
            <button className={`${estiloGlobal.btn} ${estiloGlobal.imprimir}`}>Imprimir</button>
          </div>

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

        <section className={estiloGlobal.grid}>
          <table>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Franquia</th>
                <th scope="col">Responsável</th>
                <th scope="col">Telefone</th>
                <th scope="col">Ações</th>
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
                    <button className={`${estiloGlobal.btn} ${estiloGlobal.alterar}`}>Alterar</button>
                    <button className={`${estiloGlobal.btn} ${estiloGlobal.excluir}`} 
                            onClick={() => handleExcluir(Number(item.id_franquia))}
                    >Excluir</button>
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

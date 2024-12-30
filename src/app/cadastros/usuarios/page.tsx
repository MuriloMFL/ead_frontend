'use client'; 
import { useEffect, useState } from 'react';
import estiloGlobal from '../../page.module.scss'
import { Header } from '@/app/dashboard/componentes/header'
import { UsuarioProps } from '@/lib/usuario.type';
import { useRouter } from 'next/navigation';
import { buscaDados } from '@/servicos/buscar';
import { excluirDados } from '@/servicos/excluir';

export default function CadastrarUsuarios(){
    const [id_usuario, setIdUsuario] = useState<string | null>(null)
    const [nome_usuario, setNomeUsuario] = useState<string>('')
    const [status, setStatus] = useState<string>('true')
    const [usuario, setUsuario] = useState<UsuarioProps[]>([])
    const router = useRouter();

    const handleincluir = () => {
      document.cookie = "id_usuario=; path=/; expires=Thu, 1 Jan 1970 00:00:00 UTC"
      setIdUsuario(null)
      router.push('/cadastros/usuarios/incluir')
    }

    const handleExcluir = async (id_usuario: number) => {
      if(!id_usuario){
        alert("ID do modulo inválido");
        return;
      }
      const response = await excluirDados('/trocarstatususuario', {id_usuario})
      if(response){
        handlebuscar();
      }
    }

    const handleAlterar = (id_usuario: number) =>{
      document.cookie = `id_usuario=${id_usuario}; max-age=86000`;
      router.push('/cadastros/usuarios/incluir')
    }

    const handlebuscar = async () => {
      const filtros = {
        id_usuario: id_usuario,
        nome_usuario: nome_usuario,
        status: status ==='true' ? true : status ==='false' ? false : undefined
      }
      const response = await buscaDados('/listarusuarioporfranquia', filtros)
      setUsuario(response)
    }

    useEffect ( () => {
      handlebuscar()
    }, [])
    return (
        <>
        <Header />

        <main className={estiloGlobal.dados}>
            <div className={estiloGlobal.titulo}>
                <h1>Cadastro de Usuarios</h1>
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
              placeholder="Pesquisar usuario" 
              className={estiloGlobal.inputPesquisa} 
              value={nome_usuario}
              onChange={(e) => setNomeUsuario(e.target.value)}
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
                <th scope="col">Nome</th>
                <th scope="col">email</th>
                <th scope="col">login</th>
                <th scope="col">franquia</th>
                <th scope="col" className="acoes">Ações</th>
              </tr>
            </thead>
            <tbody>
              {
                usuario.map ( (item) => (
                  <tr className={estiloGlobal.griditens} key={item.id_usuario}>
                  <td data-label="ID">{item.id_usuario}</td>
                  <td data-label="Nome">{item.nome_usuario}</td>
                  <td data-label="email">{item.email}</td>
                  <td data-label="login">{item.login}</td>
                  <td data-label="franquia">{item.nome_franquia}</td>
                  <td>
                    <button 
                        className={`${estiloGlobal.btn} ${estiloGlobal.alterar}`} 
                        onClick={() => handleAlterar(item.id_usuario)}
                        >Alterar
                    </button>
                    <button 
                        className={`${estiloGlobal.btn} ${item.status ? estiloGlobal.excluir : estiloGlobal.incluir}`}
                        onClick={() => handleExcluir(item.id_usuario)}
                        >{item.status ? "Excluir":"Ativar"}
                    </button>
                  </td>
                </tr>
                ))
              }

            </tbody>
          </table>
        </section>
        </main>

        </>

    )
}
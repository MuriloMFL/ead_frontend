"use client"
import estiloGlobal from '../../../page.module.scss';
import { Header } from '@/app/dashboard/componentes/header';
import { api } from '@/servicos/api';
import { getCookieServer } from '@/lib/cookieServidor';
import { useState, useEffect} from 'react';
import { buscaDados } from '@/servicos/buscar';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { FranquiaProps } from '@/lib/franquia.type';

export default function IncluirUsuario() {
  const [id_usuario, setIdUsuario]                 = useState<string | null>(null);
  const [nome_usuario, setNomeUsuario]             = useState<string>('');
  const [email, setEmail]                          = useState<string>('');
  const [login, setLogin]                          = useState<string>('');
  const [senha, setSenha]                          = useState<string>('');
  const [id_franquia, setIdFranquia]               = useState<string>('');
  const [tipo_usuario, setTipoUsuario]             = useState<string>('');
  const [franquia, setFranquia]                    = useState<FranquiaProps[]>([]);
  const router = useRouter();

    useEffect (() => {
      const cookies = document.cookie
        .split('; ')
        .find(row => row.startsWith('id_usuario='))
        ?.split('=')[1]
        setIdUsuario(cookies || null);

        if(cookies){
          detalharusuario(cookies)
        }
    }, [])
    
    async function detalharusuario(id_usuario: string){
      const token = await getCookieServer();
      try {
        const { data } = await api.get(`/detalharcadusuario/${id_usuario}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }        
        });

        if (data) {
          setIdUsuario(data.id_usuario || "")
          setNomeUsuario(data.nome_usuario || "");
          setEmail(data.email || "")
          setLogin(data.login || "")
          setSenha(data.senha || "")
          setIdFranquia(data.id_franquia || "")
          setTipoUsuario(data.tipo_usuario || "")
        } else {
          toast.warn("Nenhum Usuario encontrada para o ID fornecido.");
        }
      } catch (err) {
        toast.error("Erro ao buscar os dados do Usuario.");
        console.error(err);
      }
    }

    async function btngravar(){
        
        if(!id_usuario){
          const token = await getCookieServer();
          try {
            await api.post(
              "/usuario/criar",
              { 
                nome_usuario,
                email,
                login,
                senha,
                id_franquia,
                tipo_usuario
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            toast.success("Gravado com sucesso.");
            router.push("../../cadastros/usuarios");
          } catch {
            new Error('Erro');
          }
        }else {
        try {
          const token = await getCookieServer();
          await api.put(
            "/atualizarusuario",
            { 
              id_usuario,
              nome_usuario,
              email,
              login,
              senha,
              id_franquia,
              tipo_usuario},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          toast.success("Gravado com sucesso.");
          router.push("../../cadastros/usuarios");
        } catch (err: any) {
          throw new Error('Erro ao atualizar Usuarios')
        }        
        }
      }

    const selecionarFranquia = async () => {
      const filtros = {
        status: true,
      };
      const franquia = await buscaDados('/listarfranquia', filtros);
      setFranquia(franquia);
    };
  
    useEffect(() => {
      selecionarFranquia();
    }, []);

    const btnCancelar = () => {
      document.cookie = "id_usuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      setIdUsuario(null);
      router.push('../../cadastros/usuarios');
    };   
  return (
    <>
      <Header />
      <main className={estiloGlobal.dados}>
       <div className={estiloGlobal.titulo}>
          <h1>Incluir Usuarios</h1>
       </div>

       <div className={estiloGlobal.barraFuncoes}>
          <div>
            <button className={`${estiloGlobal.btn} ${estiloGlobal.incluir}`} onClick={btngravar}>Gravar</button>
            <button className={`${estiloGlobal.btn} ${estiloGlobal.excluir}`} onClick={btnCancelar}>Cancelar</button>
          </div>
       </div>

       <form className={estiloGlobal.formCadastro}>
          <div>
              <div>
              <h4>Franquia: </h4>
              <select 
                  required
                  className={estiloGlobal.inputPesquisaSelectForm}
                  name='id_franquia'
                  value={id_franquia}
                  onChange={(e) => {setIdFranquia(e.target.value)}}
                 >
                  <option value="" disabled>
                    Selecione um Sistema
                  </option>
                  {franquia.map( (item) =>(
                    <option key={item.id_franquia} value={item.id_franquia}>
                      {item.nome}
                    </option>                    
                  ))}
                </select>
              </div>

              <div>
                <h4>Nome do usuario</h4>
                <input 
                    required
                    type="text"  
                    className={estiloGlobal.inputPesquisa}
                    placeholder='Nome do Usuario'
                    value={nome_usuario}
                    onChange={(e) => {setNomeUsuario(e.target.value)}}
                />
              </div>

              <div>
                <h4>Email: </h4>
                <input 
                    required
                    type="email"  
                    className={estiloGlobal.inputPesquisa} 
                    placeholder='Email'
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                />
              </div>
              
              <div>
                <h4>Login</h4>
                <input 
                    required
                    type="text"  
                    className={estiloGlobal.inputPesquisa} 
                    placeholder='Login'
                    value={login}
                    onChange={(e) => {setLogin(e.target.value)}}
                />
              </div>

              <div>
                <h4>Senha: </h4>
                <input 
                    required
                    type="password"  
                    className={estiloGlobal.inputPesquisa} 
                    placeholder='Senha'
                    value={senha}
                    onChange={(e) => {setSenha(e.target.value)}}
                />
              </div>
              
              <h4>Grupo de Usuario: </h4>
              <select value={tipo_usuario} onChange={(e) => {setTipoUsuario(e.target.value)}} className={estiloGlobal.inputPesquisaSelectForm} >
                <option value='TECNICO'>TECNICO</option>
                <option value='SUPERVISOR'>SUPERVISOR</option>
                <option value='CQS'>CQS</option>
                <option value='ADMINISTRADOR'>ADMINISTRADOR</option>
              </select>
          </div>
       </form>

      </main>
    </>
  );
}

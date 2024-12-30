import styles   from "../page.module.scss";
import logoImg  from "/public/Logo.png"
import Image    from "next/image";
import { api }  from "@/servicos/api";
import { Header } from "../dashboard/componentes/header";

export default function cadastrarusuario(){
    
    async function handleRegistrarUsuario(formData: FormData){
        "use server"
        const nome_usuario = formData.get("nomeusuario")
        const email        = formData.get("email")
        const login        = formData.get("login")
        const senha        = formData.get("senha")
        const id_franquia  = Number(formData.get("id_franquia"))
        const tipo_usuario = formData.get("tipo_usuario")
        const status       = true
        
        try {
            await api.post("/usuario/criar",{
                nome_usuario,
                email,
                login,
                senha,
                id_franquia,
                tipo_usuario,
                status
            })
        }catch(err: any){
            console.log(err)
        }
    }

    return(
    <div>
      <Header />

    <div className={styles.conteinerCentral}>
        
        <section className={styles.login}>
        <div className={styles.toplogin}>
          <Image 
            src={logoImg}
            alt="Logo Ead Brajan"
          />
        </div>

        <form action={handleRegistrarUsuario}>
          <input 
            type="text"
            required
            name="nomeusuario"
            placeholder="Nome completo"
          />
          <input 
            type="email"
            required
            name="email"
            placeholder="Digite seu email"
          />
          <input 
            type="text"
            required
            name="login"
            placeholder="Digite seu Login"
          />
          <input 
            type="password"
            required
            name="senha"
            placeholder="Digite sua senha"
          />       
          <input 
            type="number"
            required
            name="id_franquia"
            placeholder="Franquia"
          />
          <input 
            type="text"
            required
            name="tipo_usuario"
            placeholder="Permissão do usuario"
          />

          <button type="submit">
            Cadastrar
          </button>
        </form>
      </section>
    </div>
    </div>
    )
}
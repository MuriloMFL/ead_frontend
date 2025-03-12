import { api }  from "@/servicos/api";
import styles   from "./page.module.scss";
import logoImg  from "/public/Logo.png"
import Image    from "next/image";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Home() {
  async function handleLogin(formData: FormData){
    "use server"

    const login = formData.get("login")
    const senha = formData.get("senha")

    try {
        const response = await api.post("/logarusuario", {
        login,
        senha
      })

      const temposessao = 60 * 60 * 24;
      const cookiesInstance = await cookies();
      cookiesInstance.set("sessaoEad", response.data.token, {
        maxAge: temposessao,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production"
      })

      cookiesInstance.set("userInfo", JSON.stringify({
        id: response.data.id,
        nome_usuario: response.data.nome_usuario,
        tipo_usuario: response.data.tipo_usuario,
        email: response.data.email,
        login: response.data.login,
        id_franquia: response.data.id_franquia,
    }), {
        maxAge: temposessao,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
    });
    }catch(err: any){
      console.log(err)
    }

    redirect("/releases")
  }

  return (
    <div className={styles.conteinerCentral}>

      <section className={styles.login}>
        <div className={styles.toplogin}>
          <Image 
            src={logoImg}
            alt="Logo Ead Brajan"
          />
        </div>

        <form action={handleLogin}>
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
          
          <button type="submit">
            Acessar
          </button>
        </form>
      </section>
    </div>
  );
}

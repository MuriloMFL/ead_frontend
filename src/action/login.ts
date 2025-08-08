'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { api } from "@/servicos/api";

export async function handleLogin(formData: FormData): Promise<void> {
  const login = formData.get("login")?.toString() || "";
  const senha = formData.get("senha")?.toString() || "";

  if (!login || !senha) {
    console.error("Login ou senha ausente.");
    return;
  }

  try {
    const response = await api.post("/logarusuario", {
      login,
      senha
    });

    const tempoSessao = 60 * 60 * 24; // 1 dia

    const cookieStore = await cookies();

    cookieStore.set("sessaoEad", response.data.token, {
      maxAge: tempoSessao,
      path: "/",
      httpOnly: false,
      secure: process.env.NODE_ENV === "production"
    });

    cookieStore.set("userInfo", JSON.stringify({
      id: response.data.id,
      nome_usuario: response.data.nome_usuario,
      tipo_usuario: response.data.tipo_usuario,
      email: response.data.email,
      login: response.data.login,
      id_franquia: response.data.id_franquia,
    }), {
      maxAge: tempoSessao,
      path: "/",
      httpOnly: false,
      secure: process.env.NODE_ENV === "production"
    });

    redirect("/releases");

  } catch (error: any) {
    console.log("Erro ao logar:", error);
    
  }
  redirect("/releases");
}

'use client';

import styles from "./page.module.scss";
import logoImg from "/public/Logo.png";
import Image from "next/image";
import { handleLogin } from "@/action/login";

export default function Home() {
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
            name="login"
            placeholder="Digite seu Login"
            required
          />

          <input 
            type="password"
            name="senha"
            placeholder="Digite sua senha"
            required
          />

          <button type="submit">
            Acessar
          </button>
        </form>
      </section>
    </div>
  );
}

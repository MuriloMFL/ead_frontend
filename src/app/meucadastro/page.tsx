"use client"
import styles from './styles.module.scss'
import estiloGlobal from '../page.module.scss'
import { Header } from '@/app/dashboard/componentes/header'
import Link from 'next/link';
import { useEffect, useState } from "react";

export default function Meucadastro(){
    const [userInfo, setUserInfo] = useState<{ nome_usuario: string; tipo_usuario: string; login: string; id_franquia: number; email: string } | null>(null);

    useEffect(() => {
        const cookie = document.cookie
            .split("; ")
            .find(row => row.startsWith("userInfo="));
    
        if (cookie) {
            const userInfoValue = JSON.parse(decodeURIComponent(cookie.split("=")[1]));
            console.log("Cookie recuperado:", userInfoValue); 
            setUserInfo(userInfoValue);
        } else {
            console.log("Cookie userInfo não encontrado!");
        }
        console.log("Estado userInfo no componente:", userInfo);
    }, []);

const permissions: Record<'TECNICO' | 'SUPERVISOR' | 'CQS' | 'ADMINISTRADOR', JSX.Element[]> = {
    TECNICO: [],
    SUPERVISOR: [<Link key="usuarios" href="/cadastros/usuarios">Usuário</Link>],
    CQS: [<Link key="release" href="/cadastros/releases">Release</Link>],
    ADMINISTRADOR: [
        <Link key="aulas" href="/cadastros/aulas">Aulas</Link>,
        <Link key="provas" href="/cadastros/provas">Provas</Link>,
        <Link key="usuarios" href="/cadastros/usuarios">Usuário</Link>,
        <Link key="franquias" href="/cadastros/franquias">Franquias</Link>,
        <Link key="questoes" href="/cadastros/questoes">Questões</Link>,
        <Link key="videos" href="/cadastros/videos">Vídeos</Link>,
        <Link key="faqs" href="/cadastros/faqs">FAQs</Link>,
        <Link key="releases" href="/cadastros/releases">Release</Link>,
        <Link key="sistemas" href="/cadastros/sistemas">Sistemas</Link>,
        <Link key="modulos" href="/cadastros/modulos">Modulos</Link>,
        <Link key="submodulos" href="/cadastros/submodulos">SubModulos</Link>,
        <Link key="planejamentos" href="/cadastros/planejamentos">Planejamento</Link>,
    ]
};

const isValidUserType = (tipo: string): tipo is keyof typeof permissions => {
    return tipo in permissions;
};

const navLinks = userInfo && isValidUserType(userInfo.tipo_usuario) ? permissions[userInfo.tipo_usuario] : [];
    return (
        <>
        <Header />
        <main className={estiloGlobal.dados}>
            <div className={styles.headerContainer}>
            <div className={styles.headerConteudo}>
            <nav className={styles.headerNav}>
                            {navLinks}
            </nav>

            </div>
            </div>
            <div className={estiloGlobal.titulo}>
                <h1>Meu Cadastro</h1>
            </div>

                <div className={estiloGlobal.formCadastro}>
                    <table>
                    <tbody>
                        <tr>
                            <td><label>Nome: </label></td>
                            <td><input type='text' className={estiloGlobal.inputPesquisa} readOnly value={userInfo?.nome_usuario || ""}/></td>
                        </tr>
                        <tr>
                            <td><label>Usuário: </label></td>
                            <td><input type='text' className={estiloGlobal.inputPesquisa} readOnly value={userInfo?.login || ""}/></td>
                        </tr>
                        <tr>
                            <td><label>Email: </label></td>
                            <td><input type='text' className={estiloGlobal.inputPesquisa} readOnly value={userInfo?.email || ""}/></td>
                        </tr>
                        <tr>
                            <td><label>Franquia: </label></td>
                            <td><input type='text' className={estiloGlobal.inputPesquisa} readOnly value={userInfo?.id_franquia || ""}/></td>
                        </tr>
                        <tr>
                            <td><label>Grupo Usuario: </label></td>
                            <td><input type='text' className={estiloGlobal.inputPesquisa} readOnly value={userInfo?.tipo_usuario || ""}/></td>
                        </tr>
                    </tbody>
                    </table>
                </div>
        </main>

        </>

    )
}
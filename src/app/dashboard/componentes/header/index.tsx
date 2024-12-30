"use client";
import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import logoImg from '/public/logo.png';
import { CircleUserRound, LogOutIcon } from 'lucide-react';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export function Header() {

    const rota = useRouter();

    async function HandleSair() {
        deleteCookie("sessaoEad", { path: "/" });
        rota.replace("/");
    }

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerConteudo}>
                <Link href="/dashboard">
                    <Image
                        alt="Logo Gestores Ead"
                        src={logoImg}
                        width={200}
                        height={50}
                        priority={true}
                        style={{ borderRadius: '4px' }}
                    />
                </Link>
                
                <nav className={styles.headerNav}>
                    <Link href="/dashboard">Dashboard</Link>
                    <Link href="/aulas">Aulas</Link>
                    <Link href="/videos">Videos</Link>
                    <Link href="/faqs">Faqs</Link>
                    <Link href="/questoes">Questões</Link>
                    <Link href="/provas">Provas</Link>

                    <div className={styles.dropdown}>
                        <span className={styles.dropdownLink}>Cadastros</span>
                        <div className={styles.dropdownContent}>
                            <Link href="/cadastros/aulas">Aulas</Link>
                            <Link href="/cadastros/provas">Provas</Link>
                            <Link href="/cadastros/usuarios">Usuário</Link>
                            <Link href="/cadastros/franquias">Franquias</Link>
                            <Link href="/cadastros/questoes">Questões</Link>
                            <Link href="/cadastros/videos">Vídeos</Link>
                            <Link href="/cadastros/faqs">FAQs</Link>
                            <Link href="/cadastros/release">Release</Link>
                        </div>
                    </div>

                    <Link href="/meucadastro" className={styles.usuario}>
                        <CircleUserRound size={40} color="#FFF" />
                        <p>Usuario</p>
                    </Link>

                    <form action={HandleSair}>
                        <button type="submit">
                            <LogOutIcon size={24} color="#FFF" />
                        </button>
                    </form>
                </nav>
            </div>
        </header>
    );
}

"use client";
import styles from './styles.module.scss' ; 
import Link from 'next/link';
import Image from 'next/image';
import logoImg from '/public/Logo.png';
import { CircleUserRound, LogOutIcon } from 'lucide-react';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';

export function Header() {
    const rota = useRouter();

    async function HandleSair() {
        deleteCookie("sessaoEad", { path: "/" });
        rota.replace("/");
    }

    const navRef = useRef<HTMLDivElement | null>(null);

    function toggleMenu() {
        if (navRef.current) {
            navRef.current.classList.toggle(styles.showMenu);
        } else {
            console.error("Ref não encontrou o elemento!");
        }
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
                <div className={styles.icon} onClick={toggleMenu}>
                 ☰
                </div>             
                <nav ref={navRef} className={styles.headerNav}>
                    <Link href="/dashboard">Dashboard</Link>
                    {/*<Link href="/releases">Releases</Link>*/}
                    {/*<Link href="/aulas">Aulas</Link>*/}
                    <Link href="/videos">Videos</Link>
                    {/*<Link href="/faqs">Faqs</Link>*/}
                    <Link href="/provas">Simulados</Link>

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

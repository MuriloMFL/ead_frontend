import estilo from './page.module.scss'
import estiloGlobal from '../page.module.scss'
import { Header } from '@/app/dashboard/componentes/header'

export default function Meucadastro(){
    return (
        <>
        <Header />

        <main className={estiloGlobal.dados}>
            <div className={estiloGlobal.titulo}>
                <h1>Meu Cadastro</h1>
            </div>
        </main>

        </>

    )
}
import estilo from './page.module.scss'
import estiloGlobal from '../page.module.scss'
import { Header } from '../dashboard/componentes/header'

export default function Provas(){
    return (
        <>
        <Header />
        <main className={estiloGlobal.dados}>
            <div className={estiloGlobal.titulo}>
                <h1>Provas</h1>
            </div>
        </main>

        </>

    )
}
import estilo from './page.module.scss'
import estiloGlobal from '../page.module.scss'
import { Header } from '../dashboard/componentes/header'

export default function Questoes(){
    return (
        <>
        <Header />

        <main className={estiloGlobal.dados}>
            <div className={estiloGlobal.titulo}>
                <h1>Questões</h1>
            </div>
        </main>

        </>

    )
}
import estilo from './page.module.scss'
import estiloGlobal from '../page.module.scss'
import { Header } from '../dashboard/componentes/header'

export default function Videos(){
    return (
        <>
        <Header />
        <main className={estiloGlobal.dados}>
            <div className={estiloGlobal.titulo}>
                <h1>Videos</h1>
            </div>
        </main>

        </>

    )
}
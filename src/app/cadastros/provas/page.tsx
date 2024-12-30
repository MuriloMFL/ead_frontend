import estilo from './page.module.scss'
import estiloGlobal from '../../page.module.scss'
import { Header } from '@/app/dashboard/componentes/header'

export default function CadastrarProvas(){
    return (
        <>
        <Header />
        
        <main className={estiloGlobal.dados}>
            <div className={estiloGlobal.titulo}>
                <h1>Cadastro de Provas</h1>
            </div>
        </main>

        </>

    )
}
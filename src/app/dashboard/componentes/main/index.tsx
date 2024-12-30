import estiloGlobal   from "../../../page.module.scss";
import estiloLocal   from "./page.module.scss"

export function DashboardPrincipal(){
    return(
        <main className={estiloGlobal.dados}>
            <div className={estiloGlobal.titulo}>
                <h1>Dashboard</h1>
            </div>
            
            <div className={estiloLocal.modulos}>
                <div className={estiloLocal.amostra}>
                    <div className={estiloLocal.tituloAmostras}><h3>Modulos</h3></div>
                    <h1 className={estiloLocal.dadosAmostra}>50%</h1>
                    <p className={estiloLocal.dadosrodape}>15 de 30 modulos concluidos</p>
                </div>
                <div className={estiloLocal.amostra}>
                    <div className={estiloLocal.tituloAmostras}><h3>Sub-Modulos</h3></div>
                    <h1 className={estiloLocal.dadosAmostra}>60%</h1>
                    <p className={estiloLocal.dadosrodape}> 89 Sub-modulos concluidos</p>

                </div>
                <div className={estiloLocal.amostra}>
                    <div className={estiloLocal.tituloAmostras}><h3>Aulas</h3></div>
                    <h1 className={estiloLocal.dadosAmostra}>87%</h1>
                    <p className={estiloLocal.dadosrodape}>110 aulas concluidos</p>
                </div>
                <div className={estiloLocal.amostra}>
                    <div className={estiloLocal.tituloAmostras}><h3>Questões</h3></div>
                    <h1 className={estiloLocal.dadosAmostra}>90%</h1>
                    <p className={estiloLocal.dadosrodape}>de acertos</p>
                </div>

                <div className={estiloLocal.amostra}>
                    <div className={estiloLocal.tituloAmostras}><h3>Provas</h3></div>
                    <h1 className={estiloLocal.dadosAmostra}>87%</h1>
                    <p className={estiloLocal.dadosrodape}>5 Provas feitas</p>
                </div>

            </div>
        </main>
    )
}
import { Header } from "./componentes/header"

export default function DashboardLayout({children}: 
    {children: React.ReactNode}
){
    return (
        <>
        <Header />
        {children}
        </>
    )
}
"use client"
import estiloGlobal from '../page.module.scss'
import { Header } from '../dashboard/componentes/header'
import { useEffect, useState } from 'react'
import { buscaDados } from '@/servicos/buscar'
import { useRouter } from 'next/navigation'
import { provaProps } from '@/lib/prova.types'
import useUserInfo from '@/servicos/useUserInfo'
import { toast } from 'react-toastify'

export default function Provas(){
  const [id_prova, setIdProva]     = useState<string | null>(null)
  const [id_usuario, setIdUsuario] = useState<string>('');
  const [nome_prova, setNomeProba] = useState<string>('')
  const [status, setStatus]        = useState<string>('true')
  const [prova, setProva]          = useState<provaProps[]>([])
  const informacao_usuario         = useUserInfo();
  const router                     = useRouter();

    useEffect(() => {
      if (informacao_usuario?.id_usuario) {
        setIdUsuario(String(informacao_usuario?.id_usuario));
      }
    }, [informacao_usuario]);

    const handlebuscar = async () => {
      const filtros = {
        status: status ==='true'? true : status ==='false' ? false : undefined,
        nome_prova: nome_prova,
        id_usuario : Number(id_usuario)
      }
      const response = await buscaDados('/listarprova', filtros)
      setProva(response)
    }

    useEffect(()=>{
      handlebuscar();
    },[id_usuario]);

    const handleVisualizar = (id_prova : number) =>{
      document.cookie = `id_prova_visualizar=${id_prova}; path=/; max-age=86000;`
      router.push('/provas/visualizar')
    }
    return (
        <>
        <Header />
        <main className={estiloGlobal.dados}>
            <div className={estiloGlobal.titulo}>
                <h1>Provas</h1>
            </div>
        <div className={estiloGlobal.barraFuncoes}>
         <form  onSubmit={(e) => { e.preventDefault(); handlebuscar(); }}>
          <div>
            <select 
              className={estiloGlobal.inputPesquisaSelect} 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="true">Ativo</option>
              <option value="false">Inativo</option>
            </select>
            <input 
              type="text" 
              placeholder="Pesquisar Provas" 
              className={estiloGlobal.inputPesquisa} 
              value={nome_prova}
              onChange={(e) => setNomeProba(e.target.value)}
            />
            <button type="submit" className={estiloGlobal.btn}>Buscar</button>
            <button className={`${estiloGlobal.btn} ${estiloGlobal.imprimir}`} onClick={() => window.print()}>Imprimir</button>
          </div>
        </form>
        </div>


        <section className={estiloGlobal.grid}>
          <table>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Prova</th>
                <th scope="col">Sistema</th>
                <th scope="col">Modulo</th>
                <th scope="col">SubModulo</th>
                <th scope="col" className="acoes">Ações</th>
              </tr>
            </thead>
            <tbody>
              {
                prova.map( (item) => (
                  <tr className={estiloGlobal.griditens} key={item.id_prova}>
                  <td data-label="ID">{item.id_prova}</td>
                  <td data-label="Prova">{item.nome_prova}</td>
                  <td data-label="Sistema">{item.nome_sistema}</td>
                  <td data-label="Modulo">{item.nome_modulo}</td>
                  <td data-label="SubModulo">{item.nome_submodulo}</td>
                  <td>
                  {
                    item.nota ? (
                      `${item.nota}%`
                    ) : (
                      <button 
                        className={`${estiloGlobal.btn} ${estiloGlobal.alterar}`} 
                        onClick={() => handleVisualizar(Number(item.id_prova))}
                      >
                        Fazer
                      </button>
                    )
                  }
                  </td>
                </tr>
                ))
              }
            </tbody>
          </table>
        </section>
        </main>

        </>

    )
}
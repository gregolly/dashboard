import { useParams } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"
import { IVenda } from "../contexts/DataContext"
import { Loading } from "../components/Loading"

interface VendaProps extends Omit<IVenda, 'data'> {}

export const Venda = () => {
    const { id } = useParams()
    const {data, isLoading} = useFetch<VendaProps>(`https://data.origamid.dev/vendas/${id}`)

    if(isLoading) return <Loading />
    if(data === null) return null
    return (
        <div>
            <div className="box mb">ID: {data.id}</div>
            <div className="box mb">Nome: {data.nome}</div>
            <div className="box mb">Preco: {data.preco.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })}</div>
            <div className="box mb">Status: {data.status}</div>
        </div>
    )
}
import { VendaItem } from "../components/VendaItem"
import { useData } from "../contexts/DataContext"

export const Vendas = () => {
    const { data } = useData()

    if(data === null) return null
    return (
        <ul>
            {data.length === 0 ? <p>Nenhuma venda foi realizada</p> : data.map(venda => (
                <li key={venda.id}><VendaItem venda={venda} /></li>
            ))}
        </ul>
    )
}
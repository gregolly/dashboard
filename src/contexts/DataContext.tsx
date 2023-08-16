import { PropsWithChildren, createContext, useContext, useState } from "react"
import { useFetch } from "../hooks/useFetch"

export interface IVenda {
    id: string
    nome: string
    preco: number
    status: "pago" | "processando" | "falha"
    pagamento: "boleto" | "cartao" | "pix"
    parcelas: number | null
    data: string
}

interface IDataContext {
    isLoading: boolean
    error: Error | null
    data: IVenda[] | null
    inicio: string
    final: string
    setInicio: React.Dispatch<React.SetStateAction<string>>
    setFinal: React.Dispatch<React.SetStateAction<string>>
}

const DataContext = createContext<IDataContext | null>(null)

export const useData = () => {
    const context = useContext(DataContext)
    if(!context) throw new Error("useData precisa estar em DataContextProvider")
    return context
}

const getAnyDaysAgo = (n: number) => {
    const date = new Date()
    date.setDate(date.getDate() - n)
    const dd = String(date.getDate()).padStart(2, '0')
    const mm = String(date.getMonth() + 1).padStart(2, '0')
    const yyyy = date.getFullYear()

    return `${yyyy}-${mm}-${dd}`
}

export const DataContextProvider = ({ children }: PropsWithChildren) => {
    const [inicio, setInicio] = useState(getAnyDaysAgo(14))
    const [final, setFinal] = useState(getAnyDaysAgo(0))

    const { data, isLoading, error } = useFetch<IVenda[]>(
        `https://data.origamid.dev/vendas?inicio=${inicio}&final=${final}`
    )

    return (
        <DataContext.Provider value={{
            data,
            isLoading,
            error,
            inicio,
            final,
            setInicio,
            setFinal
        }}>
            { children }
        </DataContext.Provider>
    )
}
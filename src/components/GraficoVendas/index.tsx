import { LineChart, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from "recharts"
import { IVenda } from "../../contexts/DataContext"

interface VendaDia {
    data: string
    pago: number
    processando: number
    falha: number
}

const transformData = (data: IVenda[]): VendaDia[] => {
    const dias = data.reduce((acc: {[key: string]: VendaDia}, item) => {
        const dia = item.data.split(' ')[0]
        if(!acc[dia]) {
            acc[dia] = {
                data: dia,
                pago: 0,
                falha: 0,
                processando: 0,
            }
        }

        acc[dia][item.status] += item.preco
        return acc
    }, {})

    return Object.values(dias).map(dia => ({ ...dia, data: dia.data.substring(5)}))
}

export const GraficoVendas = ({ data }: { data: IVenda[] }) => {
    const transformedData = transformData(data)

    return (
        <div>
            <ResponsiveContainer width="99%" height={400}>
                <LineChart data={transformedData}>
                    <XAxis dataKey="data" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pago" stroke="#A36Af9" strokeWidth={3}  />
                    <Line type="monotone" dataKey="processando" stroke="#fbcb21" strokeWidth={3} />
                    <Line type="monotone" dataKey="falha" stroke="#000" strokeWidth={3}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
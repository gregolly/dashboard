import { useData } from "../../contexts/DataContext"
import { DateInput } from "../DateInput"

export const DateRange = () => {
    const { inicio, final, setInicio, setFinal} = useData()

    return (
        <form className="box flex" onSubmit={(e) => e.preventDefault()}>
            <DateInput 
                label="Inicio" 
                value={inicio}
                onChange={({ target }) => setInicio(target.value)}
            />
            <DateInput 
                label="Final"
                value={final} 
                onChange={({ target }) => setFinal(target.value)}
            />
        </form>
    )
}
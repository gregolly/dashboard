import { useEffect, useState } from "react"

interface FetchState<T> {
    data: T | null
    error: Error | null
    isLoading: boolean
}

export function useFetch<T>(url: string, options?: RequestInit): FetchState<T> {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const abortController = new AbortController()

        const fetchData = async () => {
          try {
            const response = await fetch(url, options)
            if (!response.ok) {
              throw new Error('Network response was not ok')
            }
            const jsonData = await response.json()
            setData(jsonData)
            setIsLoading(false)
          } catch (error) {
            setError(error as Error)
            setIsLoading(false)
          }
        }
        fetchData()

        return () => {
            abortController.abort()
        }
    }, [url, options])

    return { data, error, isLoading }
}
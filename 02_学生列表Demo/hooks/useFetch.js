import { useState, useCallback } from 'react'

export default function useFetch() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const fetchData = useCallback(async () => {
    setIsError(null)
    setIsLoading(true)
    try {
      const res = await fetch('http://localhost:1337/api/students')
      if (!res.ok) {
        throw new Error('加载失败!')
      }
      const data = await res.json()
      setData(data.data)
    } catch (e) {
      console.log(456)
      setIsError(e)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    data,
    isLoading,
    isError,
    fetchData,
  }
}

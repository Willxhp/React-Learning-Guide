import { useState, useCallback } from 'react'


export default function useFetch() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)

  // 封装请求方法
  // reqObj用来存储请求的参数{url, method, body}
  const fetchData = useCallback(async (reqObj, cb) => {
    setIsError(null)
    setIsLoading(true)
    try {
      const res = await fetch('http://localhost:1337/api/' + reqObj.url, {
        method: reqObj.method || 'get',
        body: reqObj.body ? JSON.stringify({data: reqObj.body}) : null,
        headers: {
          'Content-type': 'application/json'
        }
      })
      // 判断请求是否加载承购
      if (!res.ok) {
        throw new Error('数据请求出错!')
      } else {
        const data = await res.json()
        setData(data.data)
        // 若传入回调函数，则执行回调函数
        cb && cb()
      }
    } catch (e) {
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

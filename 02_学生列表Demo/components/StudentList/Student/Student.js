import React, { useCallback, useContext, useState } from 'react'
import './Student.css'
import StudentContext from '../../../store/StudentContext'

// 学生信息组件
export default function Student({data: {id, attributes: {name, age, gender, address}}}) {

  const ctx = useContext(StudentContext)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)
  const [isEdit, setIsEdit] = useState(false)

  const delStu = useCallback(async (stuId) => {
    setIsLoading(true)
    setIsError(null)
    try {
      const res = await fetch(`http://localhost:1337/api/students/${stuId}`, {
        method: 'delete'
      })
      if (!res.ok) {
        // const data = await res.json()
        throw new Error('处理失败!')
      }
      ctx.fetchData()
    } catch (e) {
      setIsError(e)
    } finally {
      setIsLoading(false)
    }
  }, [ctx])

  const updateHandler = () => {

  }
  const deleteHandler = () => {
    delStu(id)
  }
  return (
    (<>
    <tr>
      <td>{name}</td>
      <td>{gender}</td>
      <td>{age}</td>
      <td>{address}</td>
      <td>
        <button onClick={updateHandler}>修改</button>
        <button onClick={deleteHandler}>删除</button>
      </td>
    </tr>
    {
      isLoading && <tr><td colSpan={5}>正在处理中...</td></tr>
    }
    {
      isError && <tr><td colSpan={5}>操作失败!</td></tr>
    }
    </>)
  )
}

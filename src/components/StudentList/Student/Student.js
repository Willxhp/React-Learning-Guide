import React, {  useContext, useState } from 'react'
import './Student.css'
import StudentForm from '../StudentForm/StudentForm'
import useFetch from '../../../hooks/useFetch'
import StudentContext from '../../../store/StudentContext'

// 学生信息组件
export default function Student({data: {id, attributes: stu}}) {

  const [isEdit, setIsEdit] = useState(false)
  const ctx = useContext(StudentContext)

  const {isError, isLoading, fetchData} = useFetch()
  const updateHandler = () => {
    setIsEdit(true)
  }
  const deleteHandler = () => {
    fetchData({
      url: `students/${id}`,
      method: 'delete',
    }, ctx.fetchData)
  }
  const cancelHandler = () => {
    setIsEdit(false)
  }
  return (
    <>
    {
      !isEdit &&
      <tr>
        <td>{stu.name}</td>
        <td>{stu.gender}</td>
        <td>{stu.age}</td>
        <td>{stu.address}</td>
        <td>
          <button onClick={updateHandler}>修改</button>
          <button onClick={deleteHandler}>删除</button>
        </td>
      </tr>
    }
    {
      isEdit && <StudentForm stu={stu} stuId={id} onCancel={cancelHandler}/>
    }
    {
      isLoading && <tr><td colSpan={5}>正在处理中...</td></tr>
    }
    {
      isError && <tr><td colSpan={5}>操作失败!</td></tr>
    }
    </>
  )
}

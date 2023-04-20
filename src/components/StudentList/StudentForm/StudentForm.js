import React, { useContext, useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import StudentContext from '../../../store/StudentContext'

// 学生表单组件
export default function StudentForm(props) {
  const [newStu, setNewStu] = useState({
    name: props.stu ? props.stu.name : '',
    age: props.stu ? props.stu.age : '',
    gender: props.stu ? props.stu.gender : '男',
    address: props.stu ? props.stu.address : '',
  })

  const ctx = useContext(StudentContext)


  const {isError, isLoading, fetchData} = useFetch()

  // 修改信息
  const nameChangeHandler = (e) => {
    setNewStu((preStu) => ({ ...preStu, name: e.target.value }))
  }

  const genderChangeHandler = (e) => {
    setNewStu((preStu) => ({ ...preStu, gender: e.target.value }))
  }

  const ageChangeHandler = (e) => {
    setNewStu((preStu) => ({ ...preStu, age: e.target.value }))
  }

  const addChangeHandler = (e) => {
    setNewStu((preStu) => ({ ...preStu, address: e.target.value }))
  }

  const addStuHandler = () => {
    fetchData({
      url: 'students',
      method: 'post',
      body: newStu
    }, ctx.fetchData)
  }

  // 确认修改
  const confirmHandler = () => {
    fetchData({
      url: `students/${props.stuId}`,
      method: 'put',
      body: newStu
    }, ctx.fetchData)
  }

  // 取消修改
  const cancelHandler = () => {
    props.onCancel()
  }

  return (
    <>
      <tr>
        <th>
          <input type="text" onChange={nameChangeHandler} value={newStu.name} />
        </th>
        <th>
          <select value={newStu.gender} onChange={genderChangeHandler}>
            <option value={'男'}>男</option>
            <option value={'女'}>女</option>
          </select>
        </th>
        <th>
          <input type="text" value={newStu.age} onChange={ageChangeHandler} />
        </th>
        <th>
          <input
            type="text"
            value={newStu.address}
            onChange={addChangeHandler}
          />
        </th>
        {!props.stu && (
          <th>
            <button onClick={addStuHandler}>添加</button>
          </th>
        )}
        {props.stu && (
          <th>
            <button onClick={confirmHandler}>确认</button>
            <button onClick={cancelHandler}>取消</button>
          </th>
        )}
      </tr>
      {isError && (
        <tr>
          <td colSpan={5}>{isError.message}</td>
        </tr>
      )}
      {isLoading && (
        <tr>
          <td colSpan={5}>请求处理中...</td>
        </tr>
      )}
    </>
  )
}

import React, { useCallback, useContext, useState } from 'react'
import StudentContext from '../../../store/StudentContext'

// 学生表单组件
export default function StudentForm() {

  const [newStu, setNewStu] = useState({
    name: '',
    age: '',
    gender: '男',
    address: ''
  })

  const ctx = useContext(StudentContext)

  const addStu = useCallback(async (newStu) => {
    try {
      const res = await fetch('http://localhost:1337/api/students', {
        method: 'post',
        body: JSON.stringify({
          data: newStu
        }),
        headers: {
          'Content-type': 'application/json'
        }
      })
      if (res.ok) {
        ctx.fetchData()
      }
    } catch (e) {

    }
  }, [])

  const nameChangeHandler = (e) => {
    setNewStu(preStu => ({...preStu, name: e.target.value}))
  }

  const genderChangeHandler = (e) => {
    setNewStu(preStu => ({...preStu, gender: e.target.value}))
  }

  const ageChangeHandler = (e) => {
    setNewStu(preStu => ({...preStu, age: +e.target.value}))
  }

  const addChangeHandler = (e) => {
    setNewStu(preStu => ({...preStu, address: e.target.value}))
  }

  const addStuHandler = () => {
    addStu(newStu)
  }

  return (
    <tr>
      <th>
        <input type="text" onChange={nameChangeHandler} value={newStu.name}/>
      </th>
      <th>
        <select value={newStu.gender} onChange={genderChangeHandler}>
          <option value={'男'}>男</option>
          <option value={'女'}>女</option>
        </select>
      </th>
      <th>
        <input type="text" value={newStu.age} onChange={ageChangeHandler}/>
      </th>
      <th>
        <input type="text" value={newStu.address} onChange={addChangeHandler}/>
      </th>
      <th>
        <button onClick={addStuHandler}>添加</button>
      </th>
    </tr>
  )
}

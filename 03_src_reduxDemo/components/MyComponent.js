import store from '../store'
import { setNameActon, setAgeAction } from '../store/actions/stuAction'
import { setSchoolNameActon, setAddressAction } from '../store/actions/schoolAction'
import { useState } from 'react'

export default function MyComponent() {
  
  // 获取store中存储的状态
  const state = store.getState()
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    schoolName: '',
    address: ''
  })

  // 高阶函数解决函数回调的传参问题
  const changeFormHandler = (key) => {
    let newFormData = {...formData}
    return (e) => {
      newFormData[key] = e.target.value
      setFormData(newFormData)
    }
  }

  return (
    <div>
      <p>{state.student.name} - {state.student.age}</p>
      <p>
        姓名：<input value={formData.name} onChange={changeFormHandler('name')}/>
        年龄：<input value={formData.age} onChange={changeFormHandler('age')}/>
      </p>
      <div>
      	<button onClick={() => {store.dispatch(setNameActon(formData.name))}}>修改学生姓名</button>
          <button onClick={() => {store.dispatch(setAgeAction(+formData.age))}}>修改学生年龄</button>
      </div>
      <hr/>
      <p>{state.school.name} - {state.school.address}</p>
      <p>
        名称：<input value={formData.schoolName} onChange={changeFormHandler('schoolName')}/>
        地址：<input value={formData.address} onChange={changeFormHandler('address')}/>
      </p>
      <div>
      	<button onClick={() => {store.dispatch(setSchoolNameActon(formData.schoolName))}}>修改学校名称</button>
        <button onClick={() => {store.dispatch(setAddressAction(formData.address))}}>修改学校地址</button>
      </div>
    </div>
  )
}

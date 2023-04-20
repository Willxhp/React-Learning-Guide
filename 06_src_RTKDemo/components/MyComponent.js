import { setName, setAge } from '../store/reducers/stuReducer'
import { setName as setSchoolName, setAddress } from '../store/reducers/schoolReducer'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function MyComponent() {

  // 获取store中存储的状态
  const {student, school} = useSelector(state => state)
  // 获取dispatch方法
  const dispatch = useDispatch()
  
  // 处理信息的表单
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
      <p>{student.name} - {student.age}</p>
      <p>
        姓名：<input value={formData.name} onChange={changeFormHandler('name')}/>
        年龄：<input value={formData.age} onChange={changeFormHandler('age')}/>
      </p>
      <div>
      	<button onClick={() => {dispatch(setName(formData.name))}}>修改学生姓名</button>
          <button onClick={() => {dispatch(setAge(+formData.age))}}>修改学生年龄</button>
      </div>
      <hr/>
      <p>{school.name} - {school.address}</p>
      <p>
        名称：<input value={formData.schoolName} onChange={changeFormHandler('schoolName')}/>
        地址：<input value={formData.address} onChange={changeFormHandler('address')}/>
      </p>
      <div>
      	<button onClick={() => {dispatch(setSchoolName(formData.schoolName))}}>修改学校名称</button>
        <button onClick={() => {dispatch(setAddress(formData.address))}}>修改学校地址</button>
      </div>
    </div>
  )
}

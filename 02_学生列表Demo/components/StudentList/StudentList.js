import React from 'react'
import './StudentList.css'
import Student from './Student/Student'
import StudentFrom from './StudentForm/StudentForm'

// 学生列表组件
export default function StudentList(props) {
  return (
    <table className='student-form'>
      <caption>学生列表</caption>
      <thead>
        <tr>
          <th>姓名</th>
          <th>性别</th>
          <th>年龄</th>
          <th>地址</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((item) => <Student key={item.id} data={item}/>)}
      </tbody>
      <tfoot>
        <StudentFrom/>
      </tfoot>
    </table>
  )
}

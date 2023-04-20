// 存储学生信息的reducer
import { createSlice } from "@reduxjs/toolkit"

// 创建切片
const stuSlice = createSlice({
  name: 'stu',
  initialState: {
    name: 'Willxhp',
    age: 18
  },
  reducers: {
    setName(state, action) {
      state.name = action.payload
    },
    setAge(state, action) {
      state.age = action.payload
    }
  }
})

// 导出reducer和action creators
export const {reducer: stuReducer} = stuSlice
export const {setName, setAge} = stuSlice.actions
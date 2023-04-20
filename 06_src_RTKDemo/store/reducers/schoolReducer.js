// 存储学校信息的reducer
import {createSlice} from '@reduxjs/toolkit'

const schoolSlice = createSlice({
  name: 'school',
  initialState: {
    name: 'Willschool',
    address: 'Argentina'
  },
  reducers: {
    setName(state, action) {
      state.name = action.payload
    },
    setAddress(state, action) {
      state.address = action.payload
    }
  }
})

export const {reducer: schoolReducer} = schoolSlice
export const {setName, setAddress} = schoolSlice.actions
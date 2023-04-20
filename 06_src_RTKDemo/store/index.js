import { configureStore } from '@reduxjs/toolkit'
import { stuReducer } from './reducers/stuReducer'
import { schoolReducer } from './reducers/schoolReducer'

export default configureStore({
  reducer: {
    student: stuReducer,
    school: schoolReducer,
  }
})

import { createStore, combineReducers } from "redux"
import stuReducer from "./reducers/stuReducer"
import schoolReducer from "./reducers/schoolReducer"

const reducer = combineReducers({
  student: stuReducer,
  school: schoolReducer
})

export default createStore(reducer)
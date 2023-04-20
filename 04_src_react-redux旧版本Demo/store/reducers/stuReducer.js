// 存储学生信息的reducer
const initialState = {name: 'Willxhp', age: 18}
const stuReducer =  (state = initialState, action) => {
  switch(action.type) {
    case 'SET_NAME':
      return {...state, name: action.payload}
    case 'SET_AGE':
      return {...state, age: action.payload}
    default:
      return state
  }
}

export default stuReducer
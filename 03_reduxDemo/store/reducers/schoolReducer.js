// 存储学校信息的reducer
const initialState = {name: 'Willschool', address: 'Argentina'}
const schoolReducer =  (state = initialState, action) => {
  switch(action.type) {
    case 'SET_SCHOOL_NAME':
      return {...state, name: action.payload}
    case 'SET_ADDRESS':
      return {...state, address: action.payload}
    default:
      return state
  }
}

export default schoolReducer
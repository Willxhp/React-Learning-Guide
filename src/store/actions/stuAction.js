// 修改学生信息的action
export const setNameActon = (name) => {
  return {type: 'SET_NAME', payload: name}
}

export const setAgeAction = (age) => {
  return {type: 'SET_AGE', payload: age}
}
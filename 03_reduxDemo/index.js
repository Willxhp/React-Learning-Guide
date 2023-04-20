import ReactDOM from 'react-dom/client'
import App from './App'
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<App/>)

// 监测store中状态的变化，重新渲染App组件
store.subscribe(() => {
  root.render(<App/>)
})

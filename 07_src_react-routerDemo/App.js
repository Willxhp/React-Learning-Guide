import { NavLink, useRoutes } from "react-router-dom"
import Home from './pages/Home'
import About from "./pages/About"
import Detail from "./pages/Detail"
import './App.css'

export default function App() {

  const element = useRoutes([
    {
      path: 'home',
      element: <Home/>
    },
    {
      path: 'about',
      element: <About/>,
      children: [
        {
          path: 'detail',
          element: <Detail/>
        }
      ]
    },
    {
      path: '*',
      element: <Home/>
    }
  ])

  return (
    <div>
      <ul>
        <li><NavLink to={'home'} style={({isActive}) => {
          return isActive ? {backgroundColor: 'skyblue'} : null
        }}>主页</NavLink></li>
        <li><NavLink to={'about'} className={({isActive}) => {
          return isActive ? 'base active' : 'base'
        }}>关于</NavLink></li>
      </ul>
      <div>
        {element}
      </div>
    </div>
  )
}

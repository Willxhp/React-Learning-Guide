import classes from './Counter.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import CartContext from '../../../store/cart-context'

export default function Counter(props) {

  // FontAwesome的使用方法
  // 1. 装包
  // npm i @fortawesome/react-fontawesome@latest @fortawesome/free-regular-svg-icons @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons
  // 2. 引入FontAwesomeIcon组件
  // 3. 引入待使用的icon图标，作为FontAwesomeIcon组件的icon参数传入
  const cartCtx = useContext(CartContext)
  const subItem = () => {
    cartCtx.cartDispatch({type: 'SUB', id: props.meal.id})
  }

  const addItem = () => {
    cartCtx.cartDispatch({type: 'ADD', id: props.meal.id})
  }

  // 购物车当前商品的信息
  let item = cartCtx.items.find(item => item.id === props.meal.id)
  
  return (
    <div className={classes.counter}>
      {
        item && item.amount ? (
          <>
            <button className={classes.sub} onClick={subItem}><FontAwesomeIcon icon={faMinus}/></button>
            <div className={classes.amount}>{item.amount}</div>
          </>
        ) : null
      }
      <button className={classes.add} onClick={addItem}><FontAwesomeIcon icon={faPlus}/></button>
    </div>
  )
}
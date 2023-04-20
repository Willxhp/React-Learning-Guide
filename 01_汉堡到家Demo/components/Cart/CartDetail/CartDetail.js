import React, { useContext, useState } from 'react'
import classes from './CartDetail.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import CartContext from '../../../store/cart-context'
import Meal from '../../Meals/Meal/Meal'
import Confirm from './Confirm/Confirm'

export default function CartDetail(props) {
  const cartCtx = useContext(CartContext)

  const clickHandler = (e) => {
    e.stopPropagation()
  }

  // 控制是否显示确认框
  const [showConfirm, setShowConfirm] = useState(false)

  const showConfirmHandler = () => {
    setShowConfirm(true)
  }

  const closeConfirmHandler = () => {
    setShowConfirm(false)
    props.onClose()
  }

  return (
    <Backdrop>
      <div className={classes.detailBox} onClick={clickHandler}>
        {showConfirm && <Confirm onClose={closeConfirmHandler} />}
        <header className={classes.header}>
          <h2 className={classes.title}>餐品详情</h2>
          <div className={classes.delete} onClick={showConfirmHandler}>
            <FontAwesomeIcon icon={faTrash} className={classes.icon} />
            <p>清空购物车</p>
          </div>
        </header>
        <div className={classes.detailList}>
          {cartCtx.items.map((item) => (
            <Meal key={item.id} meal={item} noDesc />
          ))}
        </div>
      </div>
    </Backdrop>
  )
}

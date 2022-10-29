import React, {useContext} from 'react'
import classes from './Confirm.module.css'
import Backdrop from '../../../UI/Backdrop/Backdrop'
import CartContext from '../../../../store/cart-context'

export default function Confirm(props) {
  const cartCtx = useContext(CartContext) 

  const confirmHandler = () => {
    cartCtx.clearData()
    props.onClose()
  }

  const cancelHandler = () => {
    props.onClose()
  }
  return (
    <Backdrop className={classes.confirmBox}>
      <div className={classes.confirm}>
        <h2 className={classes.title}>确认清空购物车吗？</h2>
        <div className={classes.buttonBox}>
          <button className={classes.cancelButton} onClick={cancelHandler}>取消</button>
          <button className={classes.confirmButton} onClick={confirmHandler}>确认</button>
        </div>
      </div>
    </Backdrop>
  )
}

import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import classes from './Checkout.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import CartContext from '../../../store/cart-context'
import CheckoutItem from './CheckoutItem/CheckoutItem'
import Payment from './Payment/Payment'

export default function Checkout(props) {
  const checkoutRoot = document.getElementById('checkout-root')
  const cartCtx = useContext(CartContext)
  return ReactDOM.createPortal(
    <div
      className={classes.checkoutBox}
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <div className={classes.icon}>
        <FontAwesomeIcon
          icon={faXmark}
          onClick={() => {
            props.onClose()
          }}
        />
      </div>
      <div className={classes.checkout}>
        <header className={classes.title}>餐品详情</header>
        {cartCtx.totalAmount ? (
          <div>
            {cartCtx.items.map((item) => (
              <CheckoutItem key={item.id} meal={item} />
            ))}
          </div>
        ) : (
          <div className={classes.noGoods}>未选购商品</div>
        )}
        <footer className={classes.footer}>
          <p>{cartCtx.totalPrice}</p>
        </footer>
      </div>
      <Payment price={cartCtx.totalPrice} />
    </div>,
    checkoutRoot
  )
}

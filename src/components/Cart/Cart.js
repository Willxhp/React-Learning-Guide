import React, { useContext, useState } from 'react'
import classes from './Cart.module.css'
import bagImg from '../../asset/bag.png'
import CartContext from '../../store/cart-context'
import CartDetail from './CartDetail/CartDetail'
import Checkout from './Checkout/Checkout'

export default function Cart() {
  const cartCtx = useContext(CartContext)

  const [showDetail, setShowDetail] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)

  const showDetailHandler = () => {
    // if(cartCtx.totalAmount === 0 && showDetail === false) return
    setShowDetail(preState => !preState)
  }

  const showCheckoutHandler = (e) => {
    // if(cartCtx.totalAmount === 0) return
    setShowCheckout(preState => !preState)
    e.stopPropagation()
  }

  return (
    <div className={classes.cart} onClick={showDetailHandler}>
      {(showDetail && cartCtx.totalAmount !== 0) && <CartDetail onClose={() => {setShowDetail(false)}} />}
      {showCheckout && <Checkout onClose={() => {setShowCheckout(false)}}/>}
      <div className={classes.cartBag}>
        <img src={bagImg} alt=""></img>
        {cartCtx.totalAmount ? (
          <span className={classes.icon}>{cartCtx.totalAmount}</span>
        ) : null}
      </div>
      {cartCtx.totalPrice ? (
        <p className={classes.price}>{cartCtx.totalPrice}</p>
      ) : (
        <p className={classes.noGoods}>未选购商品</p>
      )}
      <button className={classes.priceButton} onClick={showCheckoutHandler}>去结算</button>
    </div>
  )
}

import React, { useContext } from 'react'
import classes from './Cart.module.css'
import bagImg from '../../asset/bag.png'
import CartContext from '../../store/cart-context'

export default function Cart() {
  const cartCtx = useContext(CartContext)

  return (
    <div className={classes.cart}>
      <div className={classes.cartBag}>
        <img src={bagImg} alt=""></img>
        {cartCtx.totalAmount ? (
          <span className={classes.icon}>{cartCtx.totalAmount}</span>
        ) : null}
      </div>
      {cartCtx.totalPrice ? (
        <p className={classes.price}>{cartCtx.totalPrice}</p>
      ) : (<p className={classes.noGoods}>未选购商品</p>)}
      <button className={classes.priceButton}>去结算</button>
    </div>
  )
}

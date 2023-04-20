import React from 'react'
import classes from './Payment.module.css'

export default function Payment(props) {
  return (
    <div className={classes.payment}>
      <div className={classes.price}>{props.price}</div>
      <button className={classes.payButton}>去支付</button>
    </div>
  )
}

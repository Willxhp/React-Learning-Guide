import React from 'react'
import classes from './CheckoutItem.module.css'
import Counter from '../../../UI/Counter/Counter'

export default function CheckoutItem(props) {
  return (
    <div className={classes.checkoutItem}>
      <div className={classes.imgBox}>
        <img src={props.meal.img} alt=''></img>
      </div>
      <div className={classes.descBox}>
        <header className={classes.title}>{props.meal.title}</header>
        <div className={classes.priceBox}>
          <Counter meal={props.meal}/>
          <div className={classes.price}>{props.meal.price * props.meal.amount}</div>
        </div>
      </div>
    </div>
  )
}

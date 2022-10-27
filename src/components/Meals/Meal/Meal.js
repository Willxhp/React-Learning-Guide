import Counter from '../../UI/Counter/Counter'
import classes from './Meal.module.css'

export default function Meal(props) {
  return (
    <div className={classes.meal}>
      <div className={classes.image}>
        <img src={props.meal.img} alt=''></img>
      </div>
      <div className={classes.right}>
        <h2 className={classes.title}>{props.meal.title}</h2>
        <p className={classes.desc}>{props.meal.desc}</p>
        <div className={classes.priceWrapper}>
          <div className={classes.price}>{props.meal.price}</div>
          <Counter meal={props.meal}/>
        </div>
      </div>
    </div>
  )
}

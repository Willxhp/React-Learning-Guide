import Meal from './Meal/Meal'
import classes from './Meals.module.css'

export default function Meals(props) {
  return (
    <div className={classes.meals}>
      {props.mealsData.map(item => {
        return <Meal key={item.id} meal={item}/>
      })}
    </div>
  )
}

import React from 'react'
import classes from './Filter.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function Filter(props) {

  // 搜索过滤处理事件
  const changeMealsHandler = (e) => {
    let keyword = e.target.value
    props.onFilter(keyword)
  }

  return (
    <div className={classes.filterContainer}>
      <div className={classes.filter}>
        <input
          type="text"
          placeholder="请输入关键字"
          className={classes.search}
          onChange={changeMealsHandler}
        />
        <span className={classes.icon}>
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </div>
    </div>
  )
}

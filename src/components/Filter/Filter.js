import React, {useEffect, useState} from 'react'
import classes from './Filter.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function Filter(props) { 
  // 关键字
  const [keyword, setKeyword] = useState('')

  // 搜索过滤处理事件
  const changeMealsHandler = (e) => {
    setKeyword(e.target.value.trim())
    // props.onFilter(keyword)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      props.onFilter(keyword)
    }, 500)

    // 可以借助清理函数来实现防抖功能
    return () => {
      clearTimeout(timer)
    }
  }, [keyword])

  return (
    <div className={classes.filterContainer}>
      <div className={classes.filter}>
        <input
          type="text"
          placeholder="请输入关键字"
          className={classes.search}
          onChange={changeMealsHandler}
          value={keyword}
        />
        <span className={classes.icon}>
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </div>
    </div>
  )
}

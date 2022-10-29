import React from 'react'
import ReactDOM from 'react-dom'
import classes from './Backdrop.module.css'

export default function Backdrop(props) {
  const backdropRoot = document.getElementById('backdrop-root')
  return (
    ReactDOM.createPortal(<div className={`${classes.backdrop} ${props.className ? props.className : ''}`}>
      {props.children}
    </div>, backdropRoot)
  )
}

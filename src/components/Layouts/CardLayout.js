import React from 'react'
import './cardStyle.css'

function CardLayout(props) {
  return (
    <div className='card'>
        {props.children}
    </div>
  )
}

export default CardLayout
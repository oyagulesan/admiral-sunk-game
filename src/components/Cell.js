import React from 'react'
import { SIZE } from '../util/constants'

const Cell = (props) => {
  const { i, j, type } = props;

  const cellStyle = {
      position: 'absolute',
      top: ((SIZE + 2) * (j + 1.25))+ 'px',
      left: ((SIZE + 2) * (i + 1.25))+ 'px',
      borderColor: 'black',
      borderWidth: '1px',
      border: 'solid',
      height: SIZE + 2 + 'px',
      width: SIZE + 2 + 'px'
  }

  const onClick = (event) => {
      console.log(event, i, j, type);
  }

  return (
    <div onClick={onClick} style={cellStyle} className={type === 'x' ? 'shipBorder' : type > 0 ? 'ship' : 'empty'}></div>
  )
}

export default Cell
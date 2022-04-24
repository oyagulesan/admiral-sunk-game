import React, {useContext} from 'react';
import {Context as AppContext} from '../context/AppContext';
import { SIZE } from '../util/constants'
import { useDrop } from 'react-dnd'

const Cell = (props) => {
  const { setHitBoard, state: {hitBoard, hits }} = useContext(AppContext);
  const { i, j, type, onCellClick, hitNumber } = props;
  const [{ isOver }, dropRef] = useDrop({
    accept: 'cellType',
    drop: (item) => {
      console.log('...on drop.', item, i, j)
      const tmpBoard = hitBoard.map(row => row.map(item => {
        return {...item}
      }));
      tmpBoard[i][j].type = item.id === 'sea' ? 0 : item.id === 'ship' ? 1 : 'x'
      setHitBoard(tmpBoard)
    },
    collect: (monitor) => ({
        isOver: monitor.isOver()
    })
  })

  const cellStyle = {
      position: 'absolute',
      top: ((SIZE + 2) * (j + 1.25))+ 'px',
      left: ((SIZE + 2) * (i + 0.5))+ 'px',
      color: 'white',
      borderColor: 'black',
      borderWidth: '1px',
      border: 'solid',
      height: SIZE + 2 + 'px',
      width: SIZE + 2 + 'px',
      fontSize: '30px',
  }

  const gray = {
    color: 'rgb(180, 180, 180)'
  }

  const onClick = () => {
      onCellClick(i, j);
  }

  return (
    <div onClick={onClick} ref={dropRef} style={hitNumber <= hits.length ? {...cellStyle, ...gray} : cellStyle} className={type === 'x' ? 'shipBorder' : type > 0 ? 'ship' : 'sea'}>{hitNumber}</div>
  )
}

export default Cell
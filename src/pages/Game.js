import React, {useContext, useEffect, useState} from 'react';
import Cell from '../components/Cell'
import { SIZE } from '../util/constants.js'
import useInitializeBoard from '../hooks/calculate'
import {Context as AppContext} from '../context/AppContext';
import { useDrag } from 'react-dnd'
import Ships from '../components/Ships'
import congratsGif from "../assets/images/congrats.gif";

const iList = [0,1,2,3,4,5,6,7,8,9];
const jList = [0,1,2,3,4,5,6,7,8,9];

const canvasStyle = {
  position: 'absolute',
  height: (SIZE * 14)+ 'px',
  width: (SIZE * 16)+ 'px',
  top: (SIZE * 2) + 'px',
  left: (SIZE * 1) + 'px',
}
const hitButtonStyle = {
  position: 'absolute',
  top: (SIZE * 13) + 'px',
  left: (SIZE * 6) + 'px',
}

const dragStyle = {
  position: 'absolute',
  height: (SIZE * 4)+ 'px',
  width: (SIZE * 2)+ 'px',
  top: (SIZE * 2) + 'px',
  left: (SIZE * 13) + 'px',
}

const draggableCellStyle = {
  borderColor: 'black',
  borderWidth: '1px',
  border: 'solid',
  height: SIZE + 2 + 'px',
  width: SIZE + 2 + 'px',
  marginBottom: '10px'
}

const shipsStyle = {
  position: 'absolute',
  height: (SIZE * 6)+ 'px',
  width: (SIZE * 5)+ 'px',
  top: (SIZE * 8) + 'px',
  left: (SIZE * 12) + 'px',
}

const Game = () => {
  const [initialize] = useInitializeBoard();
  
  const [hitSet, setHitSet] = useState([])

  const { setBoard, setHitBoard, setHits, setShips, setFinished,
    state: {board, hits, hitBoard, ships, finished }} = useContext(AppContext);

  useEffect(() => {
    setBoard(initialize());  
  }, []);
  const onClick = () => {
    if (finished) {
      setBoard(initialize());
      setFinished(false);
      setHits([]);
      setHitSet([]);
      setHitBoard(Array.from({ length: 10 }, () => {
        return Array.from({ length: 10 }, () => {
          return {type: 0, hitNumber: 0};
        });
      }))
      setShips(ships.map(ship => ship.map(s => 0)))
      return
    }
    const hitNumber = hits.length + 1;
    setHits([...hits, hitSet])
    const tmpBoard = hitBoard.map(row => row.map(cell => {return {...cell}}))
    hitSet.forEach(position => tmpBoard[position[0]][position[1]].hitNumber = hitNumber)
    setHitBoard(tmpBoard)
    for (let i = 0; i < hitSet.length; i++) {
      const shipSize = board[hitSet[i][0]][hitSet[i][1]]
      console.log('hitSet', hitSet[i], 'board[hitSet[i][0]][hitSet[i][1]]', board[hitSet[i][0]][hitSet[i][1]]);

      if (shipSize !== 'x' && shipSize > 0) {
        const tmpShips = [...ships]
        for (let cnt = 0; cnt < ships.length; cnt++) {
          const ship = tmpShips[cnt];
          let done = false
          if (ship.length === shipSize && ship[ship.length - 1] === 0) {
            for (let j = 0; j < ship.length; j++) {
              if (ship[j]) {
                continue
              }
              ship[j] = hitNumber
              done = true
              break
            }
            if (done) {
              break
            }
          }
        }
        console.log('shipSize', shipSize, tmpShips)
        setShips(tmpShips)
        if (tmpShips.findIndex(ship => ship.findIndex(item => item === 0) >= 0) >= 0) {
          // OK
        } else {
          setFinished(true)
        }
      }
    }
    setHitSet([])
  }

  const [{ isDraggingShip }, dragRefShip] = useDrag({
    type: 'cellType',
    item: {id: 'ship'},
    collect: (monitor) => ({
      isDraggingShip: monitor.isDragging()
    })
  })
  const [{ isDraggingSea }, dragRefSea] = useDrag({
    type: 'cellType',
    item: {id: 'sea'},
    collect: (monitor) => ({
      isDraggingSea: monitor.isDragging()
    })
  })
  const [{ isDraggingBorder }, dragRefBorder] = useDrag({
    type: 'cellType',
    item: {id: 'border'},
    collect: (monitor) => ({
      isDraggingBorder: monitor.isDragging()
    })
  })

  const onCellClick = (i, j) => {
    if (hitBoard[i][j].hitNumber) {
      return
    } 
    const ind = hitSet.findIndex(item => item[0] === i && item[1] === j)
    if (ind >= 0) {
      // Deselect
      const tmpSet = [...hitSet];
      tmpSet.splice(ind, 1);
      setHitSet(tmpSet)
    } else {
      setHitSet([...hitSet, [i, j]])
    }
  }

  /* PRINT BOARD
  if (board.length === 10) {
    board.forEach(row => {
      console.log(row.join(" "))
      console.log('\n')
    })
  }
  */
 /* PRINT SHIPS
 console.log('ships')
 ships.forEach(ship => {
  console.log(ship.join(" "))
  console.log('\n')
 })
 */
  return (
    <div className='canvas' style={canvasStyle}>
      {iList.map(i => jList.map(j => <Cell onCellClick={onCellClick} key={i + '-' + j} i={i} j={j} type={hitBoard.length === 10 ? hitBoard[i][j].type : null} hitNumber={hitBoard[i][j].hitNumber || (hitSet.find(item => item[0] === i && item[1] === j) ? hits.length + 1 : null)}/>))}
      <button className='hitButton' style={hitButtonStyle} onClick={onClick} disabled={hitSet.length !== 3 && !finished}>{finished ? 'RESTART' : 'HIT!'}</button>
      <div style={dragStyle}>
        <div style={draggableCellStyle} draggable ref={dragRefShip} className='ship' />
        <div style={draggableCellStyle} draggable ref={dragRefSea} className='sea' />
        <div style={draggableCellStyle} draggable ref={dragRefBorder} className='shipBorder' />
      </div>
      <div style={shipsStyle}>
        <Ships />
      </div>
      {finished &&
        <div style={{
          zIndex: 100,
          position: 'absolute',
          top: ((SIZE * 2) + 'px'),
          left: ((SIZE * 2) + 'px')}}
        >
          <img src={congratsGif} alt="CONGRATS" />
        </div>
      }
    </div>
  )
}

export default Game
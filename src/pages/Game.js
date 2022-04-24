import React, {useContext, useEffect} from 'react';
import Cell from '../components/Cell'
import { SIZE } from '../util/constants.js'
import useInitializeBoard from '../hooks/calculate'
import {Context as AppContext} from '../context/AppContext';

const iList = [0,1,2,3,4,5,6,7,8,9];
const jList = [0,1,2,3,4,5,6,7,8,9];

const canvasStyle = {
  position: 'absolute',
  height: (SIZE * 12)+ 'px',
  width: (SIZE * 12)+ 'px',
  top: (SIZE * 2) + 'px',
  left: (SIZE * 2) + 'px',
}


const Game = () => {
  const [initialize] = useInitializeBoard();

  const { setBoard, state: {board }} = useContext(AppContext);
  useEffect(() => {
    setBoard(initialize());
  }, []);

  return (
    <div className='canvas' style={canvasStyle}>
        {iList.map(i => jList.map(j => <Cell key={i + '-' + j} i={i} j={j} type={board.length === 10 ? board[i][j] : null} />))}
    </div>
  )
}

export default Game
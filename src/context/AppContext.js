import createDataContext from './createDataContext';
import { COMPONENTS } from '../util/constants';

const appReducer = (state, action) => {
    switch (action.type) {
        case 'setHits':
            return {...state,
                hits: action.payload}
        case 'setBoard':
            return {...state, board: action.payload}
        case 'setHitBoard':
            return {...state, hitBoard: action.payload}
        case 'setShips':
            return {...state, ships: action.payload} 
        case 'setFinished':
            return {...state, finished: action.payload} 
        default:
            return state;
    }
};

const setHits = dispatch => (val) => {
    dispatch({type: 'setHits', payload: val});
};

const setBoard = dispatch => (val) => {
    dispatch({type: 'setBoard', payload: val})
}
const setHitBoard = dispatch => (val) => {
    dispatch({type: 'setHitBoard', payload: val})
}
const setShips = dispatch => (val) => {
    dispatch({type: 'setShips', payload: val})
}
const setFinished = dispatch => (val) => {
    dispatch({type: 'setFinished', payload: val})
}

export const { Context, Provider } = createDataContext(
    appReducer,
    { setBoard, setHits, setShips, setHitBoard, setFinished },
    {    
        board: [],
        hits: [],
        hitBoard: Array.from({ length: 10 }, () => {
            return Array.from({ length: 10 }, () => {
              return {type: 0, hitNumber: 0};
            });
        }),
        ships: COMPONENTS.map(comp => Array.from({ length: comp }, () => {
            return 0;
        })),
        finished: false
     }
);

import createDataContext from './createDataContext';

const appReducer = (state, action) => {
    switch (action.type) {
        case 'throwError':
        case 'setInfo':
            return { ...state, info: {
                message: action.payload.message,
            }}
        case 'setNumber':
            return {...state,
                numberToBeGuessed: action.payload}
        case 'setGameOn':
            return {...state,
                gameOn: action.payload}
        case 'setGuesses':
            return {...state,
                guesses: action.payload}
        case 'setIterations':
            return {...state,
                iterations: action.payload}
        case 'setBoard':
            return {...state, board: action.payload}
        default:
            return state;
    }
};

const throwError = dispatch => (message) => {
    dispatch({type: 'throwError', payload: {message}});
};

const setInfo = dispatch => (message) => {
    dispatch({type: 'setInfo', payload: {message}});
};

const setNumber = dispatch => (val) => {
    dispatch({type: 'setNumber', payload: {val}});
};

const setGameOn = dispatch => (val) => {
    dispatch({type: 'setGameOn', payload: {val}});
};

const setGuesses = dispatch => (val) => {
    dispatch({type: 'setGuesses', payload: {val}});
};

const setIterations = dispatch => (val) => {
    dispatch({type: 'setIterations', payload: {val}});
};

const setBoard = dispatch => (val) => {
    dispatch({type: 'setBoard', payload: val})
}
export const { Context, Provider } = createDataContext(
    appReducer,
    { setBoard, throwError, setInfo, setNumber, setGameOn, setGuesses, setIterations },
    {    
        board: []
     }
);

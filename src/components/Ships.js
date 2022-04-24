import React, { useContext } from 'react'
import {Context as AppContext} from '../context/AppContext';
import { SMALL_SIZE } from '../util/constants.js'

const shipCellStyle = {
    color: 'white',
    borderColor: 'black',
    border: 'solid',
    height: SMALL_SIZE + 2 + 'px',
    width: SMALL_SIZE + 2 + 'px',
    backgroundColor: 'brown',
    marginBottom: '10px'

}

const intervalStyle = {
    marginBottom: '10px',
    height: SMALL_SIZE + 2 + 'px',
    width: (SMALL_SIZE / 2) + 'px',
}
const Ships = () => {
    const { state: { ships }} = useContext(AppContext);
    return (
        <div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={shipCellStyle}></div>
                <div style={shipCellStyle}></div>
                <div style={shipCellStyle}></div>
                <div style={shipCellStyle}></div>
                <span>{ships[0].filter(s => s > 0).join(" ")}</span>
            </div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={shipCellStyle}></div>
                <div style={shipCellStyle}></div>
                <div style={shipCellStyle}></div>

                <div style={intervalStyle}></div>

                <div style={shipCellStyle}></div>
                <div style={shipCellStyle}></div>
                <div style={shipCellStyle}></div>
                <span>{ships[1].concat(ships[2]).filter(s => s > 0).join(" ")}</span>
            </div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={shipCellStyle}></div>
                <div style={shipCellStyle}></div>

                <div style={intervalStyle}></div>

                <div style={shipCellStyle}></div>
                <div style={shipCellStyle}></div>

                <div style={intervalStyle}></div>

                <div style={shipCellStyle}></div>
                <div style={shipCellStyle}></div>
                <span>{ships[3].concat(ships[4]).concat(ships[5]).filter(s => s > 0).join(" ")}</span>
            </div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={shipCellStyle}></div>

                <div style={intervalStyle}></div>

                <div style={shipCellStyle}></div>

                <div style={intervalStyle}></div>

                <div style={shipCellStyle}></div>

                <div style={intervalStyle}></div>

                <div style={shipCellStyle}></div>
                <span>{ships[6].concat(ships[7]).concat(ships[8]).concat(ships[9]).filter(s => s > 0).join(" ")}</span>
            </div>

        </div>
    )
}

export default Ships
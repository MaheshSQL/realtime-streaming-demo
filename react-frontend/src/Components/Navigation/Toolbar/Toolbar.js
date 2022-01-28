import React from 'react';

// import classes from './Toolbar.css'
import './Toolbar.css';
import streamlogo from '../../../../src/stream1.png'


const toolbar = (props) => (
    <header className="Toolbar">
        <table className="Table3">
            <tbody>
                <tr>
                    <td><div><img src={streamlogo} width='100%' width='100%'/></div></td>
                    <td><div className="Text">Streaming Monitor</div></td>                    
                </tr>
            </tbody>
        </table>

        
        
    </header>
);

export default toolbar;
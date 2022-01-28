import React from "react";
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';

//Just a function that returns a JSX
const layout = (props) => {      

    return (
        <Aux>
            <Toolbar />
            <main>{props.children}</main>
        </Aux>
        );
}

export default layout;
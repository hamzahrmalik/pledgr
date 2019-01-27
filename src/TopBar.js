import React, {Component} from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import classes from "@material-ui/core/package.json";

class Vote extends Component {

    render() {
        return (
            <div className=" ">
                <AppBar position="static">
                    <Toolbar>

                        <img src="./assets/logo.png" style={{height: 48, padding: 8}}/>


                    </Toolbar>
                </AppBar>

            </div>
        );
    }

}

export default Vote;

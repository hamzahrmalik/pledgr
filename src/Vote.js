import React, {Component} from "react";

import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/core/Menu";
import classes from "@material-ui/core/package.json";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import dateFormat from "dateformat";

class Vote extends Component {


    constructor(props) {
        super(props);



    }

    handleClickOpen = () => {
        this.setState({addDialogOpen: true});
    };

    handleClose = () => {
        this.setState({addDialogOpen: false});
    };



    render() {
        return (
            <div className=" ">
                <AppBar position="static">
                    <Toolbar>

                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Pledgr
                        </Typography>

                    </Toolbar>
                </AppBar>


                <div style={{padding: 16, textAlign: 'center'}}>


                    <h1>Vote</h1>
                    <h2>Did they do the thing?</h2>


                    <Button style={{height: 200, width: 200, background: '#33ff88', color: '#FFF', fontSize: 40}}>YES</Button>
                    <Button style={{height: 200, width: 200, background: '#ff5555', marginLeft: 100, color: '#FFF', fontSize: 40}}>NO</Button>

                </div>


            </div>

        );
    }

}

export default Vote;

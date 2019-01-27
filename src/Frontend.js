import React, {Component} from 'react';

import './App.css';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/core/Menu';
import classes from '@material-ui/core/package.json';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import dateFormat from "dateformat";


let id = 0;
function createData(name, started, ended, witnesses, value) {
    id += 1;
    return {id, name, started, ended, witnesses, value};
}


class App extends Component {

    constructor(props) {
        super(props);


        this.handleInputChange = this.handleInputChange.bind(this);
    }

    state = {
        addDialogOpen: false,
        data: []
    };

    handleClickOpen = () => {
        this.setState({addDialogOpen: true});
    };

    handleClose = () => {
        this.setState({addDialogOpen: false});
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    addItem = () => {

        let data = this.state.data;
        let newDatum = createData(this.state.pledge, new Date().getTime(), this.state.endDate, "Bill", this.state.amount);
        data.push(newDatum);

        this.setState({data: data});
        this.makeContract(newDatum);
        this.handleClose();
    };

    makeContract = (data) => {
        console.log("Making contract of");
        console.log(data)
        //TODO do the magic
    };

    render() {
        return (
            <div className=" ">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            PLEDGR
                        </Typography>

                    </Toolbar>
                </AppBar>


                <div style={{padding: 16}}>

                    <h1>My Pledges</h1>


                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Pledge</TableCell>
                                    <TableCell>Started</TableCell>
                                    <TableCell>End</TableCell>
                                    <TableCell>Witnesses</TableCell>
                                    <TableCell>Value</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.data.map(n => {
                                    return (
                                        <TableRow key={n.id}>
                                            <TableCell component="th" scope="row">
                                                {n.name}
                                            </TableCell>
                                            <TableCell>{dateFormat(n.started, "dddd, mmmm dS, yyyy")}</TableCell>
                                            <TableCell>{dateFormat(n.ended, "dddd, mmmm dS, yyyy")}</TableCell>
                                            <TableCell>{n.witnesses}</TableCell>
                                            <TableCell>{n.value}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Paper>

                    <Button variant="contained" color="primary" style={{marginTop: 16}} onClick={this.handleClickOpen}>
                        Add Pledge
                    </Button>

                </div>
                <Dialog
                    open={this.state.addDialogOpen}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add Pledge</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Pledge"
                            name="pledge"
                            value={this.state.pledge}
                            onChange={this.handleInputChange}
                            type="text"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="witness"
                            label="Witness Address"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="value"
                            name="amount"
                            value={this.state.amount}
                            onChange={this.handleInputChange}
                            label="Value (ETH)"
                            type="number"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="endDate"
                            name="endDate"
                            value={this.state.endDate}
                            onChange={this.handleInputChange}
                            label="End Date"
                            type="date"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.addItem} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>


        );
    }
}

export default App;

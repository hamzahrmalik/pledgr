import React, {Component} from "react";

import Button from "@material-ui/core/Button";
import TopBar from "./TopBar"
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
import {createPledge, getPledges} from "./store/actions";
import {connect} from "react-redux";
let id = 0;

function createData(name, started, ended, witnesses, charity, value) {
    id += 1;
    return {id, name, started, ended, witnesses, charity, value};
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

    //   componentDidMount() {
    //     this.props.updatePledges();
    //   }

    handleClickOpen = () => {
        this.setState({addDialogOpen: true});
    };

    handleClose = () => {
        this.setState({addDialogOpen: false});
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    addItem = () => {
        let data = this.state.data;
        let newDatum = createData(
            this.state.pledge,
            new Date().getTime(),
            this.state.endDate,
            this.state.witness,
            this.state.charity,
            this.state.amount
        );
        data.push(newDatum);

        this.setState({data: data});
        this.makeContract(newDatum);
        this.handleClose();
    };

    makeContract = data => {
        this.props.createPledge();
        console.log("Making contract of");
        console.log(data);
        //TODO do the magic
    };

    render() {
        return (
            <div className=" ">
                <TopBar position="static"/>


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
                                    <TableCell>Charity</TableCell>
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
                                            <TableCell>
                                                {dateFormat(n.started, "dddd, mmmm dS, yyyy")}
                                            </TableCell>
                                            <TableCell>
                                                {dateFormat(n.ended, "dddd, mmmm dS, yyyy")}
                                            </TableCell>
                                            <TableCell>{n.witnesses}</TableCell>
                                            <TableCell>{n.charity}</TableCell>
                                            <TableCell>{n.value}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Paper>

                    <Button
                        variant="contained"
                        color="primary"
                        style={{marginTop: 16}}
                        onClick={this.handleClickOpen}
                    >
                        Add Pledge
                    </Button>
                </div>
                <Dialog
                    open={this.state.addDialogOpen}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Add Pledge</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="normal"
                            id="name"
                            label="Pledge"
                            InputLabelProps={{shrink: true}}
                            name="pledge"
                            value={this.state.pledge}
                            onChange={this.handleInputChange}
                            type="text"
                            fullWidth
                        />
                        <TextField
                            InputLabelProps={{shrink: true}}
                            autoFocus
                            margin="normal"
                            name="witness"
                            label="Witness Address"
                            type="text"
                            value={this.state.witness}
                            onChange={this.handleInputChange}
                            fullWidth
                        />
                        <TextField
                            InputLabelProps={{shrink: true}}
                            autoFocus
                            margin="normal"
                            name="charity"
                            label="Charity Address"
                            value={this.state.charity}
                            onChange={this.handleInputChange}
                            type="text"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="normal"
                            InputLabelProps={{shrink: true}}
                            id="value"
                            name="amount"
                            value={this.state.amount}
                            onChange={this.handleInputChange}
                            label="Value (ETH)"
                            type="number"
                            fullWidth
                        />
                        <TextField
                            InputLabelProps={{shrink: true}}
                            autoFocus
                            margin="normal"
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

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        createPledge: () => {
            dispatch(createPledge());
        },
        updatePledges: () => {
            dispatch(getPledges());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

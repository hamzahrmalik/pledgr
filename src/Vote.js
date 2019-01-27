import React, {Component} from "react";

import Button from "@material-ui/core/Button";
import TopBar from "./TopBar"
import TextField from "@material-ui/core/TextField";

class Vote extends Component {

    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    state = {
        votingFor: ""
    };

    clickedYes() {
        console.log("YE");
    };

    clickedNo() {
        console.log("NO");
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className=" ">
                <TopBar position="static"/>


                <div style={{padding: 16, textAlign: 'center'}}>


                    <h1>Vote</h1>
                    <h2>What would you like to vote on?</h2>

                    <TextField
                        autoFocus
                        margin="normal"
                        id="name"
                        label="Address"
                        InputLabelProps={{shrink: true}}
                        name="votingFor"
                        value={this.state.votingFor}
                        onChange={this.handleInputChange}
                        type="text"
                        style={{width: 400}}
                    />
                    <br/>
                    <br/>
                    <h2>Was the action completed?</h2>

                    <Button onClick={this.clickedYes} style={{
                        height: 200,
                        width: 200,
                        background: '#33ff88',
                        color: '#FFF',
                        fontSize: 40
                    }}>YES</Button>

                    <Button onClick={this.clickedNo} style={{
                        height: 200,
                        width: 200,
                        background: '#ff5555',
                        marginLeft: 100,
                        color: '#FFF',
                        fontSize: 40
                    }}>NO</Button>

                </div>


            </div>

        );
    }

}

export default Vote;

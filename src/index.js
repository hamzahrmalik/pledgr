import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, browserHistory} from "react-router";
import {Provider} from "react-redux";
import {syncHistoryWithStore} from "react-router-redux";

// Layouts
import Frontend from "./Frontend";
import Vote from "./Vote";


// Redux Store
import store from "./store";

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store);

// Initialize web3 and set in Redux.


ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="vote" component={Vote}/>
            <Route path="/" component={Frontend}>
            </Route>
        </Router>
    </Provider>,
    document.getElementById("root")
);

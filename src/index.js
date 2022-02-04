import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import TwilioIndex from "./components/landing";
import Streamer from "./components/streamer";
import Audience from "./components/audience";

function App() {
    return (
        <Router>
            <Switch>
	    		<Route exact path='/' component={TwilioIndex} />
	    		<Route exact path='/streamer' component={Streamer} />
	    		<Route exact path='/watch' component={Audience} />
			</Switch>
        </Router>
    )
}

ReactDOM.render(
	<App />,
	document.getElementById("root")
)
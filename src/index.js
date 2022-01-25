import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import TwilioIndex from "./components/landing";
import Streamer from "./components/streamer";
import Audience from "./components/audience";
// import SignUp from "./components/signup";
// import NotFound from "./components/notfound";
// import BucketList from "./components/bucketlist";
// import Item from "./components/item";
// import Swagger from "./components/swagger";

function App() {
    return (
        <Router>
            <Switch>
	    		<Route exact path='/' component={TwilioIndex} />
	    		<Route exact path='/streamer' component={Streamer} />
	    		<Route exact path='/watch' component={Audience} />
	    		{/* <Route exact path='/signup' component={SignUp} />
	    		<Route exact path='/bucketlist' component={BucketList} />
	    		<Route exact path='/item' component={Item} />
	    		<Route exact path='/api/v1/api-docs' component={Swagger} />
	    		<Route path='' component={NotFound} /> */}
			</Switch>
        </Router>
    )
}

ReactDOM.render(
	<App />,
	document.getElementById("root")
)
import React from 'react';
import { usePaystackPayment } from 'react-paystack';
  
const config = {
	reference: "ba81539b-eaf4-44dc-bc75-6db03cfa8c23",
	email: "cj.ugwuanyi@gmail.com",
	amount: 20000 * 100,
	publicKey: 'pk_test_cda22d68b0416e571c67f5e175ab72110df594fd',
};
  
  // you can call this function anything
const onSuccess = (reference) => {
// Implementation for whatever you want to do with reference and after success call.
	console.log(reference);
};

  // you can call this function anything
const onClose = () => {
// implementation for  whatever you want to do when the Paystack dialog closed.
console.log('closed')
}

const PaystackHookExample = () => {
	const initializePayment = usePaystackPayment(config);

	return (
		<div>
			<button onClick={() => {
				initializePayment(onSuccess, onClose)
			}}>Paystack Hooks Implementation</button>
		</div>
	);
};
  
function Paystack() {
return (
	<div className="App">
		<header className="App-header">
			<p>
				Edit <code>src/App.js</code> and save to reload.
			</p>
			<a
				className="App-link"
				href="https://reactjs.org"
				target="_blank"
				rel="noopener noreferrer"
			>
			Learn React
			</a>
		</header>

		<PaystackHookExample />
	</div>
);
}
  
  export default Paystack;


// import React from 'react';
// import {Link} from "react-router-dom";
// import HttpService from '../httpservice';
// import store from "store";
// import Noty from 'noty';

// const Utilities = {
//     Notify: function(msg, type, done) {//alert, success, warning, error, info/information
//         new Noty({
//             type: type,
//             layout: 'topRight',
//             theme: 'nest',
//             text: msg,
//             timeout: '5000',
//             progressBar: true,
//             closeWith: ['click'],
//             killer: true,
//             callbacks: {
//                 beforeShow: function() {
//                    // console.log('beforeend', 'Preparing... ⏱<br/>');
//                 },
//                 onShow: function() {
//                    // console.log('beforeend', 'Showed ✨<br/>');
//                 },
//                 onHover: function() {
//                    // console.log('beforeend', 'Hovered 👀<br/>');
//                 },
//                 onClick: function() {
//                   // console.log('beforeend', 'Clicked ✅<br/>');
//                 },
//                 onClose: function() {
//                    // console.log('beforeend', 'Bye 👋🏻<br/>');
//                    if(done) return done.call();
//                 }
//             },
//         }).show();
//     },

//     Indicator: function() {
//         return (
//             <div className="spinner-border" role="status" style={{
//                 marginLeft: ".5rem",
//                 width: "1.2rem",
//                 height: "1.2rem",
//                 marginBottom: "2px"
//             }}>
//                 <span className="sr-only">Loading...</span>
//             </div>
//         )
//     },

//     PageLoader: function() {
//         return (
//             <div className="container-fluid">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-md-12">
//                             <div className="preloader1">
//                                 <div className="loader loader-inner-1">
//                                     <div className="loader loader-inner-2">
//                                         <div className="loader loader-inner-3">
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     },

//     NavBar: function(props) {
//         return (
//             <nav className="navbar navbar-light bg-light justify-content-between">
//                 <a className="navbar-brand">{props.name || "BucketList"}</a>
//                 {props.signOut}
//             </nav>
//         )
//     }
// }

// class Login extends React.Component {
// 	constructor() {
//         super();

//         this.state = {
//             email: "",
//             password: "",
//             ajaxcalled: false
//         }
//     }

//     handleInput = (e) => {

//         this.setState({
//             [e.target.name]: e.target.value
//         });
//     }

//     handleSubmit = (e) => {
//         e.preventDefault();

//         if(!this.state.email) {
//             Utilities.Notify("Please enter your email address.", "error");
//         }
//         else if(!this.state.password) {
//             Utilities.Notify("Your password is required.", "error");
//         }
//         else {

//             this.setState({ajaxcalled: true});

//             let data = {
//             	email: this.state.email,
//             	password: this.state.password
//             }

//             HttpService.NoTokenServicePost(data, "auth/login")
//                 .then((response) => {

//                     this.setState({ajaxcalled: false})

//                     if(response.data.token) {
//                     	console.log("res: ", response);

//                         store.set("token", response.data.token);

//                         let tokendata = window.atob(response.data.token.split(".")[1]);
//                         let parseddata = JSON.parse(tokendata);

//                         store.set("userdata", {
//                             name: parseddata.name, 
//                             email: parseddata.email, 
//                             id: parseddata.id
//                         });

//                         this.props.history.push("/bucketlist");
//                     }
//                     else {
//                         Utilities.Notify("Login failed. Please ensure that you have provided the correct email address and password.", "info");
//                         console.log("Login failed")
//                     }
//                 })
//                 .catch((error) => {
//                     console.log("error: ", error);

//                     Utilities.Notify("Unable to login at this time. Please try again later.", "info");
//                     this.setState({ajaxcalled: false})
//                 })
//         }
//     }

// 	render() {
// 		return (
// 			<article>
//                 <Utilities.NavBar />
// 				<div className="container">
// 				    <div className="row">
// 				        <div className="col-md-12 min-vh-100 d-flex flex-column justify-content-center">
// 				            <div className="row">
// 				                <div className="col-lg-6 col-md-8 mx-auto">

// 				                    <div className="card rounded">
// 				                        <div className="card-header">
// 				                            <h3 className="mb-0">Login</h3>
// 				                        </div>
// 				                        <div className="card-body">
// 				                            <form className="form" role="form" autoComplete="off" id="formLogin">
// 				                                <div className="form-group">
// 				                                    <label htmlFor="uname1">Email</label>
// 				                                    <input onChange={this.handleInput} value={this.state.email} 
// 				                                    	name="email" type="text" className="form-control form-control-lg rounded-0" 
// 				                                    	id="uname1" required="" placeholder="Email address" />
// 				                                </div>
// 				                                <div className="form-group">
// 				                                    <label>Password</label>
// 				                                    <input onChange={this.handleInput} value={this.state.password} 
// 				                                    name="password" type="password" 
// 				                                    className="form-control form-control-lg rounded-0" id="pwd1" required="" 
// 				                                    placeholder="Password"
// 				                                    />
// 				                                </div>
// 				                                <div>
// 				                                    <label className="custom-control custom-checkbox">
// 				                                      	<input type="checkbox" className="custom-control-input" />
// 				                                      	<span className="custom-control-indicator"></span>
// 				                                    </label>
// 				                                </div>
// 				                                <button type="button" className="btn btn-success btn-lg float-right" id="btnLogin" onClick={this.handleSubmit}>Login
//                                                 {this.state.ajaxcalled ? Utilities.Indicator() : <div></div>}
//                                                 </button>
                                                
//                                                 <div>Don't have an account? <Link to="signup">Sign Up</Link></div>
// 				                            </form>
// 				                        </div>
// 				                    </div>
// 				                </div>
// 				            </div>
// 				        </div>
// 				    </div>
// 				</div>
// 			</article>
// 		)
// 	}
// }

// export {Login, Utilities};
import React, { Component } from 'react';
import {Alert} from 'react-bootstrap';
import App from './App';

class Login extends Component {
	constructor(props){
		super(props);
		this.login = this.login.bind(this);
		this.state = {loggedUser:0, errorMsg:""};
	}

	login(e){
		e.preventDefault();

		let username = document.getElementById("username").value;
		let password = document.getElementById("password").value;

		fetch('/data.json').then(response => response.json()).then(data => {
      		let matchedUser = data.users.filter(u => u.username === username);

      		if(matchedUser.length && matchedUser[0].password && matchedUser[0].password === password) {
      			this.setState({ loggedUser: matchedUser[0].id });
      		} else {
      			this.setState({errorMsg: "invalid credentials"});
      		}
    	});
	}

	render(){
		let login = (
			<form className="login-form">
				<h2>Community<br/>Books</h2>
				{this.state.errorMsg && (<Alert bsStyle="danger">{this.state.errorMsg}</Alert>)}
				<label>Username</label>
				<input id="username" className="form-control" placeholder="&#xf007; Username" type="text"/>
				<label>Password</label>
				<input id="password" className="form-control" placeholder="&#xf023; Password" type="password"/>
				<input type="submit" onClick={this.login}/>
			</form>
		);

		let app = <App userId={this.state.loggedUser} />;

		return this.state.loggedUser > -1 ? app : login;
	}
}

export default Login;


//<Switch>
//     		<Route path="/login" render={(props) => <Login loginSuccess={authenticate} />} />
//     		<Route path="/" render={props => loggedIn > -1 ? (<App {...props} />) : (<Redirect to="/login" />)} />
//</Switch>
import React, { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Books from './Books';
import Communities from './Communities';
import Profile from './Profile';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {appData: {}, loggedUser:{}};
  }

  //Load data for the first time
  componentDidMount() {
    fetch('/data.json').then(response => response.json()).then(data => {
      this.setState({appData: data, loggedUser:data.users[this.props.userId]});
    });
  }

  render() {
    return (
      <div className="App">
        <Main data={this.state.appData} user={this.state.loggedUser} />
        <Nav />
      </div>
    );
  }
}

class Main extends Component {
  render(){
    return(
      <Switch>
        <Route path="/home" render={(props) => <Home data={this.props.data} user={this.props.user} />} />
        <Route path="/books" component={(props) => <Books books={this.props.data.books} />}/>
        <Route path="/communities" component={(props) => <Communities communities={this.props.data.communities} />}/>
        <Route path="/profile" render={(props) => <Profile data={this.props.data} user={this.props.user} />}/>
      </Switch>
    );
  }
}

class Nav extends Component {
  render(){
    return (
      <nav>
        <ul>
          <li><NavLink activeClassName="active" to="/home"><i className="fa fa-lg fa-home"></i>Home</NavLink></li>
          <li><NavLink activeClassName="active" to="/books"><i className="fa fa-lg fa-book"></i>Books</NavLink></li>
          <li><NavLink activeClassName="active" to="/communities"><i className="fa fa-lg fa-users"></i>Communities</NavLink></li>
          <li><NavLink activeClassName="active" to="/profile"><i className="fa fa-lg fa-user"></i>Profile</NavLink></li>
        </ul>
      </nav>
    );
  }
}


export default App;

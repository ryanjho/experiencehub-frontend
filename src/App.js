import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import UserLogin from './components/UserLogin';
import Experience from './components/Experience';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/users/login" component={UserLogin} />

            <Route path="/experiences/:id" exact render={(props) =>
              <Experience 
                experienceId={props.match.params.id}
              />
            } 
            />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;

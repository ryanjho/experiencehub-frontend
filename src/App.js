import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Experience from './components/Experience';
import UserSignUp from './components/UserSignUp';
import UserLogin from './components/UserLogin';
import MerchantSignUp from './components/MerchantSignUp';
import MerchantLogin from './components/MerchantLogin';

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

            <Route path="/users/login" component={UserLogin} />
            <Route path="/users/signup" component={UserSignUp} />
            <Route path="/merchants/login" component={MerchantLogin} />
            <Route path="/merchants/signup" component={MerchantSignUp} />

          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;

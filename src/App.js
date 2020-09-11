import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Experience from './components/Experience';
import UserSignUp from './components/UserSignUp';
import UserLogin from './components/UserLogin';
import MerchantSignUp from './components/MerchantSignUp';
import MerchantLogin from './components/MerchantLogin';
import sessionsService from './services/sessionsService';
import MerchantDashboard from './components/MerchantDashboard';
import NewExperienceForm from './components/NewExperienceForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLoggedIn: false,
      merchantLoginStatus: false,
      merchant: null,
      user: null,
      test: 'TESTING',
    }
  }

  merchantLogout = async () => {
    await sessionsService.merchantLogout();
    this.setState({merchantLoginStatus: false});
    localStorage.clear();
  }

  merchantLogin = async (merchant) => {
    this.setState({
      merchantLoginStatus: true,
      merchant: merchant
    });
  }

  checkMerchantAuthentication = async () => {
    const response = await sessionsService.checkMerchantAuthentication();
    if (response.merchantLoginStatus) {
      this.setState({
        merchantLoginStatus: true,
        merchant: JSON.parse(localStorage.getItem('merchant'))
      })
    } else {
      this.setState( {
        merchantLoginStatus: false
      })
    }
  }
  

  async componentDidMount() {
    await this.checkMerchantAuthentication();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header 
            merchantLoginStatus={this.state.merchantLoginStatus}
            merchantLogout={this.merchantLogout}
            testButton={this.testButton}
          />
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/users/login" component={UserLogin} />

            <Route path="/experiences/new" render={(props) => 
              <NewExperienceForm
                merchantLoginStatus={this.state.merchantLoginStatus}
                merchant={this.state.merchant}
              />
            } />

            <Route path="/experiences/:id" exact render={(props) =>
              <Experience 
                experienceId={props.match.params.id}
                merchantLoginStatus={this.state.merchantLoginStatus}
                merchant={this.state.merchant}
              />
              } 
            />

            <Route path="/users/login" component={UserLogin} />
            <Route path="/users/signup" component={UserSignUp} />
            <Route path="/merchants/login" render={(props) =>
              <MerchantLogin 
                merchantLogin = {this.merchantLogin}
                merchantLoginStatus={this.state.merchantLoginStatus}
              />
            } />
            <Route path="/merchants/signup" component={MerchantSignUp} />
            
            <Route path="/merchants/dashboard" render={props => 
                <MerchantDashboard 
                  merchantLoginStatus={this.state.merchantLoginStatus} 
                  merchant={this.state.merchant}
                />
            } />
              

            <Route path="/" render={(props) => 
              <Home 
                merchantLoginStatus={this.state.merchantLoginStatus} 
              />
            }/>

          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;

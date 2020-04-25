import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Ask from './components/ask/ask.js';
import Response from './components/response/response.js';
import Settings from './components/settings/settings.js';
import 'bootstrap/dist/css/bootstrap.min.css';

var name = localStorage.getItem('name') || "friend"
var age = localStorage.getItem('age') || null
var gender = localStorage.getItem('gender') || null
var ethnicity = localStorage.getItem('ethnicity') || null


class App extends Component{
  constructor() {
    super();
    this.state = {
      page: "ask"
    }
  }


  render () {
    let page = null
    switch (this.state.page) {
      case 'ask':
        page = <Ask switchPage={this.switchPage} name={name}
                    settingsPage={this.settingsPage}/>
        break
      case 'response':
        page = <Response 
                name={name}
                settingsPage={this.settingsPage}/>
        break
      case 'settings':
        page = <Settings landingPage={this.landingPage}
                          name={name}
                          age={age}
                          gender={gender}
                          ethnicity={ethnicity}
                />
        break
      }
    return page
  }

  switchPage = () => {
    this.setState({
      page: "response"
    });
  };

  landingPage = () => {
    this.setState({
      page: "ask"
    });
    name = localStorage.getItem('name') || "friend"
    age = localStorage.getItem('age') || null
    gender = localStorage.getItem('gender') || null
    ethnicity = localStorage.getItem('ethnicity') || null
  };

  settingsPage = () => {
    this.setState({
      page: "settings"
    });
  };


}

export default App;

import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Ask from './components/ask/ask.js';
import Response from './components/response/response.js';
import Settings from './components/settings/settings.js';
import 'bootstrap/dist/css/bootstrap.min.css';

var name = localStorage.getItem('name') || "friend"

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
        page = <Ask switchPage={this.switchPage} name={name}/>
        break
      case 'response':
        page = <Response 
                name={name}/>
        break
      case 'settings':
        page = <Settings landingPage={this.landingPage}/>
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
  };


}

export default App;

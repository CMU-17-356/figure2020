import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Ask from './components/ask/ask.js';
import Response from './components/response/response.js';
import Settings from './components/settings/settings.js';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component{
  constructor() {
    super();
    this.state = {
      page: "settings"
    }
  }


  render () {
    let page = null
    switch (this.state.page) {
      case 'ask':
        page = <Ask switchPage={this.switchPage}/>
        break
      case 'response':
        page = <Response />
        break
      case 'settings':
        page = <Settings saveInformation={this.saveInformation}/>
        break
      }
    return page
  }

  switchPage = () => {
    this.setState({
      page: "response"
    });
    this.forceUpdate();
  };

  changeSettings = () => {
    this.setState({
      page: "settings"
    });
    this.forceUpdate();
  };

  saveInformation = () => {
    return true
  }



}

export default App;

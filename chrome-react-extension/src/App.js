import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Ask from './components/ask/ask.js';
import Response from './components/response/response.js';


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
        page = <Ask switchPage={this.switchPage}/>
        break
      case 'response':
        page = <Response />
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




}

export default App;

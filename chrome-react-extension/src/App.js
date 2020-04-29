import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Ask from './components/ask/ask.js';
import Response from './components/response/response.js';
import Settings from './components/settings/settings.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

var name = localStorage.getItem('name') || "friend"
var age = localStorage.getItem('age') || null
var gender = localStorage.getItem('gender') || null
var ethnicity = localStorage.getItem('ethnicity') || null


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: null,
      return: null
    }
  }

  componentDidMount() {
    axios.get("http://104.42.96.156/mostRecentQuestion")
      .then(res => {
        const resJson = res.data;
        const questionId = resJson.questionId;
        const answered = localStorage.getItem('answered');
        const currentId = localStorage.getItem('currId');
        // initial state: no question ever asked, or there is a new question that's different
        // from the current one
        if (currentId === null || questionId !== currentId) {
          this.setState({page : "ask"});
          localStorage.setItem('currId', questionId);
          localStorage.setItem('answered', 'false');
        }
        if (questionId === currentId && answered === "false") {
          this.setState({page: "ask"});
        }
        if (questionId === currentId && answered === "true") {
          this.setState({page: "response"});
        }
      });
  }

  render() {
    let page = null
    switch (this.state.page) {
      case 'ask':
        page = <Ask switchPage={this.switchPage} name={name}
                    settingsPage={this.settingsPage}
                    age={age}
                    gender={gender}
                    ethnicity={ethnicity}
                    />
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
      page: this.state.return
    });
    name = localStorage.getItem('name') || "friend"
    age = localStorage.getItem('age') || ""
    gender = localStorage.getItem('gender') || ""
    ethnicity = localStorage.getItem('ethnicity') || ""
  };

  settingsPage = () => {
    this.setState({
      page: "settings",
      return: this.state.page
    });
  };


}

export default App;

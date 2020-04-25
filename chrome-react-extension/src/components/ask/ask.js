import React, {Component} from "react";
import { Card } from 'react-bootstrap';
import './ask.css';
import '../../App.css';
import settings from '../../settings.png';
import axios from 'axios';

export class Ask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
      choices: null,
      choiceIds: null
    };
  }

  componentDidMount() {
    axios.get('http://104.42.96.156/mostRecentQuestion')
      .then(res => {
        const resJson = res.data;
        this.setState({
          question: resJson.questionBody,
          choices: resJson.choiceNames,
          choiceIds: resJson.choiceIds
        })
      });
  };

  switchPage = (i) => {
    fetch('http://104.42.96.156/response/' + this.state.choiceIds[i], {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          gender: this.props.gender,
          age: this.props.age,
          ethnicity: this.props.ethnicity,
        })
    }).then(async (response) => {
      console.log(response.status);
      });
    this.props.switchPage();
  }

  render() {
    let choicesList = []
    for (let i in this.state.choices) {
      let choice = this.state.choices[i];
      choicesList.push(
        <div onClick={() => this.switchPage(i)} key={i} className="cards" style={{margin: "12px"}}>
          <Card style={{ width: '9rem', height: '3rem', "backgroundColor": "rgba(0, 0, 0, .45)", "borderStyle": "solid", "borderWidth": "1px", "borderColor": "#FFF4F9", "borderRadius": "15px"}}>
            <Card.Body className="contains" style={{color: "white", display: "flex", "flexDirection": "row", "justifyContent": "center", "fontWeight":"550", "fontSize": "14px"}}>
              <Card.Text>{choice}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      )
    }
    return (
      <div>
        <button id="settings" onClick={this.props.settingsPage}><img src={settings} width="40px" height="40px"/></button>
        <div id="contain">
          <div style={{"font-size": "50px", "font-weight": "900px", "text-shadow": "3px 3px #D3D3D3", display: "flex", "flexDirection": "row", "justifyContent": "center"}}>
            Hello, {this.props.name}! <br></br>
          </div>
          <br></br>
          <Card style={{ width: '47rem', height: '10rem', "backgroundColor": "rgba(245, 245, 245, .45)", "borderStyle": "solid", "borderWidth": "1px", "borderColor": "#FFF4F9", "borderRadius": "15px"}}>
            <br></br>
            <div style={{"font-size": "25px", "font-weight": "900px", "text-shadow": "3px 3px #D3D3D3", display: "flex", "flexDirection": "row", "justifyContent": "center", "marginBottom":"10px"}}>
              {this.state.question}
            </div>
            <div id="responses">
              {choicesList}
            </div>
          </Card>
        </div>
      </div>
    )}
}

export default Ask;

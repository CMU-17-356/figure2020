import React, {Component} from "react";
import {Card} from "react-bootstrap";
import '../../App.css';
import './response.css';
import {Bar} from 'react-chartjs-2';
import settings from '../../settings.png';
import axios from 'axios';


/*************************/
/*  Class Implementation */
/*************************/

const legendOpts = {
  display: false
};

export class Response extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      choices: null,
      counts: null
    }
  }

    componentDidMount() {
    axios.get('http://104.42.96.156/mostRecentQuestionAnswers')
      .then(res => {
        const question = res.data;
        this.setState({
          question: question.body,
          choices: question.choices,
          counts: question.counts
        });
      })
    };

  render() {
    return (
      <div>
        <button id="settings" onClick={this.props.settingsPage}><img src={settings} width="40px" height="40px"/></button>
      <div id="containResponse" >
        <div style={{"font-size": "50px", "font-weight": "900px", "text-shadow": "3px 3px #D3D3D3", display: "flex", "flexDirection": "row", "justifyContent": "center"}}>
          Hello, {this.props.name}! <br></br>
        </div>
        <Card style={{"backgroundColor": "rgba(245, 245, 245, .5)", "borderStyle": "solid", "borderWidth": "1px", "borderColor": "#FFF4F9", "borderRadius": "15px", "width": "550px"}}>
          <div style={{ "fontSize": "25px", "fontWeight": "900px", "textShadow": "3px 3px #D3D3D3", display: "flex", "flexDirection": "row", "justifyContent": "center", "textAlign": "center"}}>
            <br></br>{this.state.question}
          </div>
          <div style={{"margin":"30px"}}>
            <Bar
              legend={legendOpts}
              data={{
                labels: this.state.choices,
                datasets: [
                  {
                    label: 'Number',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    borderColor: 'rgba(0, 0, 0, 1)',
                    borderWidth: 2,
                    hoverBackgroundColor: 'rgba(245, 245, 245, 0.4)',
                    hoverBorderColor: 'rgba(0, 0, 0, 1)',
                    data: this.state.counts
                  }
                ],
                legend: false
              }}
              width={100}
              height={50}
              options={{
                maintainAspectRatio: true,
                scales: {
                  xAxes: [{
                    gridLines: { display:false },
                  }],
                  yAxes: [{
                   ticks: {
                    beginAtZero: true,
                    }
                  }]
                }
              }}
            />
          </div>
        </Card>
      </div>
      </div>
    )
  }
}

/*************************/
/*   Export Statements   */
/*************************/
export default Response;
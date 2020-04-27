import React, {Component} from "react";
import {Card} from "react-bootstrap";
import '../../App.css';
import './response.css';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';

const legendOpts = {
  display: false
};


export class Response extends Component {
  constructor(props) {
    super(props);
    if (typeof this.props.location.state === 'undefined') {
      this.state = {
        question: null,
        choices: null,
        counts: null
      }
    } else {
      let redirectionId = this.props.location.state.redirectId;
      this.state = {
        questionId: redirectionId,
        question: null,
        choices: null,
        counts: null
      };
    }
  }

  componentDidMount() {
    axios.get('/question/' + this.state.questionId)
      .then(res => {
        const question = res.data;
        this.setState({
          question: question.body,
          date: question.date_asked,
          choices: question.choices,
          counts: question.counts
        });
      })
  };

  render() {
    return (
      <div id="containResponse" >
        <Card style={{"backgroundColor": "rgba(245, 245, 245, .5)","color": "black", "borderStyle": "solid", "borderWidth": "1px", "borderColor": "#FFF4F9", "borderRadius": "15px", "width": "550px"}}>
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
    )
  }
}

export default Response;

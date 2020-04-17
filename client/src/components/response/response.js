import React, {Component} from "react";
import {Card} from "react-bootstrap";
import '../../App.css';
import './response.css';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';


let questionTitle = 'How many hours did you sleep last night?';

/*************************/
/*  Class Implementation */
/*************************/

const legendOpts = {
  display: false
};

const data = {
  labels: ['Less than 3', '3 to 6', '6 to 9', 'More than 9'],
  datasets: [
    {
      label: 'Number',
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      hoverBackgroundColor: 'rgba(245,245,245,0.4)',
      hoverBorderColor: 'rgba(0,0,0,1)',
      data: [15, 20, 100, 57]
    }
  ],
  legend: false
};

export class Response extends Component {
  constructor(props) {
    super(props);
    if (typeof this.props.location.state === 'undefined') {
      this.state = {
        question: null,
        date: null,
        choices: null
      }
    } else {
      let redirectionId = this.props.location.state.redirectId;
      this.state = {
        questionId: redirectionId,
        question: null,
        date: null,
        choices: null
      };
    }
  }

  componentDidMount() {
    axios.get('/questions/' + this.state.questionId)
      .then(res => {
          const question = res.data;
          this.setState({question: question.body,
                         date: question.date_asked,
                         choices: question.choices
                          });
        })
  };

  render() {
    return (
      <div id="containResponse" >
        {this.state.question}
        {this.state.date}
        <Card style={{"background-color": "rgba(245, 245, 245, .5)", "borderStyle": "solid", "borderWidth": "1px", "borderColor": "#FFF4F9", "border-radius": "15px", "width": "550px"}}>
        <div style={{ "font-size": "25px", "font-weight": "900px", "text-shadow": "3px 3px #D3D3D3", display: "flex", "flexDirection": "row", "justifyContent": "center", "text-align": "center"}}>
          <br></br>Hours slept last night
        </div>
        <div style={{"margin":"30px"}}>
        <Bar
          legend={legendOpts}
          data={data}
          width={100}
          height={50}
          options={{
            maintainAspectRatio: true,
            scales: {
              xAxes: [{
                gridLines: { display:false },
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

/*************************/
/*   Export Statements   */
/*************************/
export default Response;
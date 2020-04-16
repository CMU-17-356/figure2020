import React, {Component} from "react";
import {Card} from "react-bootstrap";
import '../../App.css';
import './response.css';
import {Bar} from 'react-chartjs-2';



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
    this.state = {
    }
  }

  render() {
    return (
      <div id="containResponse" >
        <div style={{"font-size": "50px", "font-weight": "900px", "text-shadow": "3px 3px #D3D3D3", display: "flex", "flex-direction": "row", "justify-content": "center"}}>
          Hello, friend! <br></br>
        </div>
        <br></br>
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

        <hr style={{"position": "relative", "top": "250px", "margin-right":"50px","margin-left":"50px"}}></hr>

        </Card>
      </div>
    )


  }
}

/*************************/
/*   Export Statements   */
/*************************/
export default Response;
import React, {Component} from "react";
import {Chart} from "react-google-charts";
import {Card} from "react-bootstrap";

let questionTitle = 'How many hours did you sleep last night?';

/*************************/
/*  Class Implementation */
/*************************/
const google = window.google;

export class Response extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="container" style={{"margin-top": "65px"}}>
        <Card style={{"background-color": "rgba(245, 245, 245, .5)", "borderStyle": "solid", "borderWidth": "1px", "borderColor": "#FFF4F9", "border-radius": "15px"}}>
          <Card.Body>
            <h2>{questionTitle}</h2>
          </Card.Body>
        </Card>
        <br></br>
        <Card style={{"background-color": "rgba(245, 245, 245, .5)", "borderStyle": "solid", "borderWidth": "1px", "borderColor": "#FFF4F9", "border-radius": "15px"}}>
        <div className="my-2">
          <Chart 
            height={450}
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={[
              ['Option', 'Number of Responses', { role: 'style' }],
              ['Less than 3 hours', 12, "color:black;fill-opacity:0.3;stroke-width: 2;"],
              ['3 to 6 hours', 15, "color:black;fill-opacity:0.3;stroke-width: 2;"],
              ['6 to 9 hours', 13, "color:black;fill-opacity:0.3;stroke-width: 2;"],
              ['More than 9 hours', 11, "color:black;fill-opacity:0.3;stroke-width: 2;"],
            ]}
            options={{
              "backgroundColor": "transparent",
              "color": "black",
              legend: { position: "none" },
              vAxis: {
                gridlines: {
                color: 'transparent',
                }
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
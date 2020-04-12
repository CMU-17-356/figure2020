import React, {Component} from "react";
import {Chart} from "react-google-charts";
import {Card} from "react-bootstrap";

let questionTitle = 'How many hours did you sleep last night?';

/*************************/
/*  Class Implementation */
/*************************/
export class Response extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render() {
    return (
      <div className="container mx-auto">
        <Card>
          <Card.Body>
            <h2>{questionTitle}</h2>
          </Card.Body>
        </Card>
        <div className="my-2">
          <Chart
            height={500}
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={[
              ['Option', 'Number of Response'],
              ['< 3', 12],
              ['3-6', 15],
              ['6-9', 13],
              ['> 9', 11],
            ]}
            options={{
              titlePosition: 'none'
            }}
          />
        </div>
      </div>
    )


  }
}

/*************************/
/*   Export Statements   */
/*************************/
export default Response;
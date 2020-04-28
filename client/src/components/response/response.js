import React, {Component} from "react";
import {Card} from "react-bootstrap";
import './response.css';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';
import {Link} from "react-router-dom";



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
        counts: null,
        category: "totals",
        all: ["totals", "race", "gender", "age"]
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
      });
    axios.get('/questionData/' + this.state.questionId)
      .then(res => {
        const question = res.data;
        console.log(question);
      })
  };

  switchCategory = (choice) => {
    if (choice === "totals") {
      this.setState({
        category: "totals",
        others: ["race", "gender", "age"]
      })
    } else if (choice === "race") {
      this.setState({
        category: "race",
        others: ["totals", "gender", "age"]
      })    
    } else if (choice === "gender") {
      this.setState({
        category: "gender",
        others: ["totals", "race", "age"]
      })    
    } else {
      this.setState({
        category: "age",
        others: ["totals", "race", "gender"]
      })      
    }
  }

  render() {
    var categories = []
    for (let i in this.state.all) {
      let choice = this.state.all[i];
      if (choice === this.state.category) {
      categories.push(
        <div onClick={() => this.switchCategory(choice)}>
            <Card style={{ "backgroundColor": "rgba(0,0,0,.4)",width: '9rem', height: '3rem', "borderStyle": "solid", "borderWidth": "1px", "borderColor": "#FFF4F9", "borderRadius": "15px"}}>
              <Card.Body style={{fontWeight: "800"}}className="contains">
                <Card.Text>{choice}</Card.Text>
              </Card.Body>
            </Card>
        </div>
      )} else {
      categories.push(
        <div onClick={() => this.switchCategory(choice)}>
            <Card style={{ width: '9rem', height: '3rem', "borderStyle": "solid", "borderWidth": "1px", "borderColor": "#FFF4F9", "borderRadius": "15px"}}>
              <Card.Body className="contains">
                <Card.Text>{choice}</Card.Text>
              </Card.Body>
            </Card>
        </div>
      )}
    }
    return (
      <div id="containResponse" >
        <div>
        <Card style={{ color:'black', margin: "25px", width: '13rem', height: '22rem', "backgroundColor": "rgba(245, 245, 245, .2)", "borderStyle": "solid", "borderWidth": "1px", "borderColor": "#FFF4F9", "borderRadius": "15px"}}>
          <br></br>
          <div style={{"color":"black", "font-size": "25px", "font-weight": "900px", "text-shadow": "3px 3px #D3D3D3", display: "flex", "flexDirection": "row", "justifyContent": "center", "marginBottom":"10px"}}>
            View response by
          </div>
          <div id="responses">
          {categories}
          </div>
        </Card>
        <Link to={{pathname: '/'}}>
        <Card style={{ color:'black', margin: "25px", width: '13rem', "backgroundColor": "rgba(245, 245, 245, .2)", "borderStyle": "solid", "borderWidth": "1px", "borderColor": "#FFF4F9", "borderRadius": "15px"}}>
        <Card.Body>Return to Questions</Card.Body>
        </Card>
        </Link>

        </div>

        <Card style={{margin: "25px", "backgroundColor": "rgba(245, 245, 245, .5)","color": "black", "borderStyle": "solid", "borderWidth": "1px", "borderColor": "#FFF4F9", "borderRadius": "15px", "width": "730px"}}>
          <div style={{ "fontSize": "25px", "fontWeight": "900px", "textShadow": "3px 3px #D3D3D3", display: "flex", "flexDirection": "row", "justifyContent": "center", "textAlign": "center"}}>
            <br></br>{this.state.question}
          </div>
          {this.state.category === "totals" ?
          <div style={{"margin":"25px"}}>
            <Bar
              legend={{display: false}}
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
          </div> : null }
          {this.state.category === "gender" ? 
          <div style={{"margin":"25px"}}>
          <Bar 
          data={ 
            {datasets:[{
                label: 'females',
                backgroundColor: 'rgba(255, 115, 192, 0.5)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2,
                data:[1, 4, 2,3]
              },
              {
                label: 'males',
                backgroundColor: 'rgba(52, 210, 235, 0.5)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2,
                data:  [2, 4, 2,1]
              }],
            labels: this.state.choices
          }}
          options={{
           scales: {
                xAxes: [{
                    stacked: true,
                    gridLines: { display:false }
                }],
                yAxes: [{
                   stacked: true,
                   ticks: {
                    beginAtZero: true,
                    }
                }]
            }}} />
          </div> : null}

          {this.state.category === "age" ? 
          <div style={{"margin":"25px"}}>
          <Bar 
          data={ 
            {datasets:[{
                label: '<10',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2,
                data:[1, 4, 2,3]
              },
              {
                label: '10-20',
                backgroundColor: 'rgba(38, 8, 51, 0.7)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2,
                data:  [2, 4, 2,1]
              },              
              {
                label: '20-30',
                backgroundColor: 'rgba(100, 30, 120, 0.7)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2,
                data:  [2, 4, 2,1]
              },
              {
                label: '30-40',
                backgroundColor: 'rgba(150, 60, 200, 0.7)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2,
                data:  [2, 4, 2,1]
              },
              {
                label: '40-50',
                backgroundColor: 'rgba(190, 100, 225, 0.7)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2,
                data:  [2, 4, 2,1]
              },
              {
                label: '50-60',
                backgroundColor: 'rgba(221, 153, 242, 0.7)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2,
                data:  [2, 4, 2,1]
              },
              {
                label: '60+',
                backgroundColor: 'rgba(236, 205, 250, 0.7)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2,
                data:  [2, 4, 2,1]
              }],
            labels: this.state.choices
          }}
          options={{
           scales: {
                xAxes: [{
                    stacked: true,
                    gridLines: { display:false }
                }],
                yAxes: [{
                   stacked: true,
                   ticks: {
                    beginAtZero: true,
                    }
                }]
            }}} />
          </div> : null}

          {this.state.category === "race" ? 
          <div style={{"margin":"25px"}}>
          <Bar 
          data={ 
            {datasets:[{
                label: 'White',
                backgroundColor: 'rgba(245, 138, 66, 0.5)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2,
                data:[1, 4, 2,3]
              },
              {
                label: 'African American',
                backgroundColor: 'rgba(117, 219, 86, 0.5)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2,
                data:  [2, 4, 2,1]
              },              
              {
                label: 'Asian',
                backgroundColor: 'rgba(86, 219, 219, 0.5)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2,
                data:  [2, 4, 2,1]
              },
              {
                label: 'Hispanic',
                backgroundColor: 'rgba(167, 88, 224, 0.5)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2,
                data:  [2, 4, 2,1]
              },
              {
                label: 'American Indian',
                backgroundColor: 'rgba(224, 88, 151, 0.5)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2,
                data:  [2, 4, 2,1]
              },
              {
                label: 'Other',
                backgroundColor: 'rgba(196, 20, 43, 0.5)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2,
                data:  [2, 4, 2,1]
              }],
            labels: this.state.choices
          }}
          options={{
           scales: {
                xAxes: [{
                    stacked: true,
                    gridLines: { display:false }
                }],
                yAxes: [{
                   stacked: true,
                   ticks: {
                    beginAtZero: true,
                    }
                }]
            }}} />
          </div> : null}
        </Card>
      </div>
    )
  }
}

export default Response;

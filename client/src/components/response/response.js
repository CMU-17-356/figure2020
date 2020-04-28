import React, {Component} from "react";
import {Card} from "react-bootstrap";
import './response.css';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';
import {Link} from "react-router-dom";


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
        counts: null,
        category: "totals",
        others: ["race", "gender", "age"]
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
    for (let i in this.state.others) {
      let choice = this.state.others[i];
      categories.push(
        <div onClick={() => this.switchCategory(choice)}>
            <Card style={{ width: '9rem', height: '3rem', "borderStyle": "solid", "borderWidth": "1px", "borderColor": "#FFF4F9", "borderRadius": "15px"}}>
              <Card.Body className="contains">
                <Card.Text>{choice}</Card.Text>
              </Card.Body>
            </Card>
        </div>
      )
    }
    return (
      <div id="containResponse" >
        <div>
        <Card style={{ color:'black', margin: "25px", width: '13rem', height: '22rem', "backgroundColor": "rgba(245, 245, 245, .2)", "borderStyle": "solid", "borderWidth": "1px", "borderColor": "#FFF4F9", "borderRadius": "15px"}}>
          <br></br>
          <div style={{"color":"black", "font-size": "25px", "font-weight": "900px", "text-shadow": "3px 3px #D3D3D3", display: "flex", "flexDirection": "row", "justifyContent": "center", "marginBottom":"10px"}}>
            Seeing response by {this.state.category}
          </div>
          <div id="responses">
          <br></br>View response by
          {categories}
          </div>
        </Card>
        <Link to={{pathname: '/'}}>
        <Card style={{ color:'black', margin: "25px", width: '13rem', "backgroundColor": "rgba(245, 245, 245, .2)", "borderStyle": "solid", "borderWidth": "1px", "borderColor": "#FFF4F9", "borderRadius": "15px"}}>
        <Card.Body>Return to Questions</Card.Body>
        </Card>
        </Link>

        </div>

        <Card style={{margin: "25px", "backgroundColor": "rgba(245, 245, 245, .5)","color": "black", "borderStyle": "solid", "borderWidth": "1px", "borderColor": "#FFF4F9", "borderRadius": "15px", "width": "800px"}}>
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

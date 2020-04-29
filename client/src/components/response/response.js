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
        all: ["totals", "race", "gender", "age"],
        gender_male: [],
        gender_female: [],
        gender_nonbinary: [],
        gender_other: [],
        gender_unknown: [],
        age_10: [],
        age_10_20: [],
        age_20_30: [],
        age_30_40: [],
        age_40_50: [],
        age_50_60: [],
        age_60: [],
        age_unknown: [],
        race_white: [],
        race_african_american: [],
        race_asian: [],
        race_hispanic: [],
        race_american_indian: [],
        race_other: [],
        race_unknown: []
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
        console.log(question)
        var gender_male = [];
        var gender_female = [];
        var gender_nonbinary = [];
        var gender_other = [];
        var gender_unknown = [];
        var age_10 = [];
        var age_10_20 = [];
        var age_20_30 = [];
        var age_30_40 = [];
        var age_40_50 = [];
        var age_50_60 = [];
        var age_60 = [];
        var age_unknown = [];
        var race_white = [];
        var race_african_american = [];
        var race_asian = [];
        var race_hispanic = [];
        var race_american_indian = [];
        var race_other = [];
        var race_unknown = [];
        for (let i in this.state.choices) {
          let d = question[i][this.state.choices[i]]

          var male = 0
          var female = 0
          var nonbinary = 0
          var other = 0
          var unknown = 0
          let gender = d["gender"]
          for (let i in gender){
            if (gender[i]["_id"] === "male") {
              male = gender[i]["count"]
            } else if (gender[i]["_id"] === "female") {
              female = gender[i]["count"]
            } else if (gender[i]["_id"] === "nonbinary") {
              nonbinary = gender[i]["count"]
            } else if (gender[i]["_id"] === "other") {
              other = gender[i]["count"]
            } else if (gender[i]["_id"] === "unknown") {
              unknown = gender[i]["count"]
            }
          }
          gender_male.push(male)
          gender_female.push(female)
          gender_nonbinary.push(nonbinary)
          gender_other.push(other)
          gender_unknown.push(unknown)

          var a_10 = 0
          var a_10_20 = 0
          var a_20_30 = 0
          var a_30_40 = 0
          var a_40_50 = 0
          var a_50_60 = 0
          var a_60 = 0
          var unknown = 0
          let age = d["age"]
          for (let i in age){
            if (age[i]["_id"] === "<10") {
              a_10 = age[i]["count"]
            } else if (age[i]["_id"] === "10-20") {
              a_10_20 = age[i]["count"]
            } else if (age[i]["_id"] === "20-30") {
              a_20_30 = age[i]["count"]
            } else if (age[i]["_id"] === "30-40") {
              a_30_40 = age[i]["count"]
            } else if (age[i]["_id"] === "40-50") {
              a_40_50 = age[i]["count"]
            } else if (age[i]["_id"] === "50-60") {
              a_50_60 = age[i]["count"]
            } else if (age[i]["_id"] === "60+") {
              a_60 = age[i]["count"]
            } else if (age[i]["_id"] === "unknown") {
              unknown = age[i]["count"]
            }
          }
          age_10.push(a_10)
          age_10_20.push(a_10_20)
          age_20_30.push(a_20_30)
          age_30_40.push(a_30_40)
          age_40_50.push(a_40_50)
          age_50_60.push(a_50_60)
          age_60.push(a_60)
          age_unknown.push(unknown)

          var white = 0
          var african_american = 0
          var asian = 0
          var hispanic = 0
          var american_indian = 0
          var other = 0
          var unknown = 0
          let race = d["race"]
          for (let i in race){
            if (race[i]["_id"] === "white") {
              white = race[i]["count"]
            } else if (race[i]["_id"] === "african american") {
              african_american = race[i]["count"]
            } else if (race[i]["_id"] === "asian") {
              asian = race[i]["count"]
            } else if (race[i]["_id"] === "hispanic") {
              hispanic = race[i]["count"]
            } else if (race[i]["_id"] === "american indian") {
              american_indian = race[i]["count"]
            } else if (race[i]["_id"] === "other") {
              other = race[i]["count"]
            } else if (race[i]["_id"] === "unknown") {
              unknown = race[i]["count"]
            }
          }
          race_white.push(white)
          race_african_american.push(african_american)
          race_asian.push(asian)
          race_hispanic.push(hispanic)
          race_american_indian.push(american_indian)
          race_other.push(other)
          race_unknown.push(unknown)
        }
        this.setState({
          gender_male: gender_male,
          gender_female: gender_female,
          gender_nonbinary: gender_nonbinary,
          gender_other: gender_other,
          gender_unknown: gender_unknown,
          age_10: age_10,
          age_10_20: age_10_20,
          age_20_30: age_20_30,
          age_30_40: age_30_40,
          age_40_50: age_40_50,
          age_50_60: age_50_60,
          age_60: age_60,
          age_unknown: age_unknown,
          race_white: race_white,
          race_african_american: race_african_american,
          race_hispanic: race_hispanic,
          race_asian: race_asian,
          race_american_indian: race_american_indian,
          race_other: race_other,
          race_unknown: race_unknown
        });
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
              <Card.Body style={{fontWeight: "800", color: "white"}}className="contains">
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
        <Card style={{ color:'black',  width: '13rem', height: '22rem', "backgroundColor": "rgba(245, 245, 245, .2)", "borderStyle": "solid", "borderWidth": "1px", "borderColor": "#FFF4F9", "borderRadius": "15px"}}>
          <br></br>
          <div style={{"color":"black", "font-size": "25px", "font-weight": "900px", "text-shadow": "3px 3px #D3D3D3", display: "flex", "flexDirection": "row", "justifyContent": "center", "marginBottom":"10px"}}>
            View response by
          </div>
          <div id="responses">
          {categories}
          </div>
        </Card>
        <Link to={{pathname: '/'}}>
        <Card style={{ color:'black', marginTop: "20px", width: '13rem', "backgroundColor": "rgba(245, 245, 245, .2)", "borderStyle": "solid", "borderWidth": "1px", "borderColor": "#FFF4F9", "borderRadius": "15px"}}>
        <Card.Body>Return to Questions</Card.Body>
        </Card>
        </Link>

        </div>

        <Card style={{marginLeft: "25px", "backgroundColor": "rgba(245, 245, 245, .5)","color": "black", "borderStyle": "solid", "borderWidth": "1px", "borderColor": "#FFF4F9", "borderRadius": "15px", "width": "830px"}}>
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
                label: 'female',
                backgroundColor: 'rgba(255, 115, 192, 0.5)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2,
                data: this.state.gender_female
              },
              {
                label: 'male',
                backgroundColor: 'rgba(52, 210, 235, 0.5)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2,
                data: this.state.gender_male
              },
              {
                label: 'non-binary',
                backgroundColor: 'rgba(186, 52, 235, 0.5)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2,
                data: this.state.gender_nonbinary
              },
              {
                label: 'other',
                backgroundColor: 'rgba(58, 235, 52, 0.5)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2,
                data: this.state.gender_other
              },
              {
                label: 'unknown',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2,
                data: this.state.gender_unknown
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
                backgroundColor: 'rgba(245, 138, 66, 0.5)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2,
                data: this.state.age_10
              },
              {
                label: '10-20',
                backgroundColor: 'rgba(117, 219, 86, 0.5)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2,
                data:  this.state.age_10_20
              },              
              {
                label: '20-30',
                backgroundColor: 'rgba(86, 219, 219, 0.5)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2,
                data: this.state.age_20_30
              },
              {
                label: '30-40',
                backgroundColor: 'rgba(167, 88, 224, 0.5)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2,
                data: this.state.age_30_40
              },
              {
                label: '40-50',
                backgroundColor: 'rgba(224, 88, 151, 0.5)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2,
                data:  this.state.age_40_50
              },
              {
                label: '50-60',
                backgroundColor: 'rgba(196, 20, 43, 0.5)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2,
                data: this.state.age_50_60
              },
              {
                label: '60+',
                backgroundColor: 'rgba(236, 205, 250, 0.7)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2,
                data: this.state.age_60
              },
              {
                label: 'unknown',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2,
                data: this.state.age_unknown
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
                data: this.state.race_white
              },
              {
                label: 'African American',
                backgroundColor: 'rgba(117, 219, 86, 0.5)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2,
                data: this.state.race_african_american
              },              
              {
                label: 'Asian',
                backgroundColor: 'rgba(86, 219, 219, 0.5)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2,
                data: this.state.race_asian
              },
              {
                label: 'Hispanic',
                backgroundColor: 'rgba(167, 88, 224, 0.5)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2,
                data:  this.state.race_hispanic
              },
              {
                label: 'American Indian',
                backgroundColor: 'rgba(224, 88, 151, 0.5)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2,
                data: this.state.race_american_indian
              },
              {
                label: 'Other',
                backgroundColor: 'rgba(196, 20, 43, 0.5)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2,
                data:  this.state.race_other
              },
              {
                label: 'Unknown',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 2,
                data: this.state.race_unknown
              }]
              ,
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

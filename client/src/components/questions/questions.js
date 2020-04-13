import React, {Component} from "react";
import { Card } from 'react-bootstrap';
import './questions.css';
import '../../App.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const CaptionElement = () =>
  <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid purple', padding: '0.5em' }}>
    Questions
  </h3>;
/*************************/
/*  Class Implementation */
/*************************/
export class Questions extends Component {
  constructor() {
    super();
	this.state = {
      questions: [{"id":0, "body": "How many hours did you sleep last night?",
  					"date": "4/9/20", "responses":200}, {"id":0, "body": "How many hours did you sleep last night?",
  					"date": "4/9/20", "responses":200},{"id":0, "body": "How many hours did you sleep last night?",
  					"date": "4/9/20", "responses":200}, {"id":0, "body": "How many hours did you sleep last night?",
  					"date": "4/9/20", "responses":200}, {"id":0, "body": "How many hours did you sleep last night?",
  					"date": "4/9/20", "responses":200},{"id":0, "body": "How many hours did you sleep last night?",
  					"date": "4/9/20", "responses":200}, {"id":0, "body": "How many hours did you sleep last night?",
  					"date": "4/9/20", "responses":200}, {"id":0, "body": "How many hours did you sleep last night?",
  					"date": "4/9/20", "responses":200}, {"id":0, "body": "How many hours did you sleep last night?",
  					"date": "4/9/20", "responses":200}, {"id":0, "body": "How many hours did you sleep last night?",
  					"date": "4/9/20", "responses":200}, {"id":0, "body": "How many hours did you sleep last night?",
  					"date": "4/9/20", "responses":200}, {"id":0, "body": "How many hours did you sleep last night?",
  					"date": "4/9/20", "responses":200},  ],
      columns: [
        {
          text: 'Question ID',
          dataField: 'id',
        },
        {
          text: 'Question',
          dataField: 'body',
        },
        {
          text: 'Date',
          dataField: 'date',
        },
        {
          text: 'Responses',
          dataField: 'responses',
        }
      ]
	};
  }

  render() {
  	let questions = []
  	for (let i in this.state.questions) {
  		let question = this.state.questions[i];
  		questions.push(
			<div key={i} className="cards" style={{margin: "12px"}}>
	          <Card style={{ width: '19rem', height: '10rem', "background-color": "rgba(245, 245, 245, .45)", "borderStyle": "solid", "borderWidth": "1px", "borderColor": "#FFF4F9", "border-radius": "15px"}}>
	            <Card.Body style={{color: "black", display: "flex", "flex-direction": "column", "justify-content": "center", "font-weight":"550"}}>
	              <Card.Text>
	               {question.body}
	              </Card.Text>

	            </Card.Body>
	          </Card>
	        </div>
  		)

  	}
    return (
    <div id="contain">
   	<div style={{"font-size": "60px", "font-weight": "900px", "text-shadow": "3px 3px #D3D3D3"}}>
 		Search Questions
     </div>
     <br></br>
    <div id="questions">
    {questions}
     </div></div>
    )
  }
}

/*************************/
/*   Export Statements   */
/*************************/
export default Questions;
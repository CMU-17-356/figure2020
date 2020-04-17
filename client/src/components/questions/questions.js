import React, {Component} from "react";
import { Card } from 'react-bootstrap';
import './questions.css';
import '../../App.css';
import axios from 'axios'
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from "react-router-dom";
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
      questions: null
  }
}

  componentDidMount() {
    axios.get('/questions')
      .then(res => {
        const questions = res.data;
        this.setState({questions: questions});
      });
  }

  render() {
  	let questions = []
  	for (let i in this.state.questions) {
  		let question = this.state.questions[i];
  		questions.push(
		
      <Link style={{"textDecoration": 'none'}} to={{ pathname: '/response',
          state: {redirectId: question._id}
      }}>
      <div key={i} className="cards" style={{margin: "12px"}}>
	          <Card style={{ width: '19rem', height: '10rem', "background-color": "rgba(245, 245, 245, .45)", "borderStyle": "solid", "borderWidth": "1px", "borderColor": "#FFF4F9", "border-radius": "15px"}}>
	            <Card.Body style={{color: "black", display: "flex", "flex-direction": "column", "justify-content": "center", "font-weight":"550"}}>
	              <Card.Text>
	               {question.body}
	              </Card.Text>

	            </Card.Body>
	          </Card>
	        </div>
      </Link>

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
import React from 'react';
import { Card } from 'react-bootstrap';
import '../../App.css';
import { Link } from "react-router-dom";


const QuestionCard = props => {
  const question = props.question

  return (
      <Link style={{"textDecoration": 'none'}} to={{ pathname: '/response',
          state: {redirectId: question._id}
      }}>
      <div className="cards" style={{margin: "12px"}}>
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

export default QuestionCard;
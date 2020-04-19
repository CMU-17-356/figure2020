import React from 'react';
import { Card } from 'react-bootstrap';
import '../../App.css';

const QuestionCard = props => {
  const question = props.question

  return (
    <div className="cards" style={{margin: "12px"}}>
      <Card style={{ width: '19rem', height: '10rem', "backgroundColor": "rgba(245, 245, 245, .45)", "borderStyle": "solid", "borderWidth": "1px", "borderColor": "#FFF4F9", "borderRadius": "15px"}}>
        <Card.Body style={{color: "black", display: "flex", "flexDirection": "column", "justifyContent": "center", "fontWeight":"550"}}>
          <Card.Text>
            {question.id}: {question.body}
          </Card.Text>

        </Card.Body>
      </Card>
    </div>
  )
}

export default QuestionCard;
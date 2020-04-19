import React, {Component} from "react";
import {Button, Card} from 'react-bootstrap'

export class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      response: [""]
    }
  }

  handleAddFields = () => {
    let currResponse = this.state.response;
    currResponse.push("");
    this.setState({response: currResponse});
  };

  handleRemoveFields = index => {
    let currResponse = this.state.response;
    currResponse.splice(index, 1);
    this.setState({response: currResponse});
  };

  handleInputChange = (index, event) => {
    let currResponse = this.state.response;
    currResponse[index] = event.target.value;
    this.setState({response: currResponse});
  };

  handleQuestionChange = (event) => {
    this.setState({question: event.target.value});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let newQuestion = {
      "body": this.state.question,
      "date_asked": new Date().toJSON(),
      "choices": []
    }

    this.state.response.forEach(elem => {
      newQuestion.choices.push({
        "choice": elem,
      });
    })

    fetch('/question', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newQuestion)
    }).then(async (response) => {
      console.log(response.status);
    });
  };

  render() {
    return (
      <div className="container" style={{"marginTop":"60px"}}>
      <div style={{"display": "flex", "flexDirection":"row", "justifyContent":"center"}}>
      <Card style={{"width":"400px","backgroundColor": "rgba(245, 245, 245, .45)", "borderStyle": "solid", "borderWidth": "1px", "borderColor": "#FFF4F9", "borderRadius": "15px"}}>
      <Card.Body><h1>Enter Question</h1></Card.Body>
      </Card></div>
      <br></br>
      <div className="c my-4 text-left">
        <Card style={{"backgroundColor": "rgba(245, 245, 245, .45)", "borderStyle": "solid", "borderWidth": "1px", "borderColor": "#FFF4F9", "borderRadius": "15px"}}>
          <Card.Body >
            <form onSubmit={this.handleSubmit}>
              <label>Question:</label>
              <input
                type="text"
                className="form-control"
                onChange={this.handleQuestionChange}
              />
              {
                this.state.response.map((inputField, index) => (
                  <div className="form-row mt-3">
                    <div className="form-group col">
                      <label>Response:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="response"
                        onChange={event => this.handleInputChange(index, event)}
                      />
                    </div>
                    <div className="form-group col-2 mt-4">
                      <Button
                        variant="outline-success"
                        className="mr-2"
                        size="lg"
                        type="button"
                        onClick={() => this.handleAddFields()}
                      >
                        +
                      </Button>
                      {
                        this.state.response.length > 1 ?
                          <Button
                            variant="outline-danger"
                            size="lg"
                            type="button"
                            onClick={() => this.handleRemoveFields(index)}
                          >
                            -
                          </Button> : <div/>
                      }
                    </div>
                  </div>
                ))
              }
              <div className="submit-button">
                <Button
                  variant="outline-dark"
                  type="submit"
                  onSubmit={this.handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </form>
          </Card.Body>
        </Card>
      </div></div>
    );
  }
}

export default Create;
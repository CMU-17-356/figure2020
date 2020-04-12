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
      questions: [{"id":0, "question": "How many hours did you sleep last night?",
  					"date": "4/9/20", "responses":200}],
      columns: [
        {
          text: 'Question ID',
          dataField: 'id',
        },
        {
          text: 'Question',
          dataField: 'question',
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
    return (
       <div className="container">
        <Card className="text-center">
          <Card.Body>
            <table id='students'>
              <tbody>
              <BootstrapTable
                bootstrap4
                hover
                keyField='id'
                data={this.state.questions}
                caption={<CaptionElement/>}
                columns={this.state.columns}
                bordered={false}
                pagination={paginationFactory()}
                headerClasses={'table-header'}
              />
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

/*************************/
/*   Export Statements   */
/*************************/
export default Questions;
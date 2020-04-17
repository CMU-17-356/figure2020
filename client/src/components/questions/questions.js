import React, {Component} from "react";
import { Card } from 'react-bootstrap';
import './questions.css';
import '../../App.css';
import Pagination from '../pagination/pagination.js';
import QuestionCard from '../question/question.js';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

/*************************/
/*  Class Implementation */
/*************************/

export class Questions extends Component {
  state = { allQuestions: [], currentQuestions: [], currentPage: null, totalPages: null }

  componentDidMount() {
    const { data: allQuestions = [] } = [{"id":0, "body": "How many hours did you sleep last night?",
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
    "date": "4/9/20", "responses":200}, {"id":0, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, {"id":0, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, {"id":0, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, {"id":0, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, {"id":0, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, {"id":0, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, {"id":0, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, {"id":0, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, {"id":0, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, {"id":0, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, {"id":0, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, {"id":0, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, ];
    this.setState({ allQuestions });
  }

  onPageChanged = data => {
    const { allQuestions } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentQuestions = allQuestions.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentQuestions, totalPages });
  }

  render() {

    const { allQuestions, currentQuestions, currentPage, totalPages } = this.state;
    const totalQuestions = allQuestions.length;

    if (totalQuestions === 0) return null;

    const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();

    return (
      <div className="container mb-5">
        <div className="row d-flex flex-row py-5">

          <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center">

              <h2 className={headerClass}>
                <strong className="text-secondary">{totalQuestions}</strong> Countries
              </h2>

              { currentPage && (
                <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Page <span className="font-weight-bold">{ currentPage }</span> / <span className="font-weight-bold">{ totalPages }</span>
                </span>
              ) }

            </div>

            <div className="d-flex flex-row py-4 align-items-center">
              <Pagination totalRecords={totalQuestions} pageLimit={18} pageNeighbours={1} onPageChanged={this.onPageChanged} />
            </div>
          </div>

          { currentQuestions.map(question => <QuestionCard question={question} />) }

        </div>
      </div>
    );

  }

}

/*************************/
/*   Export Statements   */
/*************************/
export default Questions;
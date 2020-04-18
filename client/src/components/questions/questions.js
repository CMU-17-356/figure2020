import React, {Component} from "react";
import './questions.css';
import '../../App.css';
import Pagination from '../pagination/pagination.js';
import QuestionCard from '../question/question.js';

/*************************/
/*  Class Implementation */
/*************************/

export class Questions extends Component {
  state = { allQuestions: [], currentQuestions: [], currentPage: null, totalPages: null }

  componentWillMount() {
    const allQuestions = [{"id":0, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, {"id":1, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, {"id":2, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, {"id":3, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, {"id":4, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, {"id":5, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, {"id":6, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, {"id":7, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, {"id":8, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, {"id":9, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, {"id":10, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, {"id":11, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, {"id":12, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, {"id":13, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, {"id":14, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, {"id":15, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, {"id":16, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, {"id":17, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, {"id":18, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, {"id":19, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, {"id":20, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, {"id":21, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, {"id":22, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, {"id":23, "body": "How many hours did you sleep last night?",
    "date": "4/9/20", "responses":200}, ];
    console.log("component will mount");
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
    console.log(allQuestions)
    console.log(totalQuestions)

    if (totalQuestions === 0) return null;

    const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();

    return (
      <div className="container mb-5">
        <div className="row d-flex flex-row py-5">

          <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center">

              <h2 className={headerClass}>
                <strong className="text-secondary">{totalQuestions}</strong> Total Questions
              </h2>

              { currentPage && (
                <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Page <span className="font-weight-bold">{ currentPage }</span> / <span className="font-weight-bold">{ totalPages }</span>
                </span>
              ) }

            </div>

            <div className="d-flex flex-row py-4 align-items-center">
              <Pagination totalRecords={totalQuestions} pageLimit={12} pageNeighbours={1} onPageChanged={this.onPageChanged} />
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
import React, {Component} from "react";
import './questions.css';
import '../../App.css';
import axios from 'axios'
import { Link } from "react-router-dom";
import Pagination from '../pagination/pagination.js';
import QuestionCard from '../question/question.js';

/*************************/
/*  Class Implementation */
/*************************/

export class Questions extends Component {
  constructor() {
    super();
    this.state = {
      allQuestions: [],
      currentQuestions: [],
      currentPage: null,
      totalPages: null
    }
  }

  componentDidMount() {
    axios.get('/questions')
      .then(res => {
        const questions = res.data;
        this.setState({allQuestions: questions});
      });
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
    console.log(currentQuestions)

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
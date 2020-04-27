import React, {Component} from "react";
import './questions.css';
import '../../App.css';
import axios from 'axios'
import Pagination from '../pagination/pagination.js';
import QuestionCard from '../question/question.js';

export class Questions extends Component {
  constructor(props) {
    super(props);
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

    if (totalQuestions === 0) return null;

    const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? '' : ''].join(' ').trim();
    return (
      <div id="contain">
          <div className="w-100 flex-row flex-wrap align-items-center">
            <div className="flex-row align-items-center">
              <h2 className={headerClass}>
                <strong>{totalQuestions}</strong> Total Questions
              </h2>
              {
                currentPage && (
                  <span className="">
                  Page <span className="font-weight-bold">{ currentPage }</span> / <span className="font-weight-bold">{ totalPages }</span>
                </span>
                )
              }
            </div>
          </div>
        <br></br>
        <div id="questions">
          { currentQuestions.map(question => <QuestionCard question={question} />) }
        </div>
        <br></br>
        <div>
          <Pagination totalRecords={totalQuestions} pageLimit={9} pageNeighbours={1} onPageChanged={this.onPageChanged} />
        </div>
      </div>
    );
  }
}

export default Questions;

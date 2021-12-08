import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import './Questions.css';
import { actionPlayerScore, actionForScores } from '../actions';

const TEN_POINTS = 10;
const THREE = 3;
const TWO = 2;
const ONE = 1;
const ZERO = 0;
const ID_CORRECT = 'correct-answer';
let ARRAY;

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      correct: null,
      incorrect: null,
      seconds: 30,
      disable: false,
      numberQuestion: 0,
      visibilit: 'hide',
      redirect: false,
      scori: 0,
    };
    this.handleClickClassName = this.handleClickClassName.bind(this);
    this.handleClickClassNameHelper = this.handleClickClassNameHelper.bind(this);
    // this.rulesOfUpdate = this.rulesOfUpdate.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.questions = this.questions.bind(this);
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.intervalId = setInterval(() => {
      this.setState((estadoAnterior) => ({
        seconds: estadoAnterior.seconds - 1,
      }));
    }, ONE_SECOND);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.seconds === 0) {
      // this.rulesOfUpdate();
      this.nextQuestion();
    }
  }

  // rulesOfUpdate() {
  //   this.setState({
  //     seconds: 0,
  //     incorrect: 'incorrect',
  //     correct: 'correct',
  //     disable: true,
  //   });
  // }

  checkDifficulty(e) {
    switch (e) {
    case 'hard':
      return THREE;
    case 'medium':
      return TWO;
    case 'easy':
      return ONE;
    default:
      return ZERO;
    }
  }

  handleClickClassName({ target }) {
    this.handleClickClassNameHelper(target.name);
    const { resp, player, playerStatus: { score, assertions } } = this.props;
    const { seconds } = this.state;
    if (target.id === ID_CORRECT) {
      const { difficulty } = resp[0];
      const pointsFromDifficulty = this.checkDifficulty(difficulty);
      const timerPoints = seconds;
      const correctAnswerPoints = TEN_POINTS + timerPoints * pointsFromDifficulty;
      const sum = correctAnswerPoints + score;
      const playerScore = {
        player: {
          name: '',
          assertions: 1 + assertions,
          score: sum,
          gravatarEmail: '',
        },
      };
      localStorage.setItem('state', JSON.stringify(playerScore));
      player(1, sum);
      this.setState((estadoAnterior) => ({ scori: estadoAnterior.scori + sum }));
    }
  }

  questions() {
    const { correct, incorrect, disable, seconds,
      numberQuestion } = this.state;
    const { resp } = this.props;
    const TRIRTY = 30;
    if (seconds === TRIRTY) {
      ARRAY = [...resp[numberQuestion].incorrect_answers,
        resp[numberQuestion].correct_answer];
      this.shuffle(ARRAY);
      this.shuffle(ARRAY);
    }
    const tut = ARRAY.map((element, index) => (
      <div key={ index }>
        <button
          name="incorrect"
          className={ element === resp[numberQuestion].correct_answer
            ? correct : incorrect }
          onClick={ this.handleClickClassName }
          type="button"
          key={ index }
          data-testid={ element === resp[numberQuestion].correct_answer
            ? ID_CORRECT : `wrong-answer-${index}` }
          id={ element === resp[numberQuestion].correct_answer
            ? ID_CORRECT : `wrong-answer-${index}` }
          disabled={ disable }
        >
          {element}
        </button>
      </div>
    ));
    return tut;
  }

  // source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  handleClickClassNameHelper(a) {
    this.setState({ incorrect: 'incorrect', correct: 'correct' });
    const n = a;
    if (n === 'correct' || n === 'incorrect') {
      this.setState({
        visibilit: 'show',
        disable: true,
      });
    }
  }

  nextQuestion() {
    const { numberQuestion, scori } = this.state;
    const { user, arrayOfScoreAndName, playerStatus: { assertions } } = this.props;
    const question = 4;
    if (numberQuestion === question) {
      const playerScore = {
        player: {
          name: user,
          assertions: 1 + assertions,
          score: scori,
          gravatarEmail: '',
        },
      };
      this.setState({ redirect: true });
      arrayOfScoreAndName(playerScore);
    }
    this.setState((estadoAnterior) => ({
      numberQuestion: estadoAnterior.numberQuestion + 1,
      seconds: 30,
      correct: null,
      incorrect: null,
      visibilit: 'hide',
      disable: false,
    }));
  }

  render() {
    const { redirect, seconds,
      numberQuestion, visibilit } = this.state;
    const { resp } = this.props;
    if (redirect === true) { return <Redirect to="/feedback" />; }
    return (
      <div className="game-page-questions">
        <seconds>{seconds}</seconds>
        <p data-testid="question-category">{resp[numberQuestion].category}</p>
        <p data-testid="question-text">{resp[numberQuestion].question}</p>
        <div className="game-page-buttons">
          { this.questions() }
        </div>
        <div className="game-page-next">
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.nextQuestion }
            className={ seconds === 0 ? 'show' : visibilit }
          >
            Próxima
          </button>
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  arrayOfScoreAndName: PropTypes.func.isRequired,
  player: PropTypes.func.isRequired,
  playerStatus: PropTypes.objectOf(PropTypes.number).isRequired,
  resp: PropTypes.objectOf(PropTypes.string).isRequired,
  user: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  playerStatus: state.player,
  user: state.login.user,
});

const mapDispatchToProps = (dispatch) => ({
  player: (assertions, score) => dispatch(actionPlayerScore(assertions, score)),
  arrayOfScoreAndName: (score) => dispatch(actionForScores(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

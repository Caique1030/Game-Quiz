import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Questions from '../components/Questions';
import { fetchApi } from '../actions';

class Game extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { fetch } = this.props;
    const token = JSON.parse(localStorage.getItem('token'));
    fetch(token);
  }

  render() {
    const { response, name, email, totalPoints } = this.props;
    const hashEmail = md5(email).toString();
    return (
      <div className="game-page  is-primary is-fullheight">
        <header className="game-header has-background-info-light">
          <img
            src={ `https://www.gravatar.com/avatar/${hashEmail}` }
            alt="Gravatar"
            data-testid="header-profile-picture"
          />
          <h2
            className="title is-3 is-centered"
            data-testid="header-player-name"
          >
            { name }
            {' '}
          </h2>
          <h2
            className="subtitle is-5"
            data-testid="header-score"
          >
            {`Pontos:${totalPoints}`}
          </h2>
        </header>
        {response ? <Questions resp={ response } /> : <h3>Loading...</h3>}
        <label htmlFor="gravatar-email" data-testid="input-gravatar-email">
          Gravar email:
          <input
            type="text"
            id="gravatar-email"
            // onChange={this.}
          />
        </label>
      </div>
    );
  }
}

Game.propTypes = {
  email: PropTypes.string.isRequired,
  fetch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  response: PropTypes.string.isRequired,
  totalPoints: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  totalPoints: state.player.score,
  name: state.login.user,
  email: state.login.email,
  response: state.trivia.response.results,
});
const mapDispatchToProps = (dispatch) => ({
  fetch: (token) => dispatch(fetchApi(token)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Game);

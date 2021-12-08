import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Ranking extends Component {
  render() {
    const { arrayOfScore } = this.props;
    const arrCert = arrayOfScore.sort((a, b) => b.player.score - a.player.score);
    return (
      <div className="game-page">

        <div className="content">
          <h1 className="is-size-2" data-testid="ranking-title">Ranking</h1>
          <ul>
            {arrCert.map((element, index) => (
              <ul type="1">
                <li className="subtitle is-3" data-testid={ `player-name-${index}` }>{element.player.name}</li>
                <li className="subtitle is-3" data-testid={ `player-score-${index}` }>
                  {' '}
                  {element.player.score}
                  {' '}
                </li>
              </ul>
            ))}
          </ul>
          <Link to="/" data-testid="btn-go-home">
            <button className="button is-success" type="button">Home</button>
          </Link>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  arrayOfScore: PropTypes.shape({
    sort: PropTypes.func,
  }).isRequired,
};
const mapStateToProps = (state) => ({
  email: state.login.email,
  user: state.login.user,
  arrayOfUserss: state.login.arrayOfUser,
  arrayOfScore: state.login.arrayOfScore,
});

export default connect(mapStateToProps)(Ranking);

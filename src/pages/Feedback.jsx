import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';

class Feedback extends React.Component {
  assertionsVerify(assert) {
    const minAssert = 3;
    if (assert < minAssert) {
      return <h3><strong>Podia ser melhor...!</strong></h3>;
    }
    return <h3><strong>Mandou bem !</strong></h3>;
  }

  render() {
    const localstorage = JSON.parse(localStorage.getItem('state'));
    const { player: { score, assertions } } = localstorage;
    const { name, email } = this.props;
    const hashEmail = md5(email).toString();
    return (
      <div className="game-page">

        <div className="content">
          <header>
            <img
              src={ `https://www.gravatar.com/avatar/${hashEmail}` }
              alt="Gravatar"
              data-testid="header-profile-picture"
            />
            <h2 data-testid="header-player-name">{name}</h2>
            <h2 data-testid="header-score">{`Pontos: ${score}`}</h2>
            <p data-testid="feedback-text">{this.assertionsVerify(assertions)}</p>
          </header>
          <section>
            <p className="subtitle is-3 my-2" data-testid="feedback-total-question">
              {`Acertos: ${assertions}`}
            </p>
          </section>
          <Link className="button is-link" to="/" data-testid="btn-play-again">
            Jogar novamente
          </Link>
          <Link to="/ranking" data-testid="btn-ranking">
            <button className="button is-success" type="button">Ver Ranking</button>
          </Link>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.login.user,
  email: state.login.email,
});

export default connect(mapStateToProps, null)(Feedback);

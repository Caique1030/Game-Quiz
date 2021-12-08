import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { MdEmail } from 'react-icons/md';
import actionLogin, { actionPlayerScore } from '../actions';
import img from '../img/pngaaa.com-56983.png';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      user: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateEmailAndUser = this.validateEmailAndUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { player } = this.props;
    this.token();
    const playerScore = {
      player: {
        assertions: 0,
        score: 0,
        // gravatarEmail: '',
      },
    };
    // localStorage.setItem('state', JSON.stringify(playerScore));
    player(0, playerScore.player.score);
  }

  validateEmailAndUser() {
    const { email, user } = this.state;
    const emailPattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i;
    const player = {
      user,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    };
    localStorage.setItem('state', JSON.stringify({ player }));
    if (emailPattern.test(email) && user.length > 0) {
      return false;
    }
    return true;
  }

  async token() {
    const response = await fetch(
      'https://opentdb.com/api_token.php?command=request',
    );
    const tokien = await response.json();
    const tokienData = tokien.token;
    localStorage.setItem('token', JSON.stringify(tokienData));
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(userr, emaill) {
    const { userEmailAction } = this.props;
    userEmailAction(userr, emaill);
  }

  render() {
    const { user, email } = this.state;
    return (
      <div className="hero is-fullheight">
        <div style={ { textAlign: 'center' } }>
          <img width="350px" src={ img } />
        </div>
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-4">
                <form action="" className="box">
                  <div className="field">
                    <label htmlFor="email" className="label">
                      Email:
                    </label>
                    <div className="control has-icons-left">
                      <input
                        type="text"
                        placeholder="john@example.com"
                        name="email"
                        className="input"
                        onChange={ this.handleChange }
                      />
                      <span className="icon is-small is-left">
                        <i>
                          <MdEmail />
                        </i>
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="user" className="label">
                      Usuário:
                    </label>
                    <div className="control has-icons-left">
                      <input
                        type="text"
                        placeholder="..."
                        name="user"
                        className="input"
                        onChange={ this.handleChange }
                      />
                      <span className="icon is-small is-left">
                        <i>
                          <FiUser />
                        </i>
                      </span>
                    </div>
                  </div>
                  <Link to="/play">
                    <button
                      disabled={ this.validateEmailAndUser() }
                      type="button"
                      data-testid="btn-play"
                      className="button is-primary is-normal"
                      onClick={ () => this.handleSubmit(user, email) }
                    >
                      Jogar
                    </button>
                  </Link>
                  <Link to="/settings">
                    <button
                      style={ { textAlign: 'right' } }
                      type="button"
                      className="button is-info is-small"
                      data-testid="btn-settings"
                    >
                      Configurações
                    </button>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  player: PropTypes.func.isRequired,
  userEmailAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userEmailAction: (user, email) => dispatch(actionLogin(user, email)),
  player: (assertions, score) => dispatch(actionPlayerScore(assertions, score)),
});

export default connect(null, mapDispatchToProps)(Login);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { emailAction } from '../redux/actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = ({
      btnValidation: true,
      email: '',
      password: '',
    });
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { password, email } = this.state;
      const passwordHigherThen = 5;
      const regexEmail = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
      const isEmail = regexEmail.test(email);
      const isValidPassword = password.length > passwordHigherThen;
      if (isEmail && isValidPassword) {
        this.setState({
          btnValidation: false,
        });
      } else {
        this.setState({
          btnValidation: true,
        });
      }
    });
  };

  render() {
    const { btnValidation, email, password } = this.state;
    const { history, dispatch } = this.props;
    return (
      <form>
        <label htmlFor="email">
          User:
          <input
            data-testid="email-input"
            type="email"
            id="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            placeholder="User Name Here"
          />
        </label>
        <label htmlFor="password">
          Passowrd:
          <input
            data-testid="password-input"
            type="password"
            id="password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
            placeholder="Password with 6 digits or more"
          />
        </label>
        <button
          type="button"
          disabled={ btnValidation }
          onClick={ () => {
            dispatch(emailAction(email));
            history.push('/carteira');
          } }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);

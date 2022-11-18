import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmail } from '../redux/actions';
import '../css/login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      senha: '',
    };
  }

  handlerChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    console.log(email);
    dispatch(addEmail(email));
    history.push('/carteira');
  };

  render() {
    const { email, senha } = this.state;

    // Validação de E-mail e senha
    const emailValido = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);
    const minPassword = 6;
    let isDisabled = true;
    if (emailValido && senha.length >= minPassword) {
      isDisabled = false;
    }

    return (
      <div className="divLogin">
        <div className="divLogin2">
          <img src="https://i.pinimg.com/originals/18/7b/0f/187b0f7cce3e5f8db5f62f16927d2324.png" alt="" />
          <input
            placeholder="E-mail"
            data-testid="email-input"
            onChange={ this.handlerChange }
            value={ email }
            type="email"
            name="email"
            id=""
          />
          <input
            placeholder="Senha"
            data-testid="password-input"
            onChange={ this.handlerChange }
            value={ senha }
            type="password"
            name="senha"
            id=""
          />
          <button
            onClick={
              this.handleClick
            }
            disabled={ isDisabled }
            type="button"
          >
            Entrar

          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);

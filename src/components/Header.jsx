import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import '../css/header.css';
import icon from '../css/iconSacoDinheiro.png';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    let total = 0;
    const tamanho = expenses.length;
    const arrayValores = [];
    if (tamanho > 0) {
      expenses.forEach((elemento) => {
        const retornoRates = Object.values(elemento.exchangeRates);
        const retornoRate = retornoRates.find((rate) => rate.code === elemento.currency);
        arrayValores.push({
          currency: elemento.currency, valueTotal: elemento.value * retornoRate.ask });
      });
      console.log(arrayValores);
      arrayValores.forEach((valores) => {
        total += valores.valueTotal;
      });
    }
    return (
      <div className="divHeader">
        <img src={ icon } alt="imagem" />
        <h1>Trybe Wallet</h1>
        <div className="divHeader2">
          <p data-testid="email-field">{`Email: ${email}` }</p>
          <p data-testid="total-field">
            <span data-testid="header-currency-field">BRL R$</span>
            { expenses.length > 0 ? total.toFixed(2)
              : total.toFixed(2) }
          </p>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropType.string.isRequired,
  expenses: PropType.arrayOf.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

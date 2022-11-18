import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import { fetchCurrencies, addExpenses, deletaExpense } from '../redux/actions';
import Table from './Table';
import '../css/wallet.css';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      description: '',
      tag: 'Alimentação',
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { fetchCurrencies: fetch } = this.props;
    fetch();
  }

  fetchExchangeRates = async () => {
    const returnFetch = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await returnFetch.json();
    return data;
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = async (state) => {
    const { addExpenses: add } = this.props;
    const retornoApi = await this.fetchExchangeRates();
    add({ ...state, exchangeRates: retornoApi });
    this.setState({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      description: '',
      tag: 'Alimentação',
    });
  };

  edita = () => {
    const { expenses, edit, deletaExpense: edita } = this.props;
    const itemArray = expenses.find((elemento) => elemento.id === edit.id);
    const { value, currency, method, description, tag } = this.state;
    itemArray.value = value;
    itemArray.currency = currency;
    itemArray.method = method;
    itemArray.description = description;
    itemArray.tag = tag;
    const novoArray = expenses.filter((elemento) => elemento.id !== edit.id);
    novoArray.push(itemArray);
    const num1 = -1;
    novoArray.sort((a, b) => {
      if (a.id < b.id) {
        return num1;
      }
      return true;
    });
    edita(novoArray);
    edit.edit = false;
  };

  render() {
    const { currencies, edit } = this.props;
    const { value, currency, method, description, tag } = this.state;
    return (
      <div>
        <div className="divForm">
          <label htmlFor="value">
            Valor em Real:
            <input
              data-testid="value-input"
              value={ value }
              onChange={ this.handleChange }
              type="number"
              name="value"
              id="value"
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              value={ currency }
              onChange={ this.handleChange }
              data-testid="currency-input"
              name="currency"
              id="currency"
            >
              {
                currencies
                  .map((item) => <option key={ item } value={ item }>{item}</option>)
              }
            </select>
          </label>
          <label htmlFor="method">
            Forma de Pagamento:
            <select
              value={ method }
              onChange={ this.handleChange }
              data-testid="method-input"
              name="method"
              id="method"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              value={ description }
              onChange={ this.handleChange }
              data-testid="description-input"
              type="text"
              name="description"
              id="description"
            />
          </label>
          <label htmlFor="tag">
            Tipo:
            <select
              value={ tag }
              onChange={ this.handleChange }
              data-testid="tag-input"
              name="tag"
              id="tag"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          { edit.edit ? (
            <button
              onClick={ () => this.edita() }
              type="submit"
            >
              Editar despesa

            </button>)
            : (
              <button
                onClick={ () => this.handleClick(this.state) }
                type="submit"
              >
                Adicionar despesa

              </button>)}
        </div>
        <Table />
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropType.arrayOf.isRequired,
  edit: PropType.isRequired,
  fetchCurrencies: PropType.func.isRequired,
  addExpenses: PropType.func.isRequired,
  expenses: PropType.isRequired,
  deletaExpense: PropType.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrencies()),
  addExpenses: (e) => dispatch(addExpenses(e)),
  deletaExpense: (e) => dispatch(deletaExpense(e)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  edit: state.wallet.edit,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

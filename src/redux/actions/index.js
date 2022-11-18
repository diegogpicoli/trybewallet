// Coloque aqui suas actions
const ADD_EMAIL = 'ADD_EMAIL';
const ADD_CURRENCIES = 'ADD_CURRENCIES';
const ADD_EXPENSES = 'ADD_EXPENSES';
const DELETA_EXPENSE = 'DELETA_EXPENSE';
const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});

export const addCurrencies = (currencies) => ({
  type: ADD_CURRENCIES,
  payload: currencies,
});

export const addExpenses = (state) => ({
  type: ADD_EXPENSES,
  payload: state,
});

export const deletaExpense = (state) => ({
  type: DELETA_EXPENSE,
  payload: state,
});

export const editExpense = (object) => ({
  type: EDIT_EXPENSE,
  payload: object,
});

export const fetchCurrencies = () => (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((response) => response.json())
  .then((json) => dispatch(addCurrencies(json)));

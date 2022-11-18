// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  edit: { id: null, status: false },
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_CURRENCIES':
    return {
      ...state,
      currencies: Object.keys(action.payload).filter((item) => item !== 'USDT'),
    };
  case 'ADD_EXPENSES':
    return {
      ...state,
      expenses: [...state.expenses, { id: state.expenses.length,
        ...action.payload }],
    };
  case 'DELETA_EXPENSE':
    return {
      ...state,
      expenses: action.payload,
    };
  case 'EDIT_EXPENSE':
    return {
      ...state,
      edit: { ...action.payload },
    };
  default:
    return state;
  }
};

export default wallet;

import { CURRENCY_ACTION, SAVE_EXPENSES } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const expensesSummer = (payload) => {
  const expensesSum = payload.expenses.reduce(((acc, cur) => {
    const sum = cur.value * cur.exchangeRates[cur.currency].ask;
    acc += sum;
    return acc;
  }), 0);
  return expensesSum.toFixed(2);
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCY_ACTION:
    return { ...state, currencies: action.payload };
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, {
        id: !state.expenses.length ? 0 : state.expenses.length,
        ...action.payload,
      }],
      total: expensesSummer({ expenses: [...state.expenses, action.payload] }),
    };
  default:
    return state;
  }
};

export default wallet;

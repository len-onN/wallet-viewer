import { BILL_DELETER, CURRENCY_ACTION, SAVE_EXPENSES } from '../actions/index';
import expensesSummer from '../../staff/expensesSummer';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  total: 0,
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
      total: parseFloat(
        expensesSummer({ expenses: [...state.expenses, action.payload] }),
      ),
    };
  case BILL_DELETER:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.payload),
      total: expensesSummer({ expenses: state
        .expenses.filter(({ id }) => id !== action.payload) }),
    };
  default:
    return state;
  }
};

export default wallet;

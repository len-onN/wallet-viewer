export const EMAIL_ACTION = 'EMAIL_ACTION';

export const emailAction = (payload) => ({
  type: EMAIL_ACTION,
  payload,
});

export const CURRENCY_ACTION = 'CURRENCY_ACTION';

export const currenciesAction = (payload) => ({
  type: CURRENCY_ACTION,
  payload,
});

export const SAVE_EXPENSES = 'SAVE_EXPENSES';

export const saveExpenses = (payload) => ({
  type: SAVE_EXPENSES,
  payload,
});

export const BILL_DELETER = 'BILL_DELETER';

export const billDeleter = (payload) => ({
  type: BILL_DELETER,
  payload,
});

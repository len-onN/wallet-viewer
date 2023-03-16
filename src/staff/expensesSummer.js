const expensesSummer = (payload) => {
  const expensesSum = payload.expenses.reduce(((acc, cur) => {
    const sum = cur.value * cur.exchangeRates[cur.currency].ask;
    acc += sum;
    return acc;
  }), 0);
  return expensesSum.toFixed(2);
};

export default expensesSummer;

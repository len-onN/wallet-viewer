import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Routes from '../components/Routes';
import { renderWithRouterAndRedux } from './helpers/renderWith';

test('Testes para página de Login', () => {
  const loginPath = ['/'];
  const { store } = renderWithRouterAndRedux(<Routes />, { loginPath });

  const emailInput = screen.getByLabelText(/user:/i);
  const passwordInput = screen.getByLabelText('Passowrd:');
  const loginBtn = screen.getByRole('button', { name: /entrar/i });

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginBtn).toBeDisabled();
  expect(loginBtn).toBeInTheDocument();

  userEvent.type(emailInput, ('somebody@some.com'));
  userEvent.type(passwordInput, ('012345'));

  expect(loginBtn).not.toBeDisabled();

  userEvent.click(loginBtn);
  expect(store.getState().user).toStrictEqual({ email: 'somebody@some.com' });
  expect(store.getState().wallet).toHaveProperty('currencies');
  screen.logTestingPlaygroundURL();
});

test('Testes para Wallet', async () => {
  const initialEntries = ['/carteira'];
  renderWithRouterAndRedux(<Routes />, { initialEntries });

  const addExpensesBtn = screen.getByRole('button', { name: /adicionar despesa/i });
  expect(addExpensesBtn).toBeInTheDocument();

  const description = screen.getByRole('textbox', { name: /descrição/i });
  userEvent.type(description, 'Testando');
  await userEvent.click(addExpensesBtn);
  const deleteBtn = await screen.findAllByRole('button', { name: /excluir/i });
  expect(deleteBtn[0]).toBeInTheDocument();
  expect(deleteBtn).toHaveLength(1);

  await userEvent.click(deleteBtn[0]);
  expect(deleteBtn[0]).not.toBeInTheDocument();
  screen.logTestingPlaygroundURL();
});

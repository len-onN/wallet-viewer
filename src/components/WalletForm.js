import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { currenciesAction } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    this.fetchCurrenciesAPI();
  }

  fetchCurrenciesAPI = async () => {
    const { dispatch } = this.props;
    const currenciesJson = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currenciesUSDT = await currenciesJson.json();
    const currencies = Object.keys(currenciesUSDT).filter((cur) => cur !== 'USDT');
    dispatch(currenciesAction(currencies));
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { currency, value, description,
      tag, method } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <label htmlFor="expenses">
          Valor:
          <input
            data-testid="value-input"
            id="expenses"
            type="number"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            id="description"
            type="text"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            id="currency"
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((cur) => (
              <option
                key={ cur }
                value={ cur }
              >
                {cur}

              </option>
            ))}
          </select>
        </label>
        <label htmlFor="payment">
          {' '}
          Método de pagamento:
          <select
            id="payment"
            name="method"
            value={ method }
            data-testid="method-input"
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="category">
          {' '}
          Categoria:
          <select
            id="category"
            data-testid="tag-input"
            value={ tag }
            name="tag"
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>

      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (state) => ({
  ...state.wallet,
});

export default connect(mapStateToProps)(WalletForm);

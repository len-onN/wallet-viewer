import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  shouldComponentUpdate(prevState) {
    const { total } = this.props;
    return (prevState.total !== total);
  }

  render() {
    const { email, total } = this.props;
    return (
      <div>
        <h3 data-testid="email-field">{ email }</h3>
        <h3 data-testid="total-field">{ total }</h3>
        <h4 data-testid="header-currency-field">BRL</h4>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

export default connect(mapStateToProps)(Header);

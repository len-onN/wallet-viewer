import { EMAIL_ACTION } from '../actions';

const INITIAL_USER = {
  email: '',
};

const user = (state = INITIAL_USER, action) => {
  switch (action.type) {
  case EMAIL_ACTION:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default user;

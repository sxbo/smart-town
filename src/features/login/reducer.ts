import {LoginAction, LOGIN} from './action';

export interface LoginState {
    isLogin: boolean
}

const initState: LoginState = {
  isLogin: false,
};

const reducer = (state = initState, action: LoginAction) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      isLogin: action.data,
    };
  default:
    return state;
  }
};

export default reducer;

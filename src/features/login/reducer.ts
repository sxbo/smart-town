import {LoginAction, LOGIN} from './action';

export interface LoginState {
    isLogin: boolean
    loginUser: Object
}

const initState: LoginState = {
  isLogin: false,
  loginUser: {},
};

const reducer = (state = initState, action: LoginAction) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      isLogin: action.data,
      loginUser: action.user,
    };
  default:
    return state;
  }
};

export default reducer;

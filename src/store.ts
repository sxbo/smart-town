import {combineReducers, createStore, Store} from 'redux';
import {dashboardReducer} from './features/dashboard';
import {DashBoardState} from './features/dashboard/reducer';
import { LoginState } from './features/login/reducer';
import { loginReducer } from './features/login';

export interface RootState{
  dashboard: DashBoardState;
  login: LoginState;
}

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  login: loginReducer,
});

const store: Store = createStore(rootReducer);

export default store;

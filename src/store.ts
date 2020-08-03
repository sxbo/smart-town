import {combineReducers, createStore, Store} from 'redux';
import {dashboardReducer} from './features/dashboard';
import {DashBoardState} from './features/dashboard/reducer';

export interface RootState{
  dashboard: DashBoardState;
}

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
});

const store: Store = createStore(rootReducer);

export default store;

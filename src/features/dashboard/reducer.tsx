import {CollapsedMenuAction, COLLAPSED_MENU} from './action';

export interface DashBoardState {
  menuCollapsed: boolean
}

const initState: DashBoardState = {
  menuCollapsed: false,
};

const reducer = (state = initState, action: CollapsedMenuAction) => {
  switch (action.type) {
  case COLLAPSED_MENU:
    return {
      ...state,
      menuCollapsed: !state.menuCollapsed,
    };
  default:
    return state;
  }
};

export default reducer;


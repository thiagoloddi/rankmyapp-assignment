import { SET_ALARMS, SET_SELECTED_ALARM } from "../../actions/alarms.actions";

const INITIAL_STATE = {
  all: [],
  selected: null
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {

    case SET_ALARMS: return { ...state, all: action.payload };

    case SET_SELECTED_ALARM: return { ...state, selected: action.payload };

    default: return state;
  }
}
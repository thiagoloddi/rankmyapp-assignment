export const SET_ALARMS = 'SET_ALARMS';
export const SET_SELECTED_ALARM = 'SET_SELECTED_ALARM';

export const setAlarms = alarms => {
  return {
    type: SET_ALARMS,
    payload: alarms
  }
};

export const setSelectedAlarm = alarm => {
  return {
    type: SET_SELECTED_ALARM,
    payload: alarm
  }
};
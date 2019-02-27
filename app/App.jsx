import React from 'react';
import injectSheet from 'react-jss';
import axios from 'axios';
import { compose } from 'redux';
import { connect } from 'react-redux';

import globals from './styles/globals.style';
import Header from './ui/components/Header';
import AlarmsList from './ui/components/AlarmsList';
import { setAlarms } from './actions/alarms.actions';

class App extends React.Component {

  componentDidMount = async () => {
    try {
      const response = await axios.get('/alarms');
      this.props.setAlarms(response.data);
    } catch(e) {
      console.log(e);
    }
  }

  render = () => {
    return (
      <div>
        <Header />
        <AlarmsList />
      </div>
    );
  }
}

export default compose(
  injectSheet(globals),
  connect(null, { setAlarms })
)(App);
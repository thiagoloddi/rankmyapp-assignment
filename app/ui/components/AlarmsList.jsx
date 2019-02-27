import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectSheet from 'react-jss';
import find from 'lodash.find';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import ModalWrapper from './ModalWrapper';
import NewAlarmModal from './NewAlarmModal';
import { setSelectedAlarm, setAlarms } from '../../actions/alarms.actions';
import axios from 'axios';

const alarmsListStyle = {
  icon: {
    cursor: 'pointer',
    padding: '10px'
  }
}

class AlarmsList extends Component {

  onEditClick = e => {
    const { id } = e.target;
    const selected = find(this.props.alarms, { _id: id });
    this.props.setSelectedAlarm(selected);
    this.refs.modal.open();
  }

  onDeleteClick = async e => {
    const { id } = e.target;
    try {
      await axios.delete(`/alarms/${id}`);
      const alarms = this.props.alarms.filter(a => a._id != id);
      this.props.setAlarms(alarms);
    } catch(e) {
      console.log(e);
    }

  }

  closeModal = () => {
    this.refs.modal.close();
  }

  renderBody = () => {
    const { classes } = this.props;
    return this.props.alarms.map(({ _id, name, email, period, search_term }) => (
      <TableRow key={_id}>
        <TableCell>{name}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell align="center">{period}</TableCell>
        <TableCell>{search_term}</TableCell>
        <TableCell><img id={_id} onClick={this.onEditClick} className={classes.icon} src="/assets/edit_icon.png" /></TableCell>
        <TableCell><img id={_id} onClick={this.onDeleteClick} className={classes.icon} src="/assets/delete_icon.png" /></TableCell>
      </TableRow>
    ))
  }

  render = () => {
    return (
      <div>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell >Email</TableCell>
                <TableCell align="center">Período</TableCell>
                <TableCell >Termo de Busca</TableCell>
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {this.renderBody()}
            </TableBody>
          </Table>
        </Paper>
        <ModalWrapper ref="modal" render={() => <NewAlarmModal edit onClose={this.closeModal} />}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    alarms: state.alarms.all
  };
}

export default compose(
  injectSheet(alarmsListStyle),
  connect(mapStateToProps, { setSelectedAlarm, setAlarms })
)(AlarmsList);
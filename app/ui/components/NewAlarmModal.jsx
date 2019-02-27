import React from 'react'
import injectSheet from 'react-jss';
import axios from 'axios';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { setAlarms } from '../../actions/alarms.actions';
import newAlarmModalStyle from '../../styles/components/newAlarmModal.style';

class NewAlarmModal extends React.Component {
  
  componentWillReceiveProps = nextProps => {
    if(nextProps.selected) {
      const { name, email, search_term, period } = nextProps.selected;
      this.setState({ values: { name, email, search_term, period }});
    }
  }

  state = {
    values: {
      name: '',
      email: '',
      search_term: '',
      period: 2
    },
    errors: {
      name: false,
      email: false,
      search_term: false,
      period: false
    }
  }

  textFields = [
    { id: 'name', label: 'Nome' },
    { id: 'email', label: 'Email' },
    { id: 'search_term', label: 'Termo de Busca' }
  ]

  onChange = e => {
    const { id, value } = e.target;
    this.setState({ values: { ...this.state.values, [id]: value }});
  }

  onSubmit = async e => {
    e.preventDefault();

    console.log('submit');
    const { values } = this.state;
    const errors = { ...this.state.errors };
    let isValid = true;

    for(let key in values) {
      if(!values[key]) {
        errors[key] = true;
        isValid = false;
      }
    }

    if(!isValid) {
      return this.setState({ errors });
    }

    try {
      let alarms = [ ...this.props.alarms ];

      console.log(this.props.edit);
      
      if(this.props.edit) {
        const response = await axios.put(`/alarms/${this.props.selected._id}`, this.state.values);
        alarms = alarms.map(a => a._id == response.data._id ? response.data : a);
      } 
      else {
        const response = await axios.post('/alarms', this.state.values);
        alarms.push(response.data);
      }
      this.props.setAlarms(alarms);
      
    } catch(e) {
      console.log(e);
    }

    this.props.onClose();
  }

  render = () => {

    const { classes, onClose }  = this.props;
    const { values, errors } = this.state;

    return (
      <div className={classes.modal}>
          <div className={classes.heading}>{this.props.edit ? 'EDITAR' : 'NOVO'} ALARME</div>
          <form onSubmit={this.onSubmit} className={classes.content}>
          {this.textFields.map(({ id, label }) => (
            <div key={id} className={classes.formControl}>
              <label>{label}</label>
              <input
                id={id}
                className={`${classes.input} ${errors[id] ? classes.error : ''}`}
                value={values[id]}
                onChange={this.onChange}
              />
            </div>
          ))}
          <div className={classes.formControl}>
            <label>Período</label>
            <select id="period" onChange={this.onChange} value={values.period} className={classes.select} type="select">
              <option value={2}>2 minutos</option>
              <option value={10}>10 minutos</option>
              <option value={30}>30 minutos</option>
            </select>
          </div>
          <div className={classes.buttons}>
              <div onClick={onClose}>CANCELAR</div>
              <button type="submit" className={classes.saveButton}>SALVAR</button>
          </div>
          </form>
      </div>
  );
  }
}

const mapStateToProps = state => {
  return {
    alarms: state.alarms.all,
    selected: state.alarms.selected
  };
}

export default compose(
  injectSheet(newAlarmModalStyle),
  connect(mapStateToProps, { setAlarms })
)(NewAlarmModal);
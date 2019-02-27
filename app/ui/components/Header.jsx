import React from 'react'
import Button from '@material-ui/core/Button';
import injectSheet from 'react-jss';
import ModalWrapper from './ModalWrapper';
import NewAlarmModal from './NewAlarmModal';

const headerStyle = {
  container: {
    marginBottom: '30px',
    '& > *': {
      display: 'inline-block',
      verticalAlign: 'middle',
    }
  },
  title: {
    margin: 0,
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: '300'
  },
  button: {
    float: 'right',
    backgroundColor: '#0075CF',
    color: 'white'
  }
}

class Header extends React.Component {

  openModal = e => {
    this.refs.modal.open();
  }

  closeModal = e => {
    this.refs.modal.close();
  }

  render = () => {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <h1 className={classes.title}>Meus Alarmes</h1>
        <Button onClick={this.openModal} variant="contained" color="inherit" className={classes.button}>
          NOVO ALARME
        </Button>
        <ModalWrapper ref="modal" render={() => <NewAlarmModal onClose={this.closeModal} />} />
      </div>
    );
  }
}

export default injectSheet(headerStyle)(Header);
import React, { Component } from 'react'
import propTypes from 'prop-types';
import injectSheet from 'react-jss';
import modalWrapperStyle from '../../styles/components/modalWrapper.style';

class ModalWrapper extends Component {
  
  state = { isOpen: false };

  ModalWithStyle = injectSheet(modalWrapperStyle)(({ classes, render, isOpen, dismiss }) => {
    return (
      <div id="backdrop" onClick={dismiss} className={`${classes.container} ${isOpen ? classes.open : classes.closed}`}>
        {render ? render() : null}
      </div>
    );
  });

  open = () => {
    this.setState({ isOpen: true });
  }

  dismiss = e => {
    const { id } = e.target;
    if(id == 'backdrop') {
      this.close();
    } 
  }
  
  close = () => {
    this.setState({ isOpen: false });
  }

  render() {
    const { ModalWithStyle } = this;
    return (
      <ModalWithStyle dismiss={this.dismiss} isOpen={this.state.isOpen} render={this.props.render} />
    );
  }
}

ModalWrapper.propTypes = {
  render: propTypes.func.isRequired
}

export default ModalWrapper;
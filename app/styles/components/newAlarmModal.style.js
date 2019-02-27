const newAlarmModal = {
  modal: {
      display: 'inline-block',
      padding: '20px',
      marginTop: '100px',
      borderRadius: '5px',
      backgroundColor: 'white',
  },
  heading: {
      fontWeight: '500',
      fontSize: '20px',
      letterSpacing: '1px',
      borderBottom: '1px solid rgba(0, 0, 0, 0.3)',
      paddingBottom: '5px',
      textAlign: 'left',
      color: 'rgba(0,0,0,0.75)'
  },
  content: {
      padding: '20px 0'
  },
  buttons: {
      float: 'right',
      marginTop: '20px',
      '& > *': {
          display: 'inline-block',
          marginLeft: '20px',
          fontWeight: 'bold',
          color: 'grey',
          cursor: 'pointer',
          '&:hover': {
              opacity: '0.8'
          }
      }
  },
  saveButton: {
    color: '#0075CF',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '16px'
  },
  input: {
    width: '400px',
    padding: '10px',
    display: 'block',
    marginBottom: '15px'
  },
  formControl: {
      textAlign: 'left'
  },
  select: {
    width: '100%',
    padding: '10px',
    display: 'block',
    marginBottom: '15px'
  },
  error: {
      borderColor: 'red'
  }
}

export default newAlarmModal;
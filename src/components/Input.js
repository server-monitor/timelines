
import React, { PropTypes } from 'react';

const style = {
  paddingTop: '4px',
  paddingBottom: '8px',

  inputText: {
    margin: '8px',
    width: '310px',
    fontSize: 'small'
  },

  button: {
    backgroundColor: 'white',
    border: '4px solid red',
    borderRadius: '4px'
  }
};

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickWrapper = this.handleClickWrapper.bind(this);
  }

  handleClickWrapper() {
    this.inputGroupSpecifier.value = '';
    this.props.handleClick();
  }

  render() {
    const { handleChangeGroupSpecifier } = this.props;

    return (
      <span style={style}>
        <span>
          To graph a timeline, enter the meetup.com group URL here
        </span>

        <input
          type="text"
          onChange={handleChangeGroupSpecifier}
          style={style.inputText}
          placeholder="https://www.meetup.com/LearnTeachCode/"
          ref={(input) => { this.inputGroupSpecifier = input; }}
        />

        <button
          type="input"
          onClick={this.handleClickWrapper}
          style={style.button}
        >
          Submit
        </button>
      </span>
    );
  }
}

Input.propTypes = {
  handleChangeGroupSpecifier: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired
};

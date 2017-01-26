
import React, { PropTypes } from 'react';

const fontSize = 'large';

const style = {
  inputText: {
    margin: '8px',
    width: '310px',
    fontSize
  },

  button: { fontSize }
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
      <div style={style}>
        <input
          type="text"
          onChange={handleChangeGroupSpecifier}
          style={style.inputText}
          placeholder="meetup.com group URL or URL name"
          ref={(input) => { this.inputGroupSpecifier = input; }}
        />

        <button
          type="input"
          onClick={this.handleClickWrapper}
          style={style.button}
        >
          Submit
        </button>
      </div>
    );
  }
}

Input.propTypes = {
  handleChangeGroupSpecifier: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired
};

import React from "react";

export class Counter extends React.Component {
  state = {
    number: 0
  }

  incrementNumber = (e) => {
    this.setState({
      number: this.state.number + 1
    })
  }

  decrementNumber = (e) => {
    this.setState({
      number: this.state.number - 1
    })
  }

  render() {
    const style = {
      width: "32px",
      height: "32px",
      marginInline: "10px",
      backgroundColor: "#F26D21",
      color: '#fff',
      border: 'none',
      fontWeight: 'bold',
      borderRadius: '50%',
      fontSize: '1rem',
    }

    const container = {
      display: 'flex',
      // alignItems: 'center',
      margin: 'auton',
      width: '100%',
      height: '100%'
    }
    return (
      <div style={container}>
        <button style={style} onClick={this.decrementNumber}>-</button>
        <p> {this.state.number} </p>
        <button style={style} onClick={this.incrementNumber}>+</button>
      </div>
    )
  }
}

export default Counter;

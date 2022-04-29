import { Component } from "react";
import style from "./style.module.css";

export default class Input extends Component {
  render() {
    const { className, error, ...rest } = this.props;
    return (
      <input
        className={`${className} ${error ? style.error : ""} px-3 py-3 py-lg-4 ${style.input}`}
        {...rest}
      />
    );
  }
}

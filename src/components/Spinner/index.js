import { Component } from "react";
import style from "./style.module.css";

export default class Spinner extends Component {
  render() {
    const { className, variant, grow, ...rest } = this.props;
    return (
      <div
        className={`${className} ${style[variant]}  ${grow ? "spinner-grow" : "spinner-border"}`}
        role="status"
        {...rest}
        >
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }
}

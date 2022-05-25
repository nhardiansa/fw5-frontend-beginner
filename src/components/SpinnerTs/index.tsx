import React from "react";
import style from "./style.module.css";

interface Props {
  className?: string;
  variant?: "primary" | "secondary";
  grow?: boolean;
  rest?: any;
}

const Spinner: React.FC<Props> = ({ className, variant, grow, ...rest }) => {
  return (
    <div
      className={`${className} ${style[variant]}  ${grow ? "spinner-grow" : "spinner-border"}`}
      role="status"
      {...rest}
      >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Spinner;

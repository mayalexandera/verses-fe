import React from "react";

import classes from "./Button.css";
const SizeButton = (props) => (
  <button
    className={[classes.Button, classes[props.btnType]].join(" ")}
    onClick={props.clicked}
    value={props.value}
    selected={props.selected}
  >
    {props.children}
  </button>
);


export default SizeButton;

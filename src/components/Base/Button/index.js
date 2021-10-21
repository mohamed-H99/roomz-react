import React from "react";
import { Loader } from "react-feather";
import "./style.css";

export default function Button({ variant, loading, children, ...rest }) {
  return (
    <button className={`btn btn-${variant}`} {...rest}>
      {loading ? <Loader /> : children}
    </button>
  );
}

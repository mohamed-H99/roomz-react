import React from "react";
import { Loader } from "react-feather";
import "./style.css";

export default function Button({ variant, loading, children, ...rest }) {
  return (
    <button className={`btn btn-${variant}`} {...rest} disabled={loading}>
      {loading ? <Loader /> : children}
    </button>
  );
}

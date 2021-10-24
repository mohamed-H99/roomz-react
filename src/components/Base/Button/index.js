import React from "react";
import { Loader } from "react-feather";
import "./style.css";

export default function Button({
  variant,
  loading,
  children,
  className,
  ...rest
}) {
  return (
    <button
      className={`btn btn-${variant} ${className}`}
      {...rest}
      disabled={loading}
    >
      {loading ? <Loader /> : children}
    </button>
  );
}

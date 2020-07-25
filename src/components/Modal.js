import React from 'react'

import "./Modal.css";

export function Modal({ show, children }) {
  if (!show) return null;
  return <div className="Modal">{children}</div>;
}

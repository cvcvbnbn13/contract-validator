import React from 'react';
import { useValidator } from '../../context/validatorProvider';
import './index.css';

const Loading = ({ checkRes }) => {
  const { isValidating } = useValidator();

  return checkRes === null && isValidating ? (
    <div className="spinner">
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  ) : null;
};

export default Loading;

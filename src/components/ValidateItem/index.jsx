import React from 'react';
import './index.css';

const ValidateItem = props => {
  const { checkRes, checkItem, checkItemDes } = props;

  return (
    <div className="validate-item">
      <h4
        className={
          checkRes === null ? 'PENDING' : checkRes === true ? 'PASS' : 'FAILED'
        }
      >
        {checkRes === null ? 'PENDING' : checkRes === true ? 'PASS' : 'FAILED'}
      </h4>
      <h3>{checkItem}</h3>
      <p>{checkItemDes}</p>
    </div>
  );
};

export default ValidateItem;

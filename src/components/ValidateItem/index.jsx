import React from 'react';
import './index.css';
import Loading from '../Loading';

const ValidateItem = props => {
  const { checkRes, checkItem, checkItemDes } = props;

  return (
    <div className="validate-item">
      <div className="validate-item-status">
        <h4
          className={
            checkRes === null
              ? 'PENDING'
              : checkRes === true
              ? 'PASS'
              : 'FAILED'
          }
        >
          {checkRes === null
            ? 'PENDING'
            : checkRes === true
            ? 'PASS'
            : 'FAILED'}
        </h4>
        <Loading checkRes={checkRes} />
      </div>
      <h3>{checkItem}</h3>
      <p>{checkItemDes}</p>
    </div>
  );
};

export default ValidateItem;

import React, { useEffect } from 'react';
import './index.css';
import ValidateItem from '../ValidateItem';
const text = require('./text.json');

const ValidateSeciton = ({ title, validatePart, validateObject }) => {
  const itemArray = Object.entries(text[validatePart]);

  console.log(itemArray);

  return (
    <section className="validate-section">
      <h3>{title}</h3>
      <div className="validate-item-section">
        {itemArray.map(item => {
          return (
            <ValidateItem
              key={item[0]}
              checkRes={validateObject[item[0]]}
              checkItem={item[1].title}
              checkItemDes={item[1].description}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ValidateSeciton;

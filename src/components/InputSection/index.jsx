import React from 'react';
import { useValidator } from '../../context/validatorProvider';
import './index.css';

const networkOption = [
  {
    title: '請選擇網路',
    value: '',
  },
  {
    title: 'Rinkeby Test',
    value: 'rinkeby',
  },
];

const InputSection = () => {
  const { inputValue, handleInput, validate, currentNetwork } = useValidator();

  return (
    <div className="input-section">
      <label htmlFor="Network">網路</label>
      <select
        name="Network"
        id="Network"
        value={inputValue.Network}
        onChange={handleInput}
      >
        {networkOption.map(item => {
          return (
            <option value={item.value} key={item.title}>
              {item.title}
            </option>
          );
        })}
        <option
          value="inject"
          disabled={parseInt(window.ethereum?.chainId) === 4}
        >
          {inputValue.Network === 'inject'
            ? `${
                currentNetwork?.name ? currentNetwork.name : ''
              } (MetaMask Injected)`
            : 'Injected Provider - MetaMask'}
        </option>
      </select>

      <label htmlFor="NFTAddress">合約地址</label>
      <input
        type="text"
        id="NFTAddress"
        name="NFTAddress"
        onChange={handleInput}
        value={inputValue.NFTAddress}
      />

      <label htmlFor="TokenID">TokenID</label>
      <input
        type="text"
        name="TokenID"
        id="TokenID"
        value={inputValue.TokenID}
        onChange={handleInput}
      />
      <button onClick={validate}>試一試</button>
    </div>
  );
};

export default InputSection;

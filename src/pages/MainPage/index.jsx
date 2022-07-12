import React from 'react';
import { InputSection } from '../../components';
import { useValidator } from '../../context/validatorProvider';
import './index.css';

const MainPage = () => {
  return (
    <div className="mainPage">
      <div className="banner">
        <h2>NFT驗證工具</h2>
        <p>用於ERC-721、ERC-1155</p>
      </div>
      <InputSection />
    </div>
  );
};

export default MainPage;

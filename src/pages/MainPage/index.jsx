import React from 'react';
import { InputSection, ValidateSection } from '../../components';
import { useValidator } from '../../context/validatorProvider';
import './index.css';

const MainPage = () => {
  const {
    ContractValidatePart,
    ERC721ValidatePart,
    ERC1155ValidatePart,
    MetadataValidatePart,
    refresh,
  } = useValidator();

  return (
    <div className="mainPage">
      <section className="top-section">
        <div className="banner">
          <h2>NFT驗證工具</h2>
          <p>用於ERC-721、ERC-1155</p>
        </div>
        <InputSection />
      </section>
      <section className="main-section">
        <ValidateSection
          title="Contract"
          validatePart="ContractValidatePart"
          validateObject={ContractValidatePart}
        />
        <ValidateSection
          title="ERC-721 tests"
          validatePart="ERC721ValidatePart"
          validateObject={ERC721ValidatePart}
        />
        <ValidateSection
          title="ERC-1155 tests"
          validatePart="ERC1155ValidatePart"
          validateObject={ERC1155ValidatePart}
        />
        <ValidateSection
          title="Metadata tests"
          validatePart="MetadataValidatePart"
          validateObject={MetadataValidatePart}
        />
      </section>
      <button onClick={refresh}>回復</button>
    </div>
  );
};

export default MainPage;

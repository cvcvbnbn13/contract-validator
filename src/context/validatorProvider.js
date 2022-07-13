import { createContext, useContext, useEffect, useReducer } from 'react';
import reducer from './reducer';
import { ethers } from 'ethers';
import {
  HANDLE_INPUT_TOOL,
  INIT_BATCH_TOOL,
  CHECK_ADDR_IS_CONTRACT,
  VALIDATE_BEGIN,
  ERC_165_CHECK,
  ERC_721_CHECK,
  ERC_1155_CHECK,
  ERC_721_METADATA_CHECK,
  ERC_721_ENUMERABLE_CHECK,
  ERC_721_NAME_CHECK,
  ERC_721_SYMBOL_CHECK,
  ERC_721_TOTAL_SUPPLY_CHECK,
  ERC_721_TOKEN_BY_INDEX_CHECK,
  ERC_721_TOKEN_OF_OWNER_BY_INDEX_CHECK,
  ERC_721_TOKENURI_CHECK,
  ERC_1155_TOKENURI_CHECK,
  TOKEN_METADATA_CHECK,
  REFRESH,
} from './actions';

import {
  getContractValidatorContract,
  getERC721Contract,
  getERC1155Contract,
} from '../utils';

const provider = ethers.getDefaultProvider('rinkeby', {
  infura: {
    projectId: process.env.INFURA_PROJECT_ID,
    projectSecret: process.env.INFURA_PROJECT_SECRET,
  },
});

const web3Provider = new ethers.providers.Web3Provider(window.ethereum);

const initialState = {
  isLoading: false,
  ethereum: null,
  ContractValidatorContract: null,
  ERC721Contract: null,
  ERC1155Contract: null,
  provider,
  currentUser: '',
  isValidating: false,
  ContractValidatePart: {
    addrIsContract: null,
    ERC165Check: null,
    ERC721Check: null,
    ERC1155Check: null,
  },
  ERC721ValidatePart: {
    ERC721MetadataCheck: null,
    ERC721EnumerableCheck: null,
    ERC721NameCheck: null,
    ERC721SymbolCheck: null,
    ERC721TotalSupplyCheck: null,
    ERC721TokenByIndexCheck: null,
    ERC721TokenOfOwnerByIndexCheck: null,
    ERC721TokenURICheck: null,
  },
  ERC1155ValidatePart: {
    ERC1155TokenURICheck: null,
  },
  MetadataValidatePart: {
    tokenMetadataCheck: null,
  },
  inputValue: {
    Network: '',
    TokenID: '',
    NFTAddress: '',
  },
};

const ContractValidatorContext = createContext();

const ERC1155IID = '0xd9b67a26';
const ERC721IID = '0x80ac58cd';
const ERC721MetadataIID = '0x5b5e139f';
const ERC721EnumerableIID = '0x780e9d63';

const ValidatorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function initTool() {
      try {
        await web3Provider.send('eth_requestAccounts', []);
        const signer = web3Provider.getSigner();

        const contract = await getContractValidatorContract(provider);
        const ERC721Contract = await getERC721Contract(
          state.inputValue.NFTAddress,
          provider
        );
        const ERC1155Contract = await getERC1155Contract(
          state.inputValue.NFTAddress,
          provider
        );

        const signedContract = contract.connect(signer);
        const signedERC721Contract = ERC721Contract.connect(signer);
        const signedERC1155Contract = ERC1155Contract.connect(signer);

        dispatch({
          type: INIT_BATCH_TOOL,
          payload: {
            signedContract,
            signedERC721Contract,
            signedERC1155Contract,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
    initTool();
  }, [state.inputValue.NFTAddress]);

  useEffect(() => {
    if (!state.isValidating) return;

    const checkAddrIsContract = async () => {
      try {
        const res = await provider.getCode(state.inputValue.NFTAddress);
        const isContract = res !== '0x';
        dispatch({ type: CHECK_ADDR_IS_CONTRACT, payload: { isContract } });
      } catch (error) {
        console.error(error);
      }
    };

    checkAddrIsContract();
  }, [state.inputValue.NFTAddress, state.isValidating]);

  useEffect(() => {
    if (
      state.ContractValidatorContract === null ||
      !state.isValidating ||
      !state.ContractValidatePart.addrIsContract
    )
      return;

    const checkERC165 = async () => {
      try {
        const res = await state.ContractValidatorContract?.check165IsAlready(
          state.inputValue.NFTAddress
        );
        dispatch({ type: ERC_165_CHECK, payload: { res } });
      } catch (error) {
        console.error(error);
      }
    };

    checkERC165();
  }, [
    state.ContractValidatorContract,
    state.isValidating,
    state.ContractValidatePart.addrIsContract,
    state.inputValue.NFTAddress,
  ]);

  useEffect(() => {
    if (
      state.ERC721Contract === null ||
      !state.isValidating ||
      !state.ContractValidatePart.addrIsContract ||
      state.ERC721Contract?.address === '' ||
      state.ERC721Contract?.address !== state.inputValue.NFTAddress
    )
      return;

    const checkERC721 = async () => {
      try {
        const res = await state.ERC721Contract?.supportsInterface(ERC721IID);

        dispatch({ type: ERC_721_CHECK, payload: { res } });
      } catch (error) {
        console.error(error);
      }
    };

    checkERC721();
  }, [
    state.ERC721Contract,
    state.isValidating,
    state.ContractValidatePart.addrIsContract,
    state.inputValue.NFTAddress,
  ]);

  useEffect(() => {
    if (
      state.ERC1155Contract === null ||
      !state.isValidating ||
      !state.ContractValidatePart.addrIsContract ||
      state.ERC1155Contract?.address !== state.inputValue.NFTAddress
    )
      return;

    const checkERC1155 = async () => {
      try {
        const res = await state.ERC1155Contract?.supportsInterface(ERC1155IID);
        dispatch({ type: ERC_1155_CHECK, payload: { res } });
      } catch (error) {
        console.error(error);
      }
    };

    checkERC1155();
  }, [
    state.ERC1155Contract,
    state.isValidating,
    state.ContractValidatePart.addrIsContract,
    state.inputValue.NFTAddress,
  ]);

  useEffect(() => {
    if (
      state.ContractValidatePart.ERC721Check === null ||
      state.ERC721Contract?.address !== state.inputValue.NFTAddress
    )
      return;

    const ERC721Tests = async () => {
      const ERC721MetadataCheckRes =
        await state.ERC721Contract?.supportsInterface(ERC721MetadataIID);

      dispatch({
        type: ERC_721_METADATA_CHECK,
        payload: { ERC721MetadataCheckRes },
      });

      const ERC721EnumerableCheckRes =
        await state.ERC721Contract?.supportsInterface(ERC721EnumerableIID);

      dispatch({
        type: ERC_721_ENUMERABLE_CHECK,
        payload: { ERC721EnumerableCheckRes },
      });

      const ERC721NameCheckRes = await state.ERC721Contract?.name();
      dispatch({
        type: ERC_721_NAME_CHECK,
        payload: { ERC721NameCheckRes: ERC721NameCheckRes !== '' },
      });

      const ERC721SymbolCheckRes = await state.ERC721Contract?.symbol();
      dispatch({
        type: ERC_721_SYMBOL_CHECK,
        payload: { ERC721SymbolCheckRes: ERC721SymbolCheckRes !== '' },
      });

      const ERC721TotalSupplyCheckRes =
        await state.ERC721Contract?.totalSupply();
      dispatch({
        type: ERC_721_TOTAL_SUPPLY_CHECK,
        payload: {
          ERC721TotalSupplyCheckRes:
            ERC721TotalSupplyCheckRes?._hex.toString() !== '',
        },
      });

      const ERC721TokenByIndexCheckRes =
        await state.ERC721Contract?.hasOwnProperty('tokenByIndex');
      dispatch({
        type: ERC_721_TOKEN_BY_INDEX_CHECK,
        payload: { ERC721TokenByIndexCheckRes },
      });

      const ERC721TokenOfOwnerByIndexCheckRes =
        await state.ERC721Contract?.hasOwnProperty('tokenByIndex');
      dispatch({
        type: ERC_721_TOKEN_OF_OWNER_BY_INDEX_CHECK,
        payload: { ERC721TokenOfOwnerByIndexCheckRes },
      });

      const ERC721TokenURICheckRes = await state.ERC721Contract?.tokenURI(
        state.inputValue.TokenID
      );
      dispatch({
        type: ERC_721_TOKENURI_CHECK,
        payload: { ERC721TokenURICheckRes: ERC721TokenURICheckRes !== '' },
      });
    };

    ERC721Tests();
  }, [
    state.ContractValidatePart.ERC721Check,
    state.ERC721Contract,
    state.inputValue.NFTAddress,
    state.inputValue.TokenID,
  ]);

  useEffect(() => {
    if (
      state.ContractValidatePart.ERC1155Check === null ||
      state.ERC1155Contract?.address !== state.inputValue.NFTAddress
    )
      return;

    if (state.ContractValidatePart.ERC1155Check === false) {
      dispatch({
        type: ERC_1155_TOKENURI_CHECK,
        payload: { ERC1155TokenURICheckRes: false },
      });
      return;
    }

    const ERC1155Tests = async () => {
      const ERC1155TokenURICheckRes = await state.ERC1155Contract?.uri(
        state.inputValue.TokenID
      );
      dispatch({
        type: ERC_1155_TOKENURI_CHECK,
        payload: { ERC1155TokenURICheckRes: ERC1155TokenURICheckRes !== '' },
      });
    };

    ERC1155Tests();
  }, [
    state.ContractValidatePart.ERC1155Check,
    state.ERC1155Contract,
    state.inputValue.NFTAddress,
    state.inputValue.TokenID,
  ]);

  useEffect(() => {
    if (!state.isValidating) return;

    if (
      state.ERC721ValidatePart.ERC721TokenURICheck === null &&
      state.ERC1155ValidatePart.ERC1155TokenURICheck === null
    )
      return;
    const metadata721Test = async () => {
      const ERC721Metadata = await state.ERC721Contract?.tokenURI(
        state.inputValue.TokenID
      );

      const Format721 = ERC721Metadata.replace('ipfs://', 'ipfs/');

      const resOf721 = await fetch(`https://cf-ipfs.com/${Format721}`);

      const JSON721 = await resOf721.json();

      const res = JSON721.hasOwnProperty('description');

      dispatch({
        type: TOKEN_METADATA_CHECK,
        payload: { TokenMetadataCheckRes: res },
      });
    };

    const metadata1155Test = async () => {
      const ERC1155Metadata = await state.ERC1155Contract?.uri(
        state.inputValue.TokenID
      );
      const Format1155 = ERC1155Metadata.replace('ipfs://', 'ipfs/');

      const resOf1155 = await fetch(`https://cf-ipfs.com/${Format1155}`);

      const JSON1155 = await resOf1155.json();

      const res = JSON1155.hasOwnProperty('description');

      dispatch({
        type: TOKEN_METADATA_CHECK,
        payload: { TokenMetadataCheckRes: res },
      });
    };

    if (state.ERC1155ValidatePart.ERC1155TokenURICheck) {
      metadata1155Test();
      return;
    } else if (
      state.ERC721ValidatePart.ERC721TokenURICheck &&
      !state.ERC1155ValidatePart.ERC1155TokenURICheck
    ) {
      metadata721Test();
      return;
    } else {
      dispatch({
        type: TOKEN_METADATA_CHECK,
        payload: { TokenMetadataCheckRes: false },
      });
    }
  }, [
    state.ERC1155Contract,
    state.ERC1155ValidatePart.ERC1155TokenURICheck,
    state.ERC721Contract,
    state.ERC721ValidatePart.ERC721TokenURICheck,
    state.inputValue.TokenID,
    state.isValidating,
  ]);

  const handleInput = e => {
    dispatch({
      type: HANDLE_INPUT_TOOL,
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const validate = () => {
    if (!state.inputValue.Network) {
      alert('Please pick a network.');
      return;
    } else if (!state.inputValue.NFTAddress) {
      alert('Please fill in contract address.');
      return;
    } else if (!state.inputValue.TokenID) {
      alert('Please fill in TokenID.');
      return;
    }

    dispatch({ type: VALIDATE_BEGIN, payload: true });
  };

  const refresh = () => {
    dispatch({ type: REFRESH });
  };

  return (
    <ContractValidatorContext.Provider
      value={{ ...state, handleInput, validate, refresh }}
    >
      {children}
    </ContractValidatorContext.Provider>
  );
};

function useValidator() {
  return useContext(ContractValidatorContext);
}

export { initialState, useValidator };

export default ValidatorProvider;

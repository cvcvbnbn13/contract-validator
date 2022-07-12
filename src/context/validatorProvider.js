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
  addrIsContract: null,
  ERC165Check: null,
  ERC721Check: null,
  ERC1155Check: null,
  inputValue: {
    Network: '',
    TokenID: '',
    NFTAddress: '',
  },
};

const ContractValidatorContext = createContext();

const ERC1155IID = '0xd9b67a26';
const ERC721IID = '0x80ac58cd';

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
      !state.addrIsContract
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
    state.addrIsContract,
    state.inputValue.NFTAddress,
  ]);

  useEffect(() => {
    if (
      state.ERC721Contract === null ||
      !state.isValidating ||
      !state.addrIsContract ||
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
    state.addrIsContract,
    state.inputValue.NFTAddress,
  ]);

  useEffect(() => {
    if (
      state.ERC1155Contract === null ||
      !state.isValidating ||
      !state.addrIsContract ||
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
    state.addrIsContract,
    state.inputValue.NFTAddress,
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
    }

    dispatch({ type: VALIDATE_BEGIN, payload: true });
  };

  console.log(state);

  return (
    <ContractValidatorContext.Provider
      value={{ ...state, handleInput, validate }}
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

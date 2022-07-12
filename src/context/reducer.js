import {
  HANDLE_INPUT_TOOL,
  INIT_BATCH_TOOL,
  CHECK_ADDR_IS_CONTRACT,
  VALIDATE_BEGIN,
  ERC_165_CHECK,
  ERC_721_CHECK,
  ERC_1155_CHECK,
} from './actions';

const reducer = (state, action) => {
  if (action.type === HANDLE_INPUT_TOOL) {
    return {
      ...state,
      inputValue: {
        ...state.inputValue,
        [action.payload.name]: action.payload.value,
      },
    };
  }

  if (action.type === INIT_BATCH_TOOL) {
    return {
      ...state,
      ethereum: window.ethereum,
      ContractValidatorContract: action.payload.signedContract,
      ERC721Contract: action.payload.signedERC721Contract,
      ERC1155Contract: action.payload.signedERC1155Contract,
    };
  }

  if (action.type === CHECK_ADDR_IS_CONTRACT) {
    return {
      ...state,
      addrIsContract: action.payload.isContract,
    };
  }

  if (action.type === VALIDATE_BEGIN) {
    return {
      ...state,
      isValidating: action.payload,
    };
  }

  if (action.type === ERC_165_CHECK) {
    return {
      ...state,
      ERC165Check: action.payload.res,
    };
  }

  if (action.type === ERC_721_CHECK) {
    return {
      ...state,
      ERC721Check: action.payload.res,
    };
  }

  if (action.type === ERC_1155_CHECK) {
    return {
      ...state,
      ERC1155Check: action.payload.res,
    };
  }
};

export default reducer;

import {
  HANDLE_INPUT_TOOL,
  INIT_BATCH_TOOL,
  CHECK_ADDR_IS_CONTRACT,
  CHECK_ADDR_IS_CONTRACT_FAILED,
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
  BLOCK_ERC721_CHECK,
  BLOCK_ERC1155_CHECK,
  INJECT_META_MASK_RPC,
  CHANGE_CHAIN,
} from './actions';

import { initialState } from './validatorProvider';

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
      ContractValidatorContract: action.payload.contract,
      ERC721Contract: action.payload.ERC721Contract,
      ERC1155Contract: action.payload.ERC1155Contract,
    };
  }

  if (action.type === CHECK_ADDR_IS_CONTRACT) {
    return {
      ...state,
      ContractValidatePart: {
        ...state.ContractValidatePart,
        addrIsContract: action.payload.isContract,
      },
    };
  }

  if (action.type === CHECK_ADDR_IS_CONTRACT_FAILED) {
    return {
      ...state,
      ContractValidatePart: {
        ...state.ContractValidatePart,
        addrIsContract: action.payload.isContract,
      },
      isValidating: false,
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
      ContractValidatePart: {
        ...state.ContractValidatePart,
        ERC165Check: action.payload.res,
      },
    };
  }

  if (action.type === ERC_721_CHECK) {
    return {
      ...state,
      ContractValidatePart: {
        ...state.ContractValidatePart,
        ERC721Check: action.payload.res,
      },
    };
  }

  if (action.type === ERC_1155_CHECK) {
    return {
      ...state,
      ContractValidatePart: {
        ...state.ContractValidatePart,
        ERC1155Check: action.payload.res,
      },
    };
  }

  if (action.type === ERC_721_METADATA_CHECK) {
    return {
      ...state,
      ERC721ValidatePart: {
        ...state.ERC721ValidatePart,
        ERC721MetadataCheck: action.payload.ERC721MetadataCheckRes,
      },
    };
  }

  if (action.type === ERC_721_ENUMERABLE_CHECK) {
    return {
      ...state,
      ERC721ValidatePart: {
        ...state.ERC721ValidatePart,
        ERC721EnumerableCheck: action.payload.ERC721EnumerableCheckRes,
      },
    };
  }

  if (action.type === ERC_721_NAME_CHECK) {
    return {
      ...state,
      ERC721ValidatePart: {
        ...state.ERC721ValidatePart,
        ERC721NameCheck: action.payload.ERC721NameCheckRes,
      },
    };
  }

  if (action.type === ERC_721_SYMBOL_CHECK) {
    return {
      ...state,
      ERC721ValidatePart: {
        ...state.ERC721ValidatePart,
        ERC721SymbolCheck: action.payload.ERC721SymbolCheckRes,
      },
    };
  }

  if (action.type === ERC_721_TOTAL_SUPPLY_CHECK) {
    return {
      ...state,
      ERC721ValidatePart: {
        ...state.ERC721ValidatePart,
        ERC721TotalSupplyCheck: action.payload.ERC721TotalSupplyCheckRes,
      },
    };
  }

  if (action.type === ERC_721_TOKEN_BY_INDEX_CHECK) {
    return {
      ...state,
      ERC721ValidatePart: {
        ...state.ERC721ValidatePart,
        ERC721TokenByIndexCheck: action.payload.ERC721TokenByIndexCheckRes,
      },
    };
  }

  if (action.type === ERC_721_TOKEN_OF_OWNER_BY_INDEX_CHECK) {
    return {
      ...state,
      ERC721ValidatePart: {
        ...state.ERC721ValidatePart,
        ERC721TokenOfOwnerByIndexCheck:
          action.payload.ERC721TokenOfOwnerByIndexCheckRes,
      },
    };
  }

  if (action.type === ERC_721_TOKENURI_CHECK) {
    return {
      ...state,
      ERC721ValidatePart: {
        ...state.ERC721ValidatePart,
        ERC721TokenURICheck: action.payload.ERC721TokenURICheckRes,
      },
    };
  }

  if (action.type === ERC_1155_TOKENURI_CHECK) {
    return {
      ...state,
      ERC1155ValidatePart: {
        ...state.ERC1155ValidatePart,
        ERC1155TokenURICheck: action.payload.ERC1155TokenURICheckRes,
      },
    };
  }

  if (action.type === TOKEN_METADATA_CHECK) {
    return {
      ...state,
      MetadataValidatePart: {
        ...state.MetadataValidatePart,
        tokenMetadataCheck: action.payload.TokenMetadataCheckRes,
      },
    };
  }

  if (action.type === REFRESH) {
    return { ...initialState };
  }

  if (action.type === BLOCK_ERC721_CHECK) {
    return {
      ...state,
      ERC721ValidatePart: {
        ERC721MetadataCheck: false,
        ERC721EnumerableCheck: false,
        ERC721NameCheck: false,
        ERC721SymbolCheck: false,
        ERC721TotalSupplyCheck: false,
        ERC721TokenByIndexCheck: false,
        ERC721TokenOfOwnerByIndexCheck: false,
        ERC721TokenURICheck: false,
      },
    };
  }

  if (action.type === BLOCK_ERC1155_CHECK) {
    return {
      ...state,
      ERC1155ValidatePart: {
        ERC1155TokenURICheck: false,
      },
    };
  }

  if (action.type === INJECT_META_MASK_RPC) {
    return {
      ...state,
      provider: action.payload.provider,
      currentNetwork: action.payload.MetaMaskRPC,
    };
  }

  if (action.type === CHANGE_CHAIN) {
    return {
      ...state,
      inputValue: {
        ...state.inputValue,
        Network: '',
      },
    };
  }
};

export default reducer;

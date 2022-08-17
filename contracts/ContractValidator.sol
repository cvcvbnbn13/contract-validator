pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";

contract ContractValidator{
  function check165IsAlready(address account)external view returns(bool) {

   return ERC165Checker.supportsERC165(account);
  }

}

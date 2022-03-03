// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Asset is Ownable, ERC721 {
  using Counters for Counters.Counter;
  Counters.Counter private ctr;

  event AssetMinted(address to, uint256 id);

  constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
  }

  function mintAsset(address _to) public onlyOwner {
    ctr.increment();
    uint256 id = ctr.current();

    _mint(_to, id);
    emit AssetMinted(_to, id);
  }
}
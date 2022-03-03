// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Staking is Ownable, IERC721Receiver {
  using Counters for Counters.Counter;
  Counters.Counter private ctr;

  IERC721 public parentNft;

  mapping(uint256 => Stake) public stakeByTokenId; // look up stake for every tokenId

  struct Stake {
    uint256 id;
    uint256 tokenId;
    address staker; // if use mapping do we need this?
    uint256 timestamp; // deposit date?
  }

  event AssetStaked(uint256 id, uint256 tokenId, address staker, uint256 timestamp);
  event AssetUnstaked(uint256 id, uint256 tokenId, address staker, uint256 timestamp);

  constructor(address _parentNftAddress) {
    parentNft = IERC721(_parentNftAddress);
  }

  function stakeAsset(uint256 _tokenId) public {
    ctr.increment();
    uint256 id = ctr.current();
    
    stakeByTokenId[_tokenId] = Stake(id, _tokenId, msg.sender, block.timestamp);
    parentNft.safeTransferFrom(msg.sender, address(this), _tokenId); // require statement?

    emit AssetStaked(id, _tokenId, msg.sender, block.timestamp);
  }

  function unstakeAsset(uint256 _tokenId) public {
    require(msg.sender == stakeByTokenId[_tokenId].staker);

    uint256 id = stakeByTokenId[_tokenId].id;

    parentNft.safeTransferFrom(address(this), msg.sender, _tokenId); // require statement?
    delete stakeByTokenId[_tokenId];

    emit AssetUnstaked(id, _tokenId, msg.sender, block.timestamp);
  }

  function onERC721Received(
      address operator,
      address from,
      uint256 tokenId,
      bytes calldata data
  ) external returns (bytes4) {
    stakeAsset(tokenId);
    return bytes4(keccak256("onERC1155Received(address,address,uint256,bytes)"));
  }
}
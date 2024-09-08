// SPDX-License-Identifier: UNLICENSED 
pragma solidity >=0.7.0 <0.9.0;

contract Voting {

  mapping (string => uint64) public votesReceived;

  string[] public candidateList;

  constructor(string[] memory candidateNames) {
    candidateList = candidateNames;
  }

  function totalVotes() public view returns (uint64) {
    uint64 total = 0;
    for (uint i = 0; i < candidateList.length; i++) {
      total += votesReceived[candidateList[i]];
    }
    return total;
  }

  function totalVotesFor(string memory candidate) public view returns (uint64) {
    require(validateCandidate(candidate));
    return votesReceived[candidate];
  }

  function voteForCandidate(string memory candidate) public {
    require(validateCandidate(candidate));
    votesReceived[candidate] += 1;
  }

  function validateCandidate(string memory candidate) public view returns (bool) {
    for (uint i = 0; i < candidateList.length; i++) {
      if (keccak256(abi.encodePacked(candidate)) == keccak256(abi.encodePacked(candidateList[i]))){
        return true;
      }
    }
    return false;
  }
}
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment the line to use openzeppelin/ERC20
// You can use this dependency directly because it has been installed already
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
//import "..\node_modules\@openzeppelin\contracts\token\ERC20\ERC20.sol";
// Uncomment this line to use console.log
// import "hardhat/console.sol";
contract MyERC20 is ERC20 {

    mapping(address => bool) claimedAirdropPlayerList;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {

    }

    function giveToken() external {
        require(claimedAirdropPlayerList[msg.sender] == false, "This user has claimed airdrop already");
        _mint(msg.sender, 500);
        claimedAirdropPlayerList[msg.sender] = true;
    }

}
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment the line to use openzeppelin/ERC20
// You can use this dependency directly because it has been installed already
//import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
//import "..\node_modules\@openzeppelin\contracts\token\ERC20\ERC20.sol";
// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "./MyERC20.sol";

contract StudentSocietyDAO {
    // use a event if you want
    event ProposalInitiated(uint32 proposalIndex);

    struct Proposal {
        bool isused;
        bool valid;
        uint32 index; // index of this proposal
        address proposer; // who make this proposal
        uint256 startTime; // proposal start time
        uint256 duration; // proposal duration
        string name; // proposal name
        int32 votecount;
        // ...
        // TODO add any member if you want
    }
    uint32 nowIndex;
    address public manager;
    mapping(address => mapping(uint32 => bool)) VotedProposal;
    uint256 public constant PROMOTE_COST = 10;
    uint256 public constant VOTE_COST = 1;
    uint256 public constant GAIN = 10;
    MyERC20 public studentERC20;
    uint32[] indexs;
    mapping(uint32 => Proposal) proposals; // A map from proposal index to proposal
    modifier onlyManager() {
        require(msg.sender == manager);
        _;
    }

    constructor() {
        // maybe you need a constructor
        studentERC20 = new MyERC20("cscToken", "cscTokensymbol");
        manager = msg.sender;
        nowIndex=1;
    }

    function helloworld() external pure returns (string memory) {
        return "hello world";
    }
    
    function sum() external view returns (uint32) {
        return nowIndex;
    }

    function getName(uint32 index) external view returns (string memory){
        return proposals[index].name;
    }

    function getVote(uint32 index) external view returns (int32){
        return proposals[index].votecount;
    }

    function getEnd(uint32 index) external view returns (bool){
        return proposals[index].valid;
    }

    function StartProposal(
        uint256 _startTime,
        uint256 _duration,
        string memory _name
    ) public {
        proposals[nowIndex] = Proposal(
            true,
            true,
            nowIndex,
            msg.sender,
            _startTime,
            _duration,
            _name,
            0
        );
        //indexs.push(_index);
        nowIndex++;
        studentERC20.transferFrom(msg.sender, address(this), PROMOTE_COST);
    }

    function vote(bool choose, uint32 num) public {
        //only vote once
        require(proposals[num].isused == true, "the proposal not exist");
        require(VotedProposal[msg.sender][num] == false, "You have voted already");
        require(proposals[num].valid == true, "This proposal has end");
        if (!choose) {
            proposals[num].votecount--;
        } else {
            proposals[num].votecount++;
        }
        VotedProposal[msg.sender][num] = true;
        studentERC20.transferFrom(msg.sender, address(this), VOTE_COST);
    }

    function endVote(uint32 num) public onlyManager {
        require(proposals[num].isused == true, "the proposal not exist");
        require(proposals[num].valid == true, "This proposal has end");
        if (proposals[num].votecount > 0)
            studentERC20.transfer(proposals[num].proposer, GAIN);
        proposals[num].valid=false;
        VotedProposal[msg.sender][num]=false;
    }

    // ...
    // TODO add any logic if you want
}

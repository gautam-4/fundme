// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract FundMe{
    address immutable owner;
    uint256 fundCount;

    event FundEvent(address from, uint amount, string message);

    struct FundStruct{
        address From;
        uint amount;
        string message;
    }

    FundStruct[] listOfFunds;

    constructor(){
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function fundFunction (string memory message) public payable {
        require(msg.value > 0);
        fundCount += 1;
        listOfFunds.push(FundStruct(msg.sender, msg.value, message));

        emit FundEvent(msg.sender, msg.value, message);
    }

    function getFundHistory() public view returns(FundStruct[] memory){
        return listOfFunds;
    }

    function getFundCount() public view returns(uint256) {
        return fundCount;
    }

    function withdraw() public onlyOwner(){
        (bool callSuccess,) = payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess);
    }
}

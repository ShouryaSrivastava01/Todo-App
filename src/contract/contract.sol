// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Upload {

  mapping(address=>string[]) value;

  function add(address _user,string memory url) external {
      value[_user].push(url);
  }


  function display(address _user) external view returns(string[] memory){
      return value[_user];
  }

}
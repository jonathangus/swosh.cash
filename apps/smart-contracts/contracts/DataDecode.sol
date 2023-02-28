//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import 'hardhat/console.sol';

contract DataDecode {
    function decodeData(bytes calldata _data) external {
        address[] memory addresses = abi.decode(_data, (address[]));

        for (uint256 i = 0; i < addresses.length; ++i) {
            console.log(addresses[i]);
        }
    }

    function printAddr(address[] calldata addresses) external {
        for (uint256 i = 0; i < addresses.length; ++i) {
            console.log(addresses[i]);
        }
    }
}

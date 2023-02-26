//SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

error Failed();

contract TransferCall {
    function multiTransfer(
        address[] calldata _tokens,
        bytes[] calldata _data
    ) external payable {
        for (uint256 i = 0; i < _tokens.length; ++i) {
            (bool success, ) = _tokens[i].call(_data[i]);
            if (!success) revert Failed();
        }
    }

    function multiTransferSingleAsset(
        address _token,
        bytes[] calldata _data
    ) external payable {
        for (uint256 i = 0; i < _data.length; ++i) {
            (bool success, ) = _token.call(_data[i]);
            if (!success) revert Failed();
        }
    }
}

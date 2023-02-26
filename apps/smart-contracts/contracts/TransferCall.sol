//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

error Failed();

contract TransferCall {
    function singleEncodeTransfer(
        address _token,
        address _receiver,
        bytes4 _functionSig
    ) external payable {
        (bool success, ) = _token.call(_functionSig, msg.sender, _receiver, 10);
        if (!success) revert Failed();
    }

    function singleTransfer(address _token, bytes _data) external payable {
        (bool success, ) = _token.call(_data);
        if (!success) revert Failed();
    }

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

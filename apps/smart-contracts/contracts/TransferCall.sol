//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

error Failed();

import {IERC20} from '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract TransferCall {
    function singleTransfer(
        address _token,
        bytes calldata _data
    ) external payable {
        (bool success, ) = _token.call(_data);
        if (!success) revert Failed();
    }

    function singleEncodeTransfer(
        address _token,
        address _receiver,
        uint256 _amount
    ) external payable {
        (bool success, ) = _token.call(
            abi.encodeWithSignature(
                'transferFrom(address,address,uint)',
                msg.sender,
                _receiver,
                _amount
            )
        );

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

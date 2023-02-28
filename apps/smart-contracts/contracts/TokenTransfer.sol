//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {IERC20} from '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import {IERC721} from '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import {IERC1155} from '@openzeppelin/contracts/token/ERC1155/IERC1155.sol';

error INVALID_PARAM();

contract TokenTransfer {
    function multiCollection721Transfer(
        address[] calldata _tokens,
        address _receiver,
        uint256[] calldata _tokenIds,
        uint256[] calldata _offset
    ) external {
        if (_tokens.length != _offset.length) revert INVALID_PARAM();

        uint256 offset = 0;

        for (uint256 i = 0; i < _tokens.length; ++i) {
            for (uint256 j = 0; j < _offset[i]; ++j) {
                IERC721(_tokens[i]).transferFrom(
                    msg.sender,
                    _receiver,
                    _tokenIds[j + offset]
                );
            }
            offset += _offset[i];
        }
    }

    function multi721Transfer(
        address _token,
        address _receiver,
        uint256[] calldata _tokenIds
    ) external {
        for (uint256 i = 0; i < _tokenIds.length; ++i) {
            IERC721(_token).transferFrom(msg.sender, _receiver, _tokenIds[i]);
        }
    }

    function multiTokenTransfer(
        address[] calldata _tokens,
        address _receiver,
        uint256[] calldata _amounts
    ) external {
        if (_tokens.length != _amounts.length) revert INVALID_PARAM();
        for (uint256 i = 0; i < _tokens.length; ++i) {
            IERC20(_tokens[i]).transferFrom(msg.sender, _receiver, _amounts[i]);
        }
    }

    function multiRecipientTransfer(
        address _token,
        address[] calldata _receivers,
        uint256[] calldata _amounts
    ) external {
        if (_receivers.length != _amounts.length) revert INVALID_PARAM();
        for (uint256 i = 0; i < _receivers.length; ++i) {
            IERC20(_token).transferFrom(msg.sender, _receivers[i], _amounts[i]);
        }
    }
}

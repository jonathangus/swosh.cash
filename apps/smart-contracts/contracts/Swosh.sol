//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {IERC20} from '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import {IERC721} from '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import {IERC1155} from '@openzeppelin/contracts/token/ERC1155/IERC1155.sol';

error INVALID_PARAM();
error FORBIDDEN();

contract Swosh {
    struct ERC20Param {
        address[] tokens;
        address recipient;
        uint256[] amounts;
    }

    struct ERC721Param {
        address[] tokens;
        address recipient;
        uint256[] tokenIds;
    }

    struct ERC1155Param {
        address[] tokens;
        address recipient;
        uint256[] tokenIds;
        uint256[] amounts;
    }

    struct MultiERC20Param {
        address[] tokens;
        address[] recipients;
        uint256[] amounts;
    }

    struct MultiERC721Param {
        address[] tokens;
        address[] recipients;
        uint256[] tokenIds;
    }

    struct MultiERC1155Param {
        address[] tokens;
        address[] recipients;
        uint256[] tokenIds;
        uint256[] amounts;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //     ______     __                        __   ______                 __  _
    //    / ____/  __/ /____  _________  ____ _/ /  / ____/_  ______  _____/ /_(_)___  ____  _____
    //   / __/ | |/_/ __/ _ \/ ___/ __ \/ __ `/ /  / /_  / / / / __ \/ ___/ __/ / __ \/ __ \/ ___/
    //  / /____>  </ /_/  __/ /  / / / / /_/ / /  / __/ / /_/ / / / / /__/ /_/ / /_/ / / / (__  )
    // /_____/_/|_|\__/\___/_/  /_/ /_/\__,_/_/  /_/    \__,_/_/ /_/\___/\__/_/\____/_/ /_/____/
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function megaTransfer(
        ERC20Param calldata _erc20Params,
        ERC721Param calldata _erc721Params,
        ERC1155Param calldata _erc1155Params
    ) external {
        if (_erc20Params.tokens.length > 0) {
            this.batchTransferERC20(
                _erc20Params.tokens,
                _erc20Params.recipient,
                _erc20Params.amounts
            );
        }

        if (_erc721Params.tokens.length > 0) {
            this.batchTransferERC721(
                _erc721Params.tokens,
                _erc721Params.recipient,
                _erc721Params.tokenIds
            );
        }

        if (_erc1155Params.tokens.length > 0) {
            this.batchTransferERC1155(
                _erc1155Params.tokens,
                _erc1155Params.recipient,
                _erc1155Params.tokenIds,
                _erc1155Params.amounts
            );
        }
    }

    function multiMegaTransfer(
        MultiERC20Param calldata _erc20Params,
        MultiERC721Param calldata _erc721Params,
        MultiERC1155Param calldata _erc1155Params
    ) external {
        if (_erc20Params.tokens.length > 0) {
            this.multiBatchTransferERC20(
                _erc20Params.tokens,
                _erc20Params.recipients,
                _erc20Params.amounts
            );
        }

        if (_erc721Params.tokens.length > 0) {
            this.multiBatchTransferERC721(
                _erc721Params.tokens,
                _erc721Params.recipients,
                _erc721Params.tokenIds
            );
        }

        if (_erc1155Params.tokens.length > 0) {
            this.multiBatchTransferERC1155(
                _erc1155Params.tokens,
                _erc1155Params.recipients,
                _erc1155Params.tokenIds,
                _erc1155Params.amounts
            );
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //     __________  ______   ___   ____
    //    / ____/ __ \/ ____/  |__ \ / __ \
    //   / __/ / /_/ / /       __/ // / / /
    //  / /___/ _, _/ /___    / __// /_/ /
    // /_____/_/ |_|\____/   /____/\____/
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function batchTransferERC20(
        address[] calldata _tokens,
        address _recipient,
        uint256[] calldata _amounts
    ) external {
        if (msg.sender != tx.origin) revert FORBIDDEN();
        if (_tokens.length != _amounts.length) revert INVALID_PARAM();

        for (uint256 i = 0; i < _tokens.length; ++i) {
            IERC20(_tokens[i]).transferFrom(
                msg.sender,
                _recipient,
                _amounts[i]
            );
        }
    }

    function multiBatchTransferERC20(
        address[] calldata _tokens,
        address[] calldata _recipients,
        uint256[] calldata _amounts
    ) external {
        if (msg.sender != tx.origin) revert FORBIDDEN();
        if (_tokens.length != _recipients.length) revert INVALID_PARAM();
        if (_tokens.length != _amounts.length) revert INVALID_PARAM();

        for (uint256 i = 0; i < _tokens.length; ++i) {
            IERC20(_tokens[i]).transferFrom(
                msg.sender,
                _recipients[i],
                _amounts[i]
            );
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //     __________  ______   ________  ___
    //    / ____/ __ \/ ____/  /__  /__ \<  /
    //   / __/ / /_/ / /         / /__/ // /
    //  / /___/ _, _/ /___      / // __// /
    // /_____/_/ |_|\____/     /_//____/_/
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function batchTransferERC721(
        address[] calldata _tokens,
        address _recipient,
        uint256[] calldata _tokenIds
    ) external {
        if (msg.sender != tx.origin) revert FORBIDDEN();
        if (_tokens.length != _tokenIds.length) revert INVALID_PARAM();

        for (uint256 i = 0; i < _tokens.length; ++i) {
            IERC721(_tokens[i]).transferFrom(
                msg.sender,
                _recipient,
                _tokenIds[i]
            );
        }
    }

    function multiBatchTransferERC721(
        address[] calldata _tokens,
        address[] calldata _recipients,
        uint256[] calldata _tokenIds
    ) external {
        if (msg.sender != tx.origin) revert FORBIDDEN();
        if (_tokens.length != _tokenIds.length) revert INVALID_PARAM();
        if (_tokens.length != _recipients.length) revert INVALID_PARAM();

        for (uint256 i = 0; i < _tokens.length; ++i) {
            IERC721(_tokens[i]).transferFrom(
                msg.sender,
                _recipients[i],
                _tokenIds[i]
            );
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //     __________  ______   __________________
    //    / ____/ __ \/ ____/  <  <  / ____/ ____/
    //   / __/ / /_/ / /       / // /___ \/___ \
    //  / /___/ _, _/ /___    / // /___/ /___/ /
    // /_____/_/ |_|\____/   /_//_/_____/_____/
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function batchTransferERC1155(
        address[] calldata _tokens,
        address _recipient,
        uint256[] calldata _tokenIds,
        uint256[] calldata _amounts
    ) external {
        if (msg.sender != tx.origin) revert FORBIDDEN();
        if (_tokens.length != _tokenIds.length) revert INVALID_PARAM();

        for (uint256 i = 0; i < _tokens.length; ++i) {
            IERC1155(_tokens[i]).safeTransferFrom(
                msg.sender,
                _recipient,
                _tokenIds[i],
                _amounts[i],
                ''
            );
        }
    }

    function multiBatchTransferERC1155(
        address[] calldata _tokens,
        address[] calldata _recipients,
        uint256[] calldata _tokenIds,
        uint256[] calldata _amounts
    ) external {
        if (msg.sender != tx.origin) revert FORBIDDEN();
        if (_tokens.length != _tokenIds.length) revert INVALID_PARAM();
        if (_tokens.length != _recipients.length) revert INVALID_PARAM();

        for (uint256 i = 0; i < _tokens.length; ++i) {
            IERC1155(_tokens[i]).safeTransferFrom(
                msg.sender,
                _recipients[i],
                _tokenIds[i],
                _amounts[i],
                ''
            );
        }
    }
}

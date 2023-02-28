//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {IERC20} from '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import {IERC721} from '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import {IERC1155} from '@openzeppelin/contracts/token/ERC1155/IERC1155.sol';

error INVALID_PARAM();

contract Sned {
    //     ______     __                        __   ______                 __  _
    //    / ____/  __/ /____  _________  ____ _/ /  / ____/_  ______  _____/ /_(_)___  ____  _____
    //   / __/ | |/_/ __/ _ \/ ___/ __ \/ __ `/ /  / /_  / / / / __ \/ ___/ __/ / __ \/ __ \/ ___/
    //  / /____>  </ /_/  __/ /  / / / / /_/ / /  / __/ / /_/ / / / / /__/ /_/ / /_/ / / / (__  )
    // /_____/_/|_|\__/\___/_/  /_/ /_/\__,_/_/  /_/    \__,_/_/ /_/\___/\__/_/\____/_/ /_/____/

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //     __________  ______   ___   ____
    //    / ____/ __ \/ ____/  |__ \ / __ \
    //   / __/ / /_/ / /       __/ // / / /
    //  / /___/ _, _/ /___    / __// /_/ /
    // /_____/_/ |_|\____/   /____/\____/

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function batchTransferERC20(
        address[] calldata _tokens,
        address _to,
        uint256[] calldata _amounts
    ) external {
        if (_tokens.length != _amounts.length) revert INVALID_PARAM();

        for (uint256 i = 0; i < _tokens.length; ++i) {
            _transferERC20(_tokens[i], _to, _amounts[i]);
        }
    }

    function batchTransferERC20(
        address[] calldata _tokens,
        address[] calldata _to,
        uint256[] calldata _amounts
    ) external {
        if (_tokens.length != _to.length) revert INVALID_PARAM();
        if (_tokens.length != _amounts.length) revert INVALID_PARAM();

        for (uint256 i = 0; i < _tokens.length; ++i) {
            _transferERC20(_tokens[i], _to[i], _amounts[i]);
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //     __________  ______   ________  ___
    //    / ____/ __ \/ ____/  /__  /__ \<  /
    //   / __/ / /_/ / /         / /__/ // /
    //  / /___/ _, _/ /___      / // __// /
    // /_____/_/ |_|\____/     /_//____/_/

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function batchTransferERC721(
        address[] calldata _tokens,
        address _to,
        uint256[] calldata _tokenIds
    ) external {
        if (_tokens.length != _tokenIds.length) revert INVALID_PARAM();

        for (uint256 i = 0; i < _tokens.length; ++i) {
            _transferERC721(_tokens[i], _to, _tokenIds[i]);
        }
    }

    function batchTransferERC721(
        address[] calldata _tokens,
        address[] calldata _to,
        uint256[] calldata _tokenIds
    ) external {
        if (_tokens.length != _tokenIds.length) revert INVALID_PARAM();
        if (_tokens.length != _to.length) revert INVALID_PARAM();

        for (uint256 i = 0; i < _tokens.length; ++i) {
            _transferERC721(_tokens[i], _to[i], _tokenIds[i]);
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //     __________  ______   __________________
    //    / ____/ __ \/ ____/  <  <  / ____/ ____/
    //   / __/ / /_/ / /       / // /___ \/___ \
    //  / /___/ _, _/ /___    / // /___/ /___/ /
    // /_____/_/ |_|\____/   /_//_/_____/_____/

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function batchTransferERC1155(
        address[] calldata _tokens,
        address _to,
        uint256[] calldata _tokenIds,
        uint256[] calldata _amounts
    ) external {
        if (_tokens.length != _tokenIds.length) revert INVALID_PARAM();

        for (uint256 i = 0; i < _tokens.length; ++i) {
            _transferERC1155(_tokens[i], _to, _tokenIds[i], _amounts[i]);
        }
    }

    function batchTransferERC1155(
        address[] calldata _tokens,
        address[] calldata _to,
        uint256[] calldata _tokenIds,
        uint256[] calldata _amounts
    ) external {
        if (_tokens.length != _tokenIds.length) revert INVALID_PARAM();
        if (_tokens.length != _to.length) revert INVALID_PARAM();

        for (uint256 i = 0; i < _tokens.length; ++i) {
            _transferERC1155(_tokens[i], _to[i], _tokenIds[i], _amounts[i]);
        }
    }

    //     ____      __                        __   ______                 __  _
    //    /  _/___  / /____  _________  ____ _/ /  / ____/_  ______  _____/ /_(_)___  ____  _____
    //    / // __ \/ __/ _ \/ ___/ __ \/ __ `/ /  / /_  / / / / __ \/ ___/ __/ / __ \/ __ \/ ___/
    //  _/ // / / / /_/  __/ /  / / / / /_/ / /  / __/ / /_/ / / / / /__/ /_/ / /_/ / / / (__  )
    // /___/_/ /_/\__/\___/_/  /_/ /_/\__,_/_/  /_/    \__,_/_/ /_/\___/\__/_/\____/_/ /_/____/

    function _transferERC20(
        address _token,
        address _to,
        uint256 _amount
    ) internal {
        IERC20(_token).transferFrom(msg.sender, _to, _amount);
    }

    function _transferERC721(
        address _token,
        address _to,
        uint256 _tokenId
    ) internal {
        IERC721(_token).transferFrom(msg.sender, _to, _tokenId);
    }

    function _transferERC1155(
        address _token,
        address _to,
        uint256 _tokenId,
        uint256 _amount
    ) internal {
        IERC1155(_token).safeTransferFrom(
            msg.sender,
            _to,
            _tokenId,
            _amount,
            ''
        );
    }
}

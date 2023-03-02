//              _____                    _____                   _______                   _____                    _____
//            /::\    \                /::\____\               /::::\    \               /::\    \                /::\____\
//           /::::\    \              /:::/    /              /::::::\    \             /::::\    \              /:::/    /
//          /::::::\    \            /:::/   _/___           /::::::::\    \           /::::::\    \            /:::/    /
//         /:::/\:::\    \          /:::/   /\    \         /:::/~~\:::\    \         /:::/\:::\    \          /:::/    /
//        /:::/__\:::\    \        /:::/   /::\____\       /:::/    \:::\    \       /:::/__\:::\    \        /:::/____/
//        \:::\   \:::\    \      /:::/   /:::/    /      /:::/    / \:::\    \      \:::\   \:::\    \      /::::\    \
//      ___\:::\   \:::\    \    /:::/   /:::/   _/___   /:::/____/   \:::\____\   ___\:::\   \:::\    \    /::::::\    \   _____
//     /\   \:::\   \:::\    \  /:::/___/:::/   /\    \ |:::|    |     |:::|    | /\   \:::\   \:::\    \  /:::/\:::\    \ /\    \
//    /::\   \:::\   \:::\____\|:::|   /:::/   /::\____\|:::|____|     |:::|    |/::\   \:::\   \:::\____\/:::/  \:::\    /::\____\
//    \:::\   \:::\   \::/    /|:::|__/:::/   /:::/    / \:::\    \   /:::/    / \:::\   \:::\   \::/    /\::/    \:::\  /:::/    /
//     \:::\   \:::\   \/____/  \:::\/:::/   /:::/    /   \:::\    \ /:::/    /   \:::\   \:::\   \/____/  \/____/ \:::\/:::/    /
//      \:::\   \:::\    \       \::::::/   /:::/    /     \:::\    /:::/    /     \:::\   \:::\    \               \::::::/    /
//       \:::\   \:::\____\       \::::/___/:::/    /       \:::\__/:::/    /       \:::\   \:::\____\               \::::/    /
//        \:::\  /:::/    /        \:::\__/:::/    /         \::::::::/    /         \:::\  /:::/    /               /:::/    /
//         \:::\/:::/    /          \::::::::/    /           \::::::/    /           \:::\/:::/    /               /:::/    /
//          \::::::/    /            \::::::/    /             \::::/    /             \::::::/    /               /:::/    /
//           \::::/    /              \::::/    /               \::/____/               \::::/    /               /:::/    /
//            \::/    /                \::/____/                 ~~                      \::/    /                \::/    /
//             \/____/                  ~~                                                \/____/                  \/____/

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

/* Openzeppelin Interfaces */
import {IERC20} from '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import {IERC721} from '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import {IERC1155} from '@openzeppelin/contracts/token/ERC1155/IERC1155.sol';

contract Swosh {
    /**
    @notice Error thrown when invalid parameters are passed
    **/
    error INVALID_PARAM();

    /**
    @notice Error thrown when the operation is forbidden
    **/
    error FORBIDDEN();

    /**
     * @notice
     *  ERC20 Batch Transfer Structure format
     *
     * @param tokens ERC20 token addresses to be sent
     * @param recipient recipient address
     * @param amounts amounts to be sent
     */
    struct ERC20Param {
        address[] tokens;
        address recipient;
        uint256[] amounts;
    }

    /**
     * @notice
     *  ERC721 Batch Transfer Structure format
     *
     * @param tokens ERC721 token addresses to be sent
     * @param recipient recipient address
     * @param tokenIds tokenIds to be sent
     */
    struct ERC721Param {
        address[] tokens;
        address recipient;
        uint256[] tokenIds;
    }

    /**
     * @notice
     *  ERC1155 Batch Transfer Structure format
     *
     * @param tokens ERC1155 token addresses to be sent
     * @param recipient recipient address
     * @param tokenIds tokenIds to be sent
     * @param amounts amounts to be sent
     */
    struct ERC1155Param {
        address[] tokens;
        address recipient;
        uint256[] tokenIds;
        uint256[] amounts;
    }

    /**
     * @notice
     *  Multiple Recipients ERC20 Batch Transfer Structure format
     *
     * @param tokens ERC20 token addresses to be sent
     * @param recipients recipients addresses
     * @param amounts amounts to be sent
     */
    struct MultiERC20Param {
        address[] tokens;
        address[] recipients;
        uint256[] amounts;
    }

    /**
     * @notice
     *  Multiple Recipients ERC721 Batch Transfer Structure format
     *
     * @param tokens ERC721 token addresses to be sent
     * @param recipients recipients addresses
     * @param tokenIds tokenIds to be sent
     */
    struct MultiERC721Param {
        address[] tokens;
        address[] recipients;
        uint256[] tokenIds;
    }

    /**
     * @notice
     *  Multiple Recipients ERC1155 Batch Transfer Structure format
     *
     * @param tokens ERC1155 token addresses to be sent
     * @param recipients recipients addresses
     * @param tokenIds tokenIds to be sent
     * @param amounts amounts to be sent
     */
    struct MultiERC1155Param {
        address[] tokens;
        address[] recipients;
        uint256[] tokenIds;
        uint256[] amounts;
    }

    //     ______     __                        __   ______                 __  _
    //    / ____/  __/ /____  _________  ____ _/ /  / ____/_  ______  _____/ /_(_)___  ____  _____
    //   / __/ | |/_/ __/ _ \/ ___/ __ \/ __ `/ /  / /_  / / / / __ \/ ___/ __/ / __ \/ __ \/ ___/
    //  / /____>  </ /_/  __/ /  / / / / /_/ / /  / __/ / /_/ / / / / /__/ /_/ / /_/ / / / (__  )
    // /_____/_/|_|\__/\___/_/  /_/ /_/\__,_/_/  /_/    \__,_/_/ /_/\___/\__/_/\____/_/ /_/____/

    /**
     * @notice
     *  Send different types of tokens to one recipient address
     *
     * @param _erc20Params Parameters for ERC20 batch transfer (refer to ERC20Param structure)
     * @param _erc721Params Parameters for ERC721 batch transfer (refer to ERC721Param structure)
     * @param _erc1155Params Parameters for ERC1155 batch transfer (refer to ERC1155Param structure)
     */
    function megaTransfer(
        ERC20Param calldata _erc20Params,
        ERC721Param calldata _erc721Params,
        ERC1155Param calldata _erc1155Params
    ) external {
        // Check if there are ERC20 tokens to be sent
        if (_erc20Params.tokens.length > 0) {
            this.batchTransferERC20(
                _erc20Params.tokens,
                _erc20Params.recipient,
                _erc20Params.amounts
            );
        }

        // Check if there are ERC721 tokens to be sent
        if (_erc721Params.tokens.length > 0) {
            this.batchTransferERC721(
                _erc721Params.tokens,
                _erc721Params.recipient,
                _erc721Params.tokenIds
            );
        }

        // Check if there are ERC1155 tokens to be sent
        if (_erc1155Params.tokens.length > 0) {
            this.batchTransferERC1155(
                _erc1155Params.tokens,
                _erc1155Params.recipient,
                _erc1155Params.tokenIds,
                _erc1155Params.amounts
            );
        }
    }

    /**
     * @notice
     *  Send different types of tokens to one recipient address
     *
     * @param _erc20Params Parameters for ERC20 multi recipients batch transfer (refer to MultiERC20Param structure)
     * @param _erc721Params Parameters for ERC721 multi recipients batch transfer (refer to MultiERC721Param structure)
     * @param _erc1155Params Parameters for ERC1155 multi recipients batch transfer (refer to MultiERC1155Param structure)
     */
    function multiMegaTransfer(
        MultiERC20Param calldata _erc20Params,
        MultiERC721Param calldata _erc721Params,
        MultiERC1155Param calldata _erc1155Params
    ) external {
        // Check if there are ERC20 tokens to be sent
        if (_erc20Params.tokens.length > 0) {
            this.multiBatchTransferERC20(
                _erc20Params.tokens,
                _erc20Params.recipients,
                _erc20Params.amounts
            );
        }

        // Check if there are ERC721 tokens to be sent
        if (_erc721Params.tokens.length > 0) {
            this.multiBatchTransferERC721(
                _erc721Params.tokens,
                _erc721Params.recipients,
                _erc721Params.tokenIds
            );
        }

        // Check if there are ERC1155 tokens to be sent
        if (_erc1155Params.tokens.length > 0) {
            this.multiBatchTransferERC1155(
                _erc1155Params.tokens,
                _erc1155Params.recipients,
                _erc1155Params.tokenIds,
                _erc1155Params.amounts
            );
        }
    }

    //     __________  ______   ___   ____
    //    / ____/ __ \/ ____/  |__ \ / __ \
    //   / __/ / /_/ / /       __/ // / / /
    //  / /___/ _, _/ /___    / __// /_/ /
    // /_____/_/ |_|\____/   /____/\____/

    /**
     * @notice
     *  Send multiple ERC20 to one recipient
     *
     * @param _tokens ERC20 token addresses to be sent
     * @param _recipient recipient address
     * @param _amounts amounts to be sent
     */
    function batchTransferERC20(
        address[] calldata _tokens,
        address _recipient,
        uint256[] calldata _amounts
    ) external {
        // Check that the caller is an EOA
        if (msg.sender != tx.origin) revert FORBIDDEN();

        // Check parameters correctness
        if (_tokens.length != _amounts.length) revert INVALID_PARAM();

        for (uint256 i = 0; i < _tokens.length; ++i) {
            IERC20(_tokens[i]).transferFrom(
                msg.sender,
                _recipient,
                _amounts[i]
            );
        }
    }

    /**
     * @notice
     *  Send multiple ERC20 to multiple recipients
     *
     * @param _tokens ERC20 token addresses to be sent
     * @param _recipients recipients addresses
     * @param _amounts amounts to be sent
     */
    function multiBatchTransferERC20(
        address[] calldata _tokens,
        address[] calldata _recipients,
        uint256[] calldata _amounts
    ) external {
        // Check that the caller is an EOA
        if (msg.sender != tx.origin) revert FORBIDDEN();

        // Check parameters correctness
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

    //     __________  ______   ________  ___
    //    / ____/ __ \/ ____/  /__  /__ \<  /
    //   / __/ / /_/ / /         / /__/ // /
    //  / /___/ _, _/ /___      / // __// /
    // /_____/_/ |_|\____/     /_//____/_/

    /**
     * @notice
     *  Send multiple ERC721 to one recipient
     *
     * @param _tokens ERC721 token addresses to be sent
     * @param _recipient recipient address
     * @param _tokenIds tokenIds to be sent
     */
    function batchTransferERC721(
        address[] calldata _tokens,
        address _recipient,
        uint256[] calldata _tokenIds
    ) external {
        // Check that the caller is an EOA
        if (msg.sender != tx.origin) revert FORBIDDEN();

        // Check parameters correctness
        if (_tokens.length != _tokenIds.length) revert INVALID_PARAM();

        for (uint256 i = 0; i < _tokens.length; ++i) {
            IERC721(_tokens[i]).transferFrom(
                msg.sender,
                _recipient,
                _tokenIds[i]
            );
        }
    }

    /**
     * @notice
     *  Send multiple ERC721 to multiple recipients
     *
     * @param _tokens ERC721 token addresses to be sent
     * @param _recipients recipients addresses
     * @param _tokenIds tokenIds to be sent
     */
    function multiBatchTransferERC721(
        address[] calldata _tokens,
        address[] calldata _recipients,
        uint256[] calldata _tokenIds
    ) external {
        // Check that the caller is an EOA
        if (msg.sender != tx.origin) revert FORBIDDEN();

        // Check parameters correctness
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

    //     __________  ______   __________________
    //    / ____/ __ \/ ____/  <  <  / ____/ ____/
    //   / __/ / /_/ / /       / // /___ \/___ \
    //  / /___/ _, _/ /___    / // /___/ /___/ /
    // /_____/_/ |_|\____/   /_//_/_____/_____/

    /**
     * @notice
     *  Send multiple ERC1155 to one recipient
     *
     * @param _tokens ERC1155 token addresses to be sent
     * @param _recipient recipient address
     * @param _tokenIds tokenIds to be sent
     * @param _amounts amounts to be sent
     */
    function batchTransferERC1155(
        address[] calldata _tokens,
        address _recipient,
        uint256[] calldata _tokenIds,
        uint256[] calldata _amounts
    ) external {
        // Check that the caller is an EOA
        if (msg.sender != tx.origin) revert FORBIDDEN();

        // Check parameters correctness
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

    /**
     * @notice
     *  Send multiple ERC1155 to multiple recipients
     *
     * @param _tokens ERC1155 token addresses to be sent
     * @param _recipients recipients addresses
     * @param _tokenIds tokenIds to be sent
     * @param _amounts amounts to be sent
     */
    function multiBatchTransferERC1155(
        address[] calldata _tokens,
        address[] calldata _recipients,
        uint256[] calldata _tokenIds,
        uint256[] calldata _amounts
    ) external {
        // Check that the caller is an EOA
        if (msg.sender != tx.origin) revert FORBIDDEN();

        // Check parameters correctness
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

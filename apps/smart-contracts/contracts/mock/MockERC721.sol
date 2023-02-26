// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol';

contract MockERC721 is ERC721PresetMinterPauserAutoId {
    constructor() ERC721PresetMinterPauserAutoId('Mock', 'MERC721', 'NO_URI') {}
}

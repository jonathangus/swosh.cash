// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol';

contract MockERC20 is ERC20PresetMinterPauser {
    constructor(
        string memory name,
        string memory symbol
    ) ERC20PresetMinterPauser(name, symbol) {}

    function mint(address _to, uint256 _amount) public override {
        _mint(_to, _amount);
    }
}

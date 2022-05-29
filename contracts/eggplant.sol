// SPDX-License-Identifier: MIT
pragma solidity >=0.4.0 <0.9.0;

contract EggPlant {
    // eggbasket data
    mapping(address => int) egg_basket;
    string egg_farm;

    // add eggs to a user's basket
    function eggdrop(address addr, int eggs) public {
        egg_basket[addr] += eggs;
    }

    // get eggbalance
    function eggbalance(address addr) public view returns (int) {
        return egg_basket[addr];
    }

    // add hens to egg farm
    function addhen(string calldata hen) public {
        egg_farm = hen;
    }

    // showcase eggfarm
    function eggfarm() public view returns (string memory) {
        return egg_farm;
    }
}

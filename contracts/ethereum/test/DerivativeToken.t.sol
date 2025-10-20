// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.22;

import { Test } from 'forge-std/Test.sol';
import { DerivativeToken } from "../src/token/DerivativeToken.sol";
import { IToken } from "../src/interfaces/IToken.sol";
import { ERC1967Proxy } from "@openzeppelin-contracts/proxy/ERC1967/ERC1967Proxy.sol";
import {Clones} from "@openzeppelin-contracts/proxy/Clones.sol";
import {console} from "forge-std/console.sol";

contract TestSetUp is Test {
    DerivativeToken public dt;
    address public owner = address(1906);
    address public developer = address(1907);
    address public founder = address(1908);
    address public user = address(1);

    address public liTKN1;
    address public liTKN2;
    address public liTKN3;

    function setUp() public {
        vm.startPrank(owner);
        dt = new DerivativeToken();

        liTKN1 = Clones.clone(address(dt));
        IToken(address(liTKN1)).initialize(owner, "Liquid Token1", "liTKN1", uint8(6));

        liTKN2 = Clones.clone(address(dt));
        IToken(address(liTKN2)).initialize(owner, "Liquid Token2", "liTKN2", uint8(18));

        liTKN3 = Clones.clone(address(dt));
        IToken(address(liTKN3)).initialize(owner, "Liquid Token3", "liTKN3", uint8(18));
        vm.stopPrank();
    }

    function testMetadata() public {
        string memory name = IToken(liTKN1).name();
        string memory symbol = IToken(liTKN1).symbol();
        uint8 decimals = IToken(liTKN1).decimals();

        console.log("Token Name: %s", name);
        console.log("Token Symbol: %s",symbol);
        console.log("Token Decimals: %d", decimals);

        assertEq(name, "Liquid Token1", "Wrong Token Name");
        assertEq(symbol, "liTKN1", "Wrong Token Symbol");
        assertEq(decimals, 6, "Wrong Token Decimals");
    }
}
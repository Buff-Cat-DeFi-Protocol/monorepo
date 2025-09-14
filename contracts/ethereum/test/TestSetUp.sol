// // SPDX-License-Identifier: Apache-2.0
// pragma solidity ^0.8.22;

// import { Test } from 'forge-std/Test.sol';
// import { BuffcatUpgradeable } from "../src/Buffcat.sol";
// import { ERC1967Proxy } from "@openzeppelin-contracts/proxy/ERC1967/ERC1967Proxy.sol";


// contract TestSetUp is Test {
//     BuffcatUpgradeable public buffcat;
//     address public owner = address(1906);
//     address public developer = address(1907);
//     address public founder = address(1908);
//     address public user = address(1);

//     function setUp() public {
//         vm.startPrank(owner);
//         buffcat = new BuffcatUpgradeable();
//         bytes memory data = abi.encodeWithSelector(
//             BuffcatUpgradeable.initialize.selector,
//             developer,
//             founder
//         );
//         ERC1967Proxy proxy = new ERC1967Proxy(address(buffcat), data);
//         buffcat = BuffcatUpgradeable(address(proxy));
//         vm.stopPrank();
//     }
// }
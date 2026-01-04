// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import "forge-std/Script.sol";
import "forge-std/console.sol";

interface IOwnable {
    function transferOwnership(address newOwner) external;
}

contract MultiSig is Script {
    function run() external {
        address twosideProxy = vm.envAddress("TWOSIDE_PROXY_ETH");
        uint256 ownerPrivateKey = vm.envUint("OWNER_PRIVATE_KEY");
        address ownerPublicKey = vm.addr(ownerPrivateKey);
        address multiSig = vm.envAddress("MULTI_SIG_ADDRESS");

        vm.startBroadcast(ownerPrivateKey);

        console.log("Contract: ", twosideProxy);
        console.log("Current Upgrade Authority/Owner: ", ownerPublicKey);
        console.log("MultiSig: ", multiSig);

        IOwnable(twosideProxy).transferOwnership(multiSig);

        console.log("New Upgrade Authority/Owner: ", multiSig)

        vm.stopBroadcast();
    }
}

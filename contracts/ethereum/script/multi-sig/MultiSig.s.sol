// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import "forge-std/Script.sol";
import "forge-std/console.sol";

interface IOwnable {
    function owner() external view returns (address);
    function transferOwnership(address newOwner) external;
}

contract MultiSig is Script {
    function run() external {
        address twosideProxy = vm.envAddress("TWOSIDE_PROXY_BASE");
        uint256 ownerPrivateKey = vm.envUint("OWNER_PRIVATE_KEY");
        address signerAddress = vm.addr(ownerPrivateKey);
        address multiSig = vm.envAddress("MULTI_SIG_ADDRESS");

        console.log("Proxy address: ", twosideProxy);
        console.log("Signing address (derived from private key): ", signerAddress);
        console.log("Multisig address: ", multiSig);

        // read current owner (no broadcast required)
        address currentOwner = IOwnable(twosideProxy).owner();
        console.log("On-chain owner: ", currentOwner);

        // sanity check: only proceed if the signing key is the current owner
        require(currentOwner == signerAddress, "Signer is not the current owner");

        vm.startBroadcast(ownerPrivateKey);

        IOwnable(twosideProxy).transferOwnership(multiSig);

        address newOwner = IOwnable(twosideProxy).owner();
        console.log("New Upgrade Authority/Owner: ", newOwner);

        vm.stopBroadcast();
    }
}

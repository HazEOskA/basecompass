// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console} from "forge-std/Script.sol";
import {BaseCompassCheckIn} from "../src/BaseCompassCheckIn.sol";

/// @notice Deploy script for BaseCompassCheckIn.
/// @dev Reads the deployer key from the PRIVATE_KEY env var.
contract Deploy is Script {
    function run() external returns (BaseCompassCheckIn deployed) {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerKey);
        deployed = new BaseCompassCheckIn();
        vm.stopBroadcast();

        console.log("BaseCompassCheckIn deployed at:", address(deployed));
    }
}

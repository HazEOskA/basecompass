// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {BaseCompassCheckIn} from "../src/BaseCompassCheckIn.sol";

contract BaseCompassCheckInTest is Test {
    BaseCompassCheckIn internal checkin;

    // Local copy of the event signature so we can assert emission.
    event CheckedIn(address indexed user, string route, uint256 timestamp);

    function setUp() public {
        checkin = new BaseCompassCheckIn();
    }

    function test_CheckIn_IncrementsCount() public {
        assertEq(checkin.checkInCount(address(this)), 0);

        checkin.checkIn("roadmap");
        assertEq(checkin.checkInCount(address(this)), 1);

        checkin.checkIn("roadmap");
        assertEq(checkin.checkInCount(address(this)), 2);
    }

    function test_CheckIn_EmitsEvent() public {
        // Check indexed `user` and the non-indexed data (route, timestamp).
        vm.expectEmit(true, false, false, true);
        emit CheckedIn(address(this), "builders", block.timestamp);
        checkin.checkIn("builders");
    }

    function test_CheckIn_TracksCountsPerUser() public {
        address alice = makeAddr("alice");
        address bob = makeAddr("bob");

        vm.prank(alice);
        checkin.checkIn("route-a");

        vm.prank(bob);
        checkin.checkIn("route-b");
        vm.prank(bob);
        checkin.checkIn("route-b");

        assertEq(checkin.checkInCount(alice), 1);
        assertEq(checkin.checkInCount(bob), 2);
        assertEq(checkin.checkInCount(address(this)), 0);
    }

    function testFuzz_CheckIn_IncrementsByOne(string calldata route, uint8 times) public {
        vm.assume(times > 0);
        for (uint256 i = 0; i < times; i++) {
            checkin.checkIn(route);
        }
        assertEq(checkin.checkInCount(address(this)), times);
    }
}

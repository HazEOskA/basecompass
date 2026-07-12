// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title BaseCompassCheckIn
/// @notice Minimal onchain proof layer for BaseCompass. A user "checks in"
///         against a named route, producing a permanent onchain record
///         (an event + an incrementing per-user counter). No tokens, NFTs,
///         payments, DAO or backend — just verifiable proof of activity.
contract BaseCompassCheckIn {
    /// @notice Emitted every time a user checks in on a route.
    /// @param user The address that checked in.
    /// @param route A free-form label for the route/mission checked in on.
    /// @param timestamp The block timestamp of the check-in.
    event CheckedIn(address indexed user, string route, uint256 timestamp);

    /// @notice Total number of check-ins performed by each address.
    mapping(address => uint256) public checkInCount;

    /// @notice Record an onchain check-in for the caller on a given route.
    /// @param route A free-form label describing the route/mission.
    function checkIn(string calldata route) external {
        checkInCount[msg.sender] += 1;
        emit CheckedIn(msg.sender, route, block.timestamp);
    }
}

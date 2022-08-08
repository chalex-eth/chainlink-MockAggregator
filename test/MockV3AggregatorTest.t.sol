// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/MockV3Aggregator.sol";

contract MockV3AggregatorTest is Test {
    MockV3Aggregator oracle;

    function setUp() public {
        oracle = new MockV3Aggregator(8);
    }

    function testSetUp() public {
        uint256[] memory oracleData = oracle.getOracleData();
        assertEq(uint256(oracle.latestAnswer()), oracleData[0]);
        assertEq(oracle.latestRound(), 1);
        console.log(uint256(oracle.latestAnswer()));
    }

    function testUpdateState() public {
        uint256[] memory oracleData = oracle.getOracleData();
        oracle.updateAnswer();
        assertEq(uint256(oracle.latestAnswer()), oracleData[1]);
        assertEq(oracle.latestRound(), 2);
    }

    function testUpdateState(uint256 nJump) public {
        vm.assume(nJump > 1);
        vm.assume(nJump < 350);
        for (uint256 i = 0; i < nJump; i++) {
            oracle.updateAnswer();
        }
        uint256[] memory oracleData = oracle.getOracleData();
        assertEq(uint256(oracle.latestAnswer()), oracleData[nJump]);
        assertEq(oracle.latestRound(), nJump + 1);
    }
}

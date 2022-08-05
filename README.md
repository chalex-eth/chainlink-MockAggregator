# <h1 align="center"> MockOracle </h1>

**Fetch historical price from CoinGecko and fed these data in the MockOracle contract** 

## Installation

```
forge install chalex-eth/chainlink-MockAggregator
```

## Usage

1. Add this import to your script or test:

```solidity
import "chainlink-MockAggregator/MockAggregatorV3.sol";
```

In the ```lib/chainlink-MockOracle ``` run ```npm install``` in order to install the dependencies required for ```dataRequest.js```

2. How to use in your contract:

```solidity

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "chainlink-MockAggregator/MockV3Aggregator.sol";

contract ContractTest is Test {
    MockV3Aggregator oracle;

    function setUp() public {
        oracle = new MockV3Aggregator(8,"lib/chainlink-MockAggregator/dataRequest.js", "ethereum");
    }

    function testExample() public {
        console.log(uint256(oracle.latestAnswer()));
        assertTrue(true);
    }
}
```

Then run 

```forge test --ffi -vv```

When creating a new contract you have to parse 3 arguments 

``` oracle = new MockV3Aggregator(8,"lib/chainlink-MockAggregator/dataRequest.js", "ethereum"); ```


The first one is the number of digits, second one is the path to the file that the ffi cheatcode will execute, the third one is the asset to fetch from coingecko.

3. Get the data inside your testing env:


```solidity
// Get the current price
uint256 price = oracle.latestAnswer();

// Move into the next price
oracle.updateAnswer();

```


## Note

This repo provide a ```dataRequest.js``` file that perform a basic fetching from coingecko, this script can be modify in order to fetch any data. As long the output is given as an ```uint256[]``` abi-encoded the code will works (```const encodedData = ethers.utils.defaultAbiCoder.encode(["uint256[]"], [prices])```).

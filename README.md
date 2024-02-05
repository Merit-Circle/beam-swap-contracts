# BeamSwap contracts

Uniswap V2 protocol

## Deploy contracts

UniswapV2Factory, UniswapV2Router02, WETH and Multicall

```bash
npx hardhat --network beam deploy
```

(edit `deploy.ts` to disable unnecessary contract deployments)

## Verify contracts with Sourcify

```bash
npx hardhat --network beam verify-sourcify --contract "WETH" --address 0x12345...
npx hardhat --network beam verify-sourcify --contract "Multicall" --address 0x12345...

npx hardhat --network beam verify-sourcify --contract "UniswapV2Factory" --path "core" --address 0x12345...
npx hardhat --network beam verify-sourcify --contract "UniswapV2Router02" --path "periphery" --address 0x12345...
```

### Verify new pairs

```bash
npx hardhat --network beam verify-sourcify --contract "UniswapV2Pair" --path "core" --address 0x12345...
```

## Verify contracts with Etherscan & Blockscout

Check your `hardhat.config > etherscan` and add an API key and custom chain if necessary.

The first argument for `hardhat verify` is the contract's address, followed by the constructor args:

```bash
# UniswapV2Factory - arg: admin wallet
npx hardhat --network imtblZkevm verify 0xB519520A9163dEf547c77892A91c83E9e66e8762 0xbFb53a2c470cdb4FF32eE4F18A93B98F9f55D0E1

# Uniswap Router - args: factory address, WETH address
npx hardhat --network imtblZkevm verify 0x4d4dA82c00d1288e2997739D130E31c2c9Db402b 0xB519520A9163dEf547c77892A91c83E9e66e8762 0x3a0c2ba54d6cbd3121f01b96dfd20e99d1696c9d
```

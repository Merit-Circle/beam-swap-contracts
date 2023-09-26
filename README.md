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

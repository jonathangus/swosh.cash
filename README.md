# SWOSH.CASH - making token transfers smooth

Making token transfers efficient, easy while and not reliant on centralized players. Based on more than 100 conducted interviews we've realized there is an issue with transfering tokens, especially NFTs. Respondents usually use one of the marketplaces, their mobile wallet or real die hard people go via etherscan. This come's with a couple of important challenges, it takes a lot of time, a lot of calls and users don't get a good overview of what is happening. 

-We’ve created an optimised way to transfer any tokens (ERC 20/721/1155) and added smartness to either batch transactions of multiple tokens or individual sends. A decentralized, smart and optimised way to move assets smoothly. 


# Sponsor & Bounties
### Covalent
Fetching the asset data of ERC 20/721/1155 across all swosh.cash supported chains via Covalent unified API. One challenge we had was that we were not possible to get metadata because we had to use no-nft-fetch=true but a great support for multichain dapps.

### Lens
integrated Lens following used as an address book to easily find recipients for your token transfers. Almost like a Lens-transfer ;) 

### Open zeppelin defender 
goerli	Goerli                  Faucet Deployer	0x4809c3d61fa5cdfcb91a065368d67a3dfc03423a
optimism goerli	Optimism Goerli Faucet Deployer	0x826dc5cabf29eb88fe821d4315210104d46e46d1
arbitrum goerli	Arbitrum Goerli Faucet Deployer	0x393bf480cf88688df32eb17b0d3d55be9f8bc43c
mumbai	Mumbai                  Faucet Deployer	0xdc2c63f60c1b3ca6765e4f50c827f925d05b84c3

Openzeppelin Defender Deployment scripts

[https://github.com/jonathangus/eth-denver-hackathon/blob/main/apps/smart-contracts/scripts/deploy/defender/defender-deploy-mockERC20.ts](https://github.com/jonathangus/eth-denver-hackathon/blob/main/apps/smart-contracts/scripts/deploy/defender/defender-deploy-mockERC20.ts)

[https://github.com/jonathangus/eth-denver-hackathon/blob/main/apps/smart-contracts/scripts/deploy/defender/defender-deploy-mockERC721.ts](https://github.com/jonathangus/eth-denver-hackathon/blob/main/apps/smart-contracts/scripts/deploy/defender/defender-deploy-mockERC721.ts)

[https://github.com/jonathangus/eth-denver-hackathon/blob/main/apps/smart-contracts/scripts/deploy/defender/defender-deploy-mockERC1155.ts](https://github.com/jonathangus/eth-denver-hackathon/blob/main/apps/smart-contracts/scripts/deploy/defender/defender-deploy-mockERC1155.ts)`

<img width="700" alt="Screenshot 2023-03-04 at 14 49 04" src="https://user-images.githubusercontent.com/42701407/222931434-7699cf73-3348-4c1d-ad8d-7f3f5e6b9e02.png">

## Future is multichain!
### Polygon

### Base

### Scroll 


### Swosh Contracts Address Registry
** base goerli
0x3A193aC8FcaCCDa817c174D04081C105154a8441
https://goerli.basescan.org/address/0x3A193aC8FcaCCDa817c174D04081C105154a8441

** scroll alphanet
0x3A193aC8FcaCCDa817c174D04081C105154a8441
https://blockscout.scroll.io/address/0x3A193aC8FcaCCDa817c174D04081C105154a8441

** mumbai
0x3A193aC8FcaCCDa817c174D04081C105154a8441
https://mumbai.polygonscan.com/address/0x3A193aC8FcaCCDa817c174D04081C105154a8441
**goerli
0x3A193aC8FcaCCDa817c174D04081C105154a8441
https://goerli.etherscan.io/address/0x3A193aC8FcaCCDa817c174D04081C105154a8441
** optimism goerli
0x3A193aC8FcaCCDa817c174D04081C105154a8441
https://goerli-optimism.etherscan.io/address/0x3A193aC8FcaCCDa817c174D04081C105154a8441
** arbitrum goerli
0x3A193aC8FcaCCDa817c174D04081C105154a8441
https://goerli.arbiscan.io/address/0x3A193aC8FcaCCDa817c174D04081C105154a8441









# Web3 fullstack starter

My ideal monorepo setup for working with fullstack web3 development. Can be used for quick prototyping or built on top on for production ready projects.

### Core packages
- `ethers`
- `wagmi`
- `hardhat`
- `next.js`
- `typechain`

### Features?
- built on top of wagmi (❤️) with recognisable api
- write and read hooks are typesafe
- sync deployments to frontend so you dont manually have to update addresses
- no theming or css 


### Apps and Packages
- `web`: another [Next.js](https://nextjs.org) app
- `smart-contracts`: smart contracts with hardhat
- `web3-config`: deployments, generated types from contract and common web3 config
- `ui`: a stub React component library shared by both `web` and `docs` applications
- `config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Setup
Install dependencies by running `yarn`

### Development
To run local development run:
```
yarn dev
```

### Build

To build all apps and packages, run the following command:

```
yarn build
```

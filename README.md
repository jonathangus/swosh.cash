# SWOSH.CASH - making token transfers smooth

Making token transfers efficient, easy while and not reliant on centralized players. Based on more than 100 conducted interviews we've realized there is an issue with transfering tokens, especially NFTs. Respondents usually use one of the marketplaces, their mobile wallet or real die hard people go via etherscan. This come's with a couple of important challenges, it takes a lot of time, a lot of calls and users don't get a good overview of what is happening. 

-We’ve created an optimised way to transfer any tokens (ERC 20/721/1155) and added smartness to either batch transactions of multiple tokens or individual sends. A decentralized, smart and optimised way to move assets smoothly. 


# Sponsor & Bounties
### Covalent
Fetching the asset data of ERC 20/721/1155 across all swosh.cash supported chains via Covalent unified API. One challenge we had was that we were not possible to get metadata because we had to use no-nft-fetch=true but a great support for multichain dapps.

### Lens
integrated Lens following used as an address book to easily find recipients for your token transfers. Almost like a Lens-transfer ;) 


## Future is multichain!
### Polygon
The future of the Ethereum ecosystem is multichain, and polygon has a proven track record of bringing in fast and cheap transaction and a thriving community. Being the home to Lens and newly moved Yoots it’s a chain that would benefit greately from a new and easy way to transfer tokens around community members and for offloading from hot to cold storage.

We want to push this tool on Polygon because the massive community and we believe that we can satisfy its needs! By delivering a better UX and empowering NFT communitys with easier transfers. 



### Base
Simple and smooth deployment, we also created a faucet for people to easily get their hands on their first BASE NFT via https://swosh.cash/faucet
to also help the future base devs to be up and running to try with free mint ERC 20/721/1155.

### Scroll 
Great experience of Scroll alphanet: open the docs, check the rpc and we we're done! Only challenge we had was that scroll is not supported by wagmi so we had some small issues with the config. We're strong believers in the growth of scroll zkEVM with lower cost+shorter block times and higher throughput! Looking forward for a etherscan block explorer. Deployed on Scroll as well as integrated with lens! Scroll ♥ Lens | Cross-chain Decentralized Social Media





### Infura
Even though we tried getting access to the Infura NFT API throughout the hackathon we didn't get access. However, we believe it could be a great complement in getting access to NFT data and not having a single point of failure would be beneficial. 


### Open zeppelin defender 
| Chain           | Name                            | Address                                    |
| --------------- | ------------------------------- | ------------------------------------------ |
| optimism goerli | Optimism Goerli Faucet Deployer | 0x4809c3d61fa5cdfcb91a065368d67a3dfc03423a |
| optimism goerli | Optimism Goerli Faucet Deployer | 0x826dc5cabf29eb88fe821d4315210104d46e46d1 |
| arbitrum goerli | Arbitrum Goerli Faucet Deployer | 0x393bf480cf88688df32eb17b0d3d55be9f8bc43c |
| mumbai          | Mumbai Faucet Deployer          | 0xdc2c63f60c1b3ca6765e4f50c827f925d05b84c3 |


Openzeppelin Defender Deployment scripts

[https://github.com/jonathangus/eth-denver-hackathon/blob/main/apps/smart-contracts/scripts/deploy/defender/defender-deploy-mockERC20.ts](https://github.com/jonathangus/eth-denver-hackathon/blob/main/apps/smart-contracts/scripts/deploy/defender/defender-deploy-mockERC20.ts)

[https://github.com/jonathangus/eth-denver-hackathon/blob/main/apps/smart-contracts/scripts/deploy/defender/defender-deploy-mockERC721.ts](https://github.com/jonathangus/eth-denver-hackathon/blob/main/apps/smart-contracts/scripts/deploy/defender/defender-deploy-mockERC721.ts)

[https://github.com/jonathangus/eth-denver-hackathon/blob/main/apps/smart-contracts/scripts/deploy/defender/defender-deploy-mockERC1155.ts](https://github.com/jonathangus/eth-denver-hackathon/blob/main/apps/smart-contracts/scripts/deploy/defender/defender-deploy-mockERC1155.ts)`

<img width="500" alt="Screenshot 2023-03-04 at 14 49 04" src="https://user-images.githubusercontent.com/42701407/222931434-7699cf73-3348-4c1d-ad8d-7f3f5e6b9e02.png">


### Swosh Contracts Address Registry
| Chain           | Address                                    | Explorer                                                                                |
| --------------- | ------------------------------------------ | --------------------------------------------------------------------------------------- |
| base goerli     | 0x3A193aC8FcaCCDa817c174D04081C105154a8441 | https://goerli.basescan.org/address/0x3A193aC8FcaCCDa817c174D04081C105154a8441          |
| scroll alphanet | 0x3A193aC8FcaCCDa817c174D04081C105154a8441 | https://blockscout.scroll.io/address/0x3A193aC8FcaCCDa817c174D04081C105154a8441         |
| mumbai          | 0x3A193aC8FcaCCDa817c174D04081C105154a8441 | https://mumbai.polygonscan.com/address/0x3A193aC8FcaCCDa817c174D04081C105154a8441       |
| goerli          | 0x3A193aC8FcaCCDa817c174D04081C105154a8441 | https://goerli.etherscan.io/address/0x3A193aC8FcaCCDa817c174D04081C105154a8441          |
| optimism goerli | 0x3A193aC8FcaCCDa817c174D04081C105154a8441 | https://goerli-optimism.etherscan.io/address/0x3A193aC8FcaCCDa817c174D04081C105154a8441 |
| arbitrum goerli | 0x3A193aC8FcaCCDa817c174D04081C105154a8441 | https://goerli.arbiscan.io/address/0x3A193aC8FcaCCDa817c174D04081C105154a8441           |







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

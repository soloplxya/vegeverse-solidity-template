# Vegeverse backend build with Solidity and Hardhat [![Open in Gitpod][gitpod-badge]][gitpod] [![Github Actions][gha-badge]][gha] [![Hardhat][hardhat-badge]][hardhat] [![License: MIT][license-badge]][license] (Adapted from Paulrberg/hardhat-template) 

[gitpod]: https://gitpod.io/#https://github.com/soloplxya/vegeverse-solidity-template
[gitpod-badge]: https://img.shields.io/badge/Gitpod-Open%20in%20Gitpod-FFB45B?logo=gitpod
[gha]: https://github.com/soloplxya/vegeverse-solidity-template/actions
[gha-badge]: https://github.com/soloplxya/vegeverse-solidity-template/actions/workflows/ci.yml/badge.svg
[hardhat]: https://hardhat.org/
[hardhat-badge]: https://img.shields.io/badge/Built%20with-Hardhat-FFDB1C.svg
[license]: https://opensource.org/licenses/MIT
[license-badge]: https://img.shields.io/badge/License-MIT-blue.svg

## Usage

Deploy the contracts in this repository and leave the terminal running before running the front end.

### Pre Requisites

Proceed with installing dependencies:

```sh
$ yarn install
```

### Compile

Compile the smart contracts with Hardhat:

```sh
$ yarn compile
```

### Test

Run the tests with Hardhat:

```sh
$ npx hardhat test
```

### Deploy
```sh
$ yarn hardhat node
```

## License

[MIT](./LICENSE.md) © Paul Razvan Berg

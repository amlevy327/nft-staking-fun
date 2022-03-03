require("@nomiclabs/hardhat-waffle");

module.exports = {
solidity: {
  version: "0.8.11",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
},
defaultNetwork: "hardhat",
networks: {
  hardhat: {},
  // localhost: {
  //   url: "http://127.0.0.1:8545",
  // },
  // rinkeby: {
  //   url: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
  //   accounts: [`0x${PRIVATE_KEY}`],
  // },
  // ropsten: {
  //   url: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
  //   accounts: [`0x${PRIVATE_KEY}`],
  // },
  // goerli: {
  //   url: `https://goerli.infura.io/v3/${INFURA_PROJECT_ID}`,
  //   accounts: [`0x${PRIVATE_KEY}`],
  // },
  // mumbai: {
  //   url: `https://rpc-mumbai.maticvigil.com`,
  //   accounts: [`0x${PRIVATE_KEY}`],
  // },
  // matic: {
  //   url: `https://rpc-mainnet.matic.network`,
  //   accounts: [`0x${PRIVATE_KEY}`],
  // },
  // mainnet: {
  //   url: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
  //   accounts: [`0x${PRIVATE_KEY}`],
  // },
},
// gasReporter: {
//   enabled: true,
//   currency: "USD",
//   gasPrice: 191,
//   coinmarketcap: "1c271ec0-7f68-4a2e-8de8-a02ed581f9e2",
// },
// etherscan: {
//   // Your API key for Etherscan
//   // Obtain one at https://etherscan.io/
//   //apiKey: "AJW2IUZJ9QRD91SNV9WF7HYHAQ5KPFS5B2",
// },
};
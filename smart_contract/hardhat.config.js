require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten : {
      url: 'https://ropsten.infura.io/v3/4030bc8551ab40c3b6797e519e615a25',
      accounts: ['1b7ac1ee5274d7eb389fbd20a2b83cdcb22ba60afbdeeff46ace5beacb8e6fbc']
    },
    // rinkeby :{
    //   url: 'https://eth-mainnet.alchemyapi.io/v2/JtQouFGLXpn7ypUDwIjb1Pf33VZEwE7X',
    //   accounts: ['1b7ac1ee5274d7eb389fbd20a2b83cdcb22ba60afbdeeff46ace5beacb8e6fbc']
    // }
  }
};
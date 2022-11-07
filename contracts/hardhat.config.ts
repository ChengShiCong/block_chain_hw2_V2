import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    ganache: {
      // rpc url, change it according to your ganache configuration
      url: 'HTTP://127.0.0.1:8545',
      // the private key of signers, change it according to your ganache user 10
      accounts: [
        '0x3aa573eab6da7077d85294c0c859d10a3f93774d89108d6b4acaa4b5e09a92a4',
        '0x639db6021fb9300ecdf9e4b7e2dc81412db0681f98b63d3049f3728ef15238ae',
        '0x78f4634f5c9532457615da1103602f5e5867f816f432014e2bc38dab0a516b49',
        '0x510a03f0271d86c34d2157778cac986e8610acbf81ad8e5b8d301fed4a43d1eb',
        '0x3b55b3f03b1f51545ff45ad4d3c73e6a6ddd3a1aaf8b54223897ee20a9aa465a',
        '0x3122c7cf9862dca3611487b05138f5b9fe1a1cc70c9825a7bcad53db83130b13',
        '0xca0cce98ab794c8d2030b65ffec260510867767c46881aa3d0faeac140b9c803',
        '0x843f971ca39e112cc34f988faac9753e182f89347fea3585a7d457239c1e086f',
        '0x9488eff7ffd1d937a48463385d86ae497aea833c929ee0cb5bd083cbbbeb76a4',
        '0x1b639c5ee90cf2f5768b4b43d4b7ce2233d50ca4f83fed2309b9d1ce18f2e130'
      ]
    },
  },
};

export default config;

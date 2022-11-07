import Addresses from './contract-address.json'
import MyERC20 from './abis/MyERC20.json'
import DAO from './abis/StudentSocietyDAO.json'
const Web3 = require('web3');
//@ts-ignore
let web3 = new Web3(window.web3.currentProvider)


const DAOAddress = Addresses.StudentSocietyDAO
const DAOABI = DAO.abi
const erc20Address = Addresses.studentERC20
const erc20ABI = MyERC20.abi


const DAOContract = new web3.eth.Contract(DAOABI, DAOAddress);
const sErc20Contract = new web3.eth.Contract(erc20ABI,erc20Address);


export {web3, DAOContract ,sErc20Contract}
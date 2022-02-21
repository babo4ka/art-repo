import Web3 from "web3";

export const web3 = new Web3("https://speedy-nodes-nyc.moralis.io/9fcfea6f5970d20ff23ae056/eth/rinkeby");

const contractABI = require("../contract_abi.json");
const contractAddress = "0xfAB98F673273eFcA35A5e83C63758375ee31eC3D";


export const mint = async (cost)=>{
  const chainId = await window.ethereum.request({ method: 'eth_chainId' });

  // if(chainId != 4){
  //   return{ 
  //     success:false,
  //     status: "Switch to Rinkeby test network"
  //   }
  // }

  window.contract = await new web3.eth.Contract(contractABI, contractAddress);

  cost = web3.utils.toWei(cost.toString() , "ether");

  let gasLimit = 285000;

  const transactionParams = {
    gasLimit:String(gasLimit),
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.contract.methods.mint().encodeABI(),//make call to NFT smart contract 
    value:parseInt(cost).toString(16),
  };

  try{
    const txHash = await window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [transactionParams]
      });
    
      return{
        success:true,
        status: "Thanks for buying my picture! Go check it on Opensea!"
      }

  }catch (error){
    return{
      success:false,
      status: "You couldn't buy my picture :( " + error.message
    }
  }

}

export const getMaxSupply = async()=>{
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);
  const maxSupply = await window.contract.methods.maxSupply().call();

  return{
    maxSupply:maxSupply
  }
}

export const getTotalSupply = async()=>{
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);
  const totalSupply = await window.contract.methods.totalSupply().call();

  return{
    totalSupply:totalSupply
  }
}
 


export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "Wallet connected!",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: err.message,
      };
    }
  } else {
    return {
      address: "",
      status: "Install Metamask",
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "",
        };
      } else {
        return {
          address: "",
          status: "",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: err.message,
      };
    }
  } else {
    return {
      address: "",
      status: "Install Metamask",
    };
  }
};
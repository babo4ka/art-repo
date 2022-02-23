import Web3 from "web3";

export const web3 = new Web3("https://speedy-nodes-nyc.moralis.io/9fcfea6f5970d20ff23ae056/polygon/mainnet");

const contractABI = require("../contract_abi.json");
const contractAddress = "0xac2a5faa633d7b715a5835645492f763fc7272b3";


export const mint = async (cost)=>{
  if(cost < 1){
    return{
      success:false,
      status: "Please, buy it at least for 1 MATIC :("
    }
  }

  const chainId = await window.ethereum.request({ method: 'eth_chainId' });

  if(chainId != 137){
    return{ 
      success:false,
      status: "Switch to Polygon Mainnet"
    }
  }
  

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
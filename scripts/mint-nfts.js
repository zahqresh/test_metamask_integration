const alchemyKey = "wss://eth-ropsten.alchemyapi.io/v2/B4I1sdUEuWdtrfniRgA_kln3ZKk8oay1";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

const contractABI = require("../HipstersNFT.json");
const contractAddress = "0xa22D37557132AAe8840a0f62ED8089A7d744b6f1";

export const hipsterContract = new web3.eth.Contract(
  contractABI["abi"],
  contractAddress
);

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
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
          status: "👆🏽 Write a message in the text-field above.",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const mintHipster = async (tokenURI, number) => {

  const transactionParameters = {
   to: contractAddress,
   from: window.ethereum.selectedAddress,
   data: hipsterContract.methods.mintHipster(window.ethereum.selectedAddress).encodeABI()
 };

 try {
   const txHash = await window.ethereum.request({
     method: "eth_sendTransaction",
     params: [transactionParameters],
   });
   return {
     success: true,
     status:
       "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
       txHash,
   };
 } catch (error) {
   return {
     success: false,
     status: "😥 Something went wrong: " + error.message,
   };
 }
}

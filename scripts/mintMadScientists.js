
const price = 40000000000000000;

const theContract = new web3.eth.Contract(theABI, contractAddress);

const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      };
      $(".alert").hide();
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    $(".alert").text("Please install metamask!");
  }
};

const getCurrentWalletConnected = async () => {
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
        $(".alert").text(
          " Connect Metamask using top right button please!"
        );
      }
    } catch (err) {
      $(".alert").text(
        `${err.message}`
      );
    }
  } else {
    $(".alert").text(
      " You must install Metamask, a virtual Ethereum wallet, in your browser."
    );
  }
};

const mintNFT = async () => {
  // const nonce = await web3.eth.getTransactionCount(window.ethereum.selectedAddress, 'latest');
  //load smart contract
  window.contract = new web3.eth.Contract(theABI, contractAddress);

  // prepare the data for the mint call on smart contract
  const transactionParameters = {
    from: window.ethereum.selectedAddress,
    to: contractAddress,
    value: web3.utils.toHex(price),
    data: theContract.methods.mint(web3.utils.toBN(1)).encodeABI(),
  };
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    $(".alert").show();
    $(".alert").text(
      "✅ Check out your transaction on Etherscan: https://rinkeby.etherscan.io/tx/" +
        txHash
    );
  } catch (error) {
    window.alert(error.message);
    //return {

    //  success: false,
    //  status: "😥 Something went wrong: " + error.message,
  }
};

const PreSaleMint = async () => {
  // const nonce = await web3.eth.getTransactionCount(window.ethereum.selectedAddress, 'latest');
  //load smart contract
  window.contract = new web3.eth.Contract(theABI, contractAddress);

  // prepare the data for the mint call on smart contract
  const transactionParameters = {
    from: window.ethereum.selectedAddress,
    to: contractAddress,
    value: web3.utils.toHex(price),
    data: theContract.methods.preSaleMint().encodeABI(),
  };
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    $(".alert").show();
    $(".alert").text(
      "✅ Check out your transaction on Etherscan: https://rinkeby.etherscan.io/tx/" +
        txHash
    );
  } catch (error) {
    window.alert(error.message);
  }
};

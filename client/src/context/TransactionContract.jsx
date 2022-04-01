import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constant";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = async () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const TransactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  // const transactionHash = await TransactionContract.addToBlockChain(
  // "0x884FE693CdeCdfFb7413c59598707643926D5d71",
  //   "1",
  //   "hi",
  //   "hi"
  // );
  // console.log(transactionHash);
  console.log("TransactionContract", await TransactionContract.getAllTrans());

  return TransactionContract;
};


export const TransactionProvider = ({ children }) => {
  const [currentAcc, setCurrentAcc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    console.log(formData);
  };

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = await getEthereumContract();

        const availableTransactions = await transactionsContract.getAllTrans();

        const structuredTransactions = availableTransactions.map(
          (transaction) => ({
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: new Date(
              transaction.timestamp.toNumber() * 1000
            ).toLocaleString(),
            message: transaction.message,
            keyword: transaction.keyword,
            amount: parseInt(transaction.amount._hex) / 10 ** 18,
          })
        );

        console.log(structuredTransactions);

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    if (!ethereum) return alert("Please Install Metamask");
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length > 0) {
      setCurrentAcc(accounts[0]);
      getAllTransactions();
    }
    return false;
  };

  const sendTransaction = async () => {
    try {
      if (ethereum) {
        const { addressTo, amount, keyword, message } = formData;
        // if (currentAcc === []) return alert("Connect your Metamask fist");
        const transactionContract = await getEthereumContract();
        const parsedAmount = ethers.utils.parseEther(amount);
        // await ethereum.request({
        //   method: "eth_sendTransaction",
        //   params: [
        //     {
        //       from: currentAcc,
        //       to: addressTo,
        //       gas: "0x5208", //21000 Gwei
        //       value: parsedAmount._hex,
        //     },
        //   ],
        // });
        const transactionHash = await transactionContract.addToBlockChain(
          addressTo,
          parsedAmount,
          message,
          keyword
        );
        console.log(transactionHash);
        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);
        const transactionCount = await transactionContract.getCountTrans();
        setTransactionCount(transactionCount.toNumber());
        console.log(transactionCount);
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length) {
        setCurrentAcc(accounts[0]);
        window.location.reload();
      } else {
        console.log("No account found");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ETH object.");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    getEthereumContract();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAcc,
        checkIfWalletIsConnected,
        handleChange,
        formData,
        sendTransaction,
        setFormData,
        isLoading,
        transactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

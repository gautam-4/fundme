import React, { useEffect, useState, createContext } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const FundMeContext = createContext();

const { ethereum } = window;

const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const fundMeContract = new ethers.Contract(contractAddress, contractABI, signer);

    return fundMeContract;
};

export const FundMeProvider = ({ children }) => {
    const [formData, setFormData] = useState({amount: "", message:""});
    const [currentAccount, setCurrentAccount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [fundCount, setFundCount] = useState(localStorage.getItem("fundCount"));
    const [fundHistory, setFundHistory] = useState([]);

    const handleChange  = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const getAllFunds = async () => {
        try {
            if (ethereum) {
                const fundMeContract = createEthereumContract();
        
                const availableFundHistory = await fundMeContract.getFundHistory();
        
                const structuredFundHistory = availableFundHistory.map((fund) => ({
                  addressFrom: fund.sender,
                  timestamp: new Date(fund.timestamp.toNumber() * 1000).toLocaleString(),
                  message: fund.message,
                  amount: parseInt(fund.amount._hex) / (10 ** 18)
                }));
        
                console.log(structuredFundHistory);
        
                setFundHistory(structuredFundHistory);
            } else {
                console.log("Ethereum is not present");
              }
        } catch (error) {
            console.log(error);
        }
    }

    const checkIfWalletIsConnect = async () => {
        try {
          if (!ethereum) return alert("Please install MetaMask.");
    
          const accounts = await ethereum.request({ method: "eth_accounts" });
    
          if (accounts.length) {
            setCurrentAccount(accounts[0]);
    
            getAllFunds();
          } else {
            console.log("No accounts found");
          }
        } catch (error) {
          console.log(error);
        }
      };

      const connectWallet = async () => {
        try {
          if (!ethereum) return alert("Please install MetaMask.");
    
          const accounts = await ethereum.request({ method: "eth_requestAccounts", });
    
          setCurrentAccount(accounts[0]);
          console.log('connected to wallet')
          window.location.reload();
        } catch (error) {
          console.log(error);
    
          throw new Error("No ethereum object");
        }
      };

      const checkIfFundsExists = async () => {
        try {
          if (ethereum) {
            const fundMeContract = createEthereumContract();
            const currentFundCount = await fundMeContract.getFundCount();
    
            window.localStorage.setItem("fundCount", currentFundCount);
          }
        } catch (error) {
          console.log(error);
    
          throw new Error("No ethereum object");
        }
      };

      const sendFund = async () => {
        try {
          if (ethereum) {
            const { amount,message } = formData;
            const fundMeContract = createEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);
            
            const transactionHash = await fundMeContract.fund(message, {
                from: currentAccount,
                value: parsedAmount._hex,
                gasLimit: ethers.utils.hexlify(21000),
            });
    
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            console.log(`Success - ${transactionHash.hash}`);
            setIsLoading(false);
    
            const fundCount = await fundMeContract.getFundCount();
    
            setFundCount(fundCount.toNumber());
            window.location.reload();
          } else {
            console.log("No ethereum object");
          }
        } catch (error) {
          console.log(error);
    
          throw new Error("No ethereum object");
        }
      };

      useEffect(() => {
        checkIfWalletIsConnect();
        checkIfFundsExists();
      }, [fundCount]);
    
      return (
        <FundMeContext.Provider
          value={{
            fundCount,
            connectWallet,
            fundHistory,
            currentAccount,
            isLoading,
            sendFund,
            handleChange,
            formData,
          }}
        >
          {children}
        </FundMeContext.Provider>
      );

}
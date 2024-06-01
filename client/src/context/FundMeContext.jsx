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
    const [formData, setFormData] = useState({ amount: "", message: "" });
    const [currentAccount, setCurrentAccount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [fundCount, setFundCount] = useState(0);
    const [fundHistory, setFundHistory] = useState([]);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const getAllFunds = async () => {
        try {
            if (ethereum) {
                const fundMeContract = createEthereumContract();
                const availableFundHistory = await fundMeContract.getFundHistory();

                const structuredFundHistory = availableFundHistory.map((fund) => ({
                    addressFrom: fund.From,
                    amount: ethers.utils.formatEther(fund.amount._hex),
                    message: fund.message,
                    timestamp: new Date(fund.timestamp.toNumber() * 1000).toLocaleString(),
                }));

                setFundHistory(structuredFundHistory);
            } else {
                console.log("Ethereum is not present");
            }
        } catch (error) {
            console.log(error);
        }
    };

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

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });

            setCurrentAccount(accounts[0]);
            window.location.reload();
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    };

    const sendFund = async () => {
        try {
            if (!ethereum) return console.log("No ethereum object");

            const { amount, message } = formData;
            const fundMeContract = createEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);
            setIsLoading(true);

            const transactionHash = await fundMeContract.fundFunction(message, {
                value: parsedAmount,
            });

            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            console.log(`Success - ${transactionHash.hash}`);
            setIsLoading(false);
            getAllFunds();

            const newFundCount = await fundMeContract.getFundCount();
            setFundCount(newFundCount.toNumber());
            window.location.reload();
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkIfWalletIsConnect();
    }, []);

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
};

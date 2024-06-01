import React, { useContext } from "react";
import { FundMeContext } from "../context/FundMeContext";
import '../styles/fund.css';

function Fund() {
    const {
        fundCount,
        connectWallet,
        fundHistory,
        currentAccount,
        isLoading,
        sendFund,
        handleChange,
        formData,
    } = useContext(FundMeContext);

    return (
        <>
            <h1>Transfer funds instantly</h1>
            <div className="flex-between">
                <div>
                    <input
                        type="number"
                        onChange={(e) => handleChange(e, "amount")}
                        placeholder="Amount"
                        step="0.0001"
                        value={formData.amount}
                    />{" "}
                    <br />
                    <input
                        type="text"
                        onChange={(e) => handleChange(e, "message")}
                        placeholder="Message"
                        value={formData.message}
                    />
                    <br />
                    {!currentAccount ? (
                        <button onClick={connectWallet}>Connect Wallet</button>
                    ) : (
                        <button onClick={sendFund} disabled={isLoading}>
                            {isLoading ? "Sending..." : "Fund"}
                        </button>
                    )}
                </div>

                <div className="ethCard">
                  
                </div>
                    
            </div>
        </>
    );
}

export default Fund;

import React, { useContext } from "react";
import { FundMeContext } from "../context/FundMeContext";
import '../styles/fund.css';
import { SiEthereum } from "react-icons/si";

function Fund() {
  const {
    connectWallet,
    currentAccount,
    isLoading,
    sendFund,
    handleChange,
    formData,
  } = useContext(FundMeContext);

  return (
    <>
      <section className="fundSection">
        <h1>Transfer Funds Instantly</h1>
        <div >
          <div className="fundSection-form">
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
            <SiEthereum className="ethCard-icon" fontSize={21} />
            <p className="ethCard-logo">FundMe</p>
            <p className="ethCard-address">{currentAccount.slice(0,5)}...{currentAccount.slice(-5)}</p>
          </div>

        </div>
      </section>
    </>
  );
}

export default Fund;

import { useContext, useEffect } from "react";
import { FundMeContext } from "../context/FundMeContext";
import '../styles/fundHistory.css'

function FundHistory() {
  const { fundHistory } = useContext(FundMeContext);

  return (
    <>
      <section className="fundHistory">
        <h1>Fund History</h1>
        <div className="fundHistory-container">
        <table className="fundHistory-headings">
          <tr>
          <th>Address</th>
          <th>Time</th>
          <th>Message</th>
          <th>Amount</th>
          </tr>
        {fundHistory.length ?
          (
            [...fundHistory].reverse().map((fund, index) => (
              <tr key={index} className="fundHistory-data">
                <td>{fund.addressFrom.slice(0, 5)}...{fund.addressFrom.slice(-5)}</td>
                <td>{fund.timestamp}</td>
                <td>{fund.message}</td>
                <td>{fund.amount}</td>
              </tr>
            ))
          ) : (
            <tr><td>No funds found</td></tr>
          )

        }
        </table>
        </div>
      </section>
    </>
  );
}

export default FundHistory;
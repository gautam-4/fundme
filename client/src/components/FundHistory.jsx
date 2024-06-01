import { useContext, useEffect } from "react";
import { FundMeContext } from "../context/FundMeContext";

function FundHistory() {
const {fundHistory} = useContext(FundMeContext);

useEffect(() => {
  console.log(fundHistory); // Check if fundHistory is correctly populated
}, [fundHistory]);

  return (
    <>
        <h1>Fund History</h1>
        {fundHistory.length ?
        (
          fundHistory.map((fund, index) => (
            <div key={index}>
              <div>{fund.addressFrom}</div>
              <div>{fund.message}</div>
              <div>{fund.timestamp}</div>
              <div>{fund.amount}</div>
            </div>
          ))
        ):(
          <p>No funds found</p>
        )

        }
    </>
  );
}

export default FundHistory;
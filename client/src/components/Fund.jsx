import '../styles/fund.css'
import { useContext } from 'react';
import { FundMeContext } from '../context/FundMeContext';

function Fund() {
  const {fundCount, connectWallet,fundHistory,currentAccount,isLoading,sendFund,handleChange,formData} = useContext(FundMeContext);
  return (
    <>
      <h1>Transfer funds instantly</h1>
      <div className="flex-between">
        <div>
          <input type="number" onChange={() => { }} placeholder="Amount" step='0.0001'/> <br />
          <input type="text" onChange={() => { }} placeholder="Message" />
          <br />
          <button onClick={connectWallet}>Connect Wallet</button>
        </div>

        <div className="ethCard">

        </div>
      </div>
    </>
  )
}

export default Fund
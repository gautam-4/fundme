import '../styles/fund.css'

function Fund() {
  return (
    <>
      <h1>Transfer funds instantly</h1>
      <div className="flex-between">
        <div>
          <input type="number" onChange={() => { }} placeholder="Amount" step='0.0001'/> <br />
          <input type="text" onChange={() => { }} placeholder="Message" />
          <br />
          <button>Connect Wallet</button>
        </div>

        <div className="ethCard">

        </div>
      </div>
    </>
  )
}

export default Fund
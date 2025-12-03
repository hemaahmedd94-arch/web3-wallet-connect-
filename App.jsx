import { useState } from "react";
import { BrowserProvider } from "ethers";

export default function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not detected");
      return;
    }

    const provider = new BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const selectedAccount = accounts[0];

    const balanceWei = await provider.getBalance(selectedAccount);
    const balanceEth = Number(balanceWei) / 1e18;

    setAccount(selectedAccount);
    setBalance(balanceEth.toFixed(4));
  };

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>Web3 Wallet Connect</h1>

      {!account ? (
        <button
          onClick={connectWallet}
          style={{ padding: 10, fontSize: 18, cursor: "pointer" }}
        >
          Connect Wallet
        </button>
      ) : (
        <div>
          <p><b>Account:</b> {account}</p>
          <p><b>Balance:</b> {balance}</p>
        </div>
      )}
    </div>
  );
}
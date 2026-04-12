import React, { useState } from "react";

export default function App() {
  const [trades, setTrades] = useState([]);
  const [index, setIndex] = useState("NIFTY");
  const [strike, setStrike] = useState("");
  const [type, setType] = useState("CE");
  const [entry, setEntry] = useState("");
  const [exit, setExit] = useState("");
  const [qty, setQty] = useState("");
  const [emotion, setEmotion] = useState("Planned");

  const lotSize = index === "NIFTY" ? 65 : 20;

  const addTrade = () => {
    if (qty % lotSize !== 0) {
      alert("Qty must be multiple of lot size");
      return;
    }

    const gross = (exit - entry) * qty;
    const charges = 40;
    const net = gross - charges;

    setTrades([...trades, { index, strike, type, net, emotion }]);
  };

  const total = trades.reduce((a, t) => a + t.net, 0);

  return (
    <div style={{ background: "#0d0d0d", color: "#fff", minHeight: "100vh", padding: 20 }}>
      <h2>Trading Dashboard</h2>
      <h3>Total P&L: ₹{total.toFixed(2)}</h3>

      <div style={{ background: "#1c1c1c", padding: 15, borderRadius: 10 }}>
        <h4>Add Trade</h4>

        <select onChange={(e) => setIndex(e.target.value)}>
          <option>NIFTY</option>
          <option>SENSEX</option>
        </select>

        <input placeholder="Strike" onChange={(e) => setStrike(e.target.value)} />
        <select onChange={(e) => setType(e.target.value)}>
          <option>CE</option>
          <option>PE</option>
        </select>

        <input placeholder="Entry" onChange={(e) => setEntry(e.target.value)} />
        <input placeholder="Exit" onChange={(e) => setExit(e.target.value)} />
        <input placeholder="Qty" onChange={(e) => setQty(e.target.value)} />

        <select onChange={(e) => setEmotion(e.target.value)}>
          <option>Planned</option>
          <option>FOMO</option>
          <option>Revenge</option>
        </select>

        <button onClick={addTrade}>Add Trade</button>
      </div>

      <div style={{ marginTop: 20 }}>
        <h4>Trades</h4>
        {trades.map((t, i) => (
          <div key={i}>
            {t.index} {t.strike} {t.type} → ₹{t.net}
          </div>
        ))}
      </div>
    </div>
  );
}

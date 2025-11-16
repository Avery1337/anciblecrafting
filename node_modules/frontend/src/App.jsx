import React, { useState } from "react";
import "./styles/retro.css";
import CraftingQueue from "./components/CraftingQueue";
import SearchBox from "./components/SearchBox";
import Results from "./components/Results";

export default function App() {
  const [queue, setQueue] = useState([]);
  const [breakdown, setBreakdown] = useState(null);
  const [coins, setCoins] = useState(null);

  const handleAdd = (item, amount) => {
    setQueue([...queue, { item, amount: Number(amount) || 1 }]);
  };
  const handleRemove = idx => {
    setQueue(queue.filter((_, i) => i !== idx));
  };
  const handleCalculate = async () => {
    setBreakdown(null);
    setCoins(null);
    const response = await fetch("http://localhost:4000/api/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ crafts: queue }),
    });
    const data = await response.json();
    setBreakdown(data.breakdown);
    setCoins(data.coins);
  };

  return (
    <div className="retro-bg">
      <h1 className="title">Ancible Online Crafting Calculator</h1>
      <div className="container">
        <SearchBox onAdd={handleAdd} />
        <CraftingQueue queue={queue} onRemove={handleRemove} />
        <button className="calculate-btn" onClick={handleCalculate}>Calculate Materials</button>
        <Results breakdown={breakdown} coins={coins} />
      </div>
      <footer>
        <small style={{ color: "#999" }}>Retro Dark Mode - v1.0</small>
      </footer>
    </div>
  );
}
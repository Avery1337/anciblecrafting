import React, { useState, useEffect } from "react";

export default function SearchBox({ onAdd }) {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    if (query.length < 1) return setItems([]);
    fetch(`http://localhost:4000/api/recipes?q=${encodeURIComponent(query)}`)
      .then(r => r.json())
      .then(setItems);
  }, [query]);

  return (
    <div className="search-box">
      <input
        className="retro-input"
        value={query}
        placeholder="Search for item..."
        onChange={e => setQuery(e.target.value)}
      />
      <input
        className="retro-input small"
        type="number"
        min={1}
        value={amount}
        onChange={e => setAmount(e.target.value)}
        placeholder="Amount"
      />
      {items.length > 0 && (
        <ul className="results-list">
          {items.map((item, idx) => (
            <li key={item.output_item + idx}>
              <button onClick={() => onAdd(item.output_item, amount)}>
                {item.output_item}
                <span className="small-recipe-name">({item.recipe_name})</span>
                <div className="meta-line">
                  <span>Type: {item.Type || item.type || "-"}</span>
                  <span>Tier: {item.Tier || item.tier || "-"}</span>
                  <span>Coins: {item.Coins || item.coins || "-"}</span>
                  <span>Class: {item.Class || item.class || "-"}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
import React from "react";

export default function Results({ breakdown, coins }) {
  if (!breakdown) return null;
  return (
    <div className="results">
      <h3>Total Raw Materials Needed:</h3>
      <ul>
        {Object.entries(breakdown).map(([mat, amount]) => (
          <li key={mat}>{amount} × {mat}</li>
        ))}
      </ul>
      <p><strong>Total Coins:</strong> {coins}</p>
    </div>
  );
}
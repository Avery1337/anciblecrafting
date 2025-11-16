import React from "react";

export default function CraftingQueue({ queue, onRemove }) {
  return (
    <div className="crafting-queue">
      <h3>Crafting Queue</h3>
      <ul>
        {queue.map((item, idx) => (
          <li key={item.item + idx}>
            {item.amount} × {item.item}
            <button onClick={() => onRemove(idx)} className="retro-btn">X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
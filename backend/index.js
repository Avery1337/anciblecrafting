const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csvParser = require('csv-parser');
const path = require('path');
const craftingUtils = require('./utils/crafting');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const DATA_PATH = path.join(__dirname, 'data', 'crafting_data.csv');
let recipes = [];

function loadCraftingData() {
  const newRecipes = [];
  fs.createReadStream(DATA_PATH)
    .pipe(csvParser())
    .on('data', (row) => {
      newRecipes.push(row);
    })
    .on('end', () => {
      recipes = newRecipes;
      console.log(`Loaded ${recipes.length} recipes from CSV`);
    });
}
loadCraftingData();

app.get('/api/items', (req, res) => {
  const items = recipes.map(r => r.output_item);
  res.json([...new Set(items)]);
});

app.post('/api/calculate', (req, res) => {
  const { crafts } = req.body;
  if (!Array.isArray(crafts)) return res.status(400).json({ error: "Missing crafts array" });
  try {
    const { rawTotals, totalCoins } = craftingUtils.calculateRawMaterialsAndCoins(recipes, crafts);
    res.json({ breakdown: rawTotals, coins: totalCoins });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/recipes', (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  const results = recipes.filter(r => r.output_item.toLowerCase().includes(q));
  res.json(results);
});

app.post('/api/reload', (req, res) => {
  loadCraftingData();
  res.json({ status: "Reloaded" });
});

app.listen(PORT, () => {
  console.log(`Ancible Online Crafting API running on http://localhost:${PORT}`);
});
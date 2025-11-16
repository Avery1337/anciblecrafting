# Ancible Online Crafting Calculator

A retro 2D dark-mode crafting calculator for Ancible Online.

### Features

- Search craftable items
- Add to crafting queue
- Calculate total raw materials (recursive, for multiple items)
- See Type, Tier, Coins, and Class
- Retro pixel look, no account required

---

## Getting Started

### 1. Prepare Crafting Data

1. Your crafting recipes should be in `backend/data/crafting_data.csv` with columns for output, ingredients, coins, type, tier, class, as shown in the sample.
2. To update crafting data, replace the CSV file and restart the backend.

### 2. Install Dependencies

```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```

### 3. Run

- Start backend API:

```bash
cd backend
node index.js
```

- In another shell, start frontend dev server:

```bash
cd frontend
npm run dev
```

- Visit: [http://localhost:5173](http://localhost:5173)

---

*Enjoy your retro pixel crafting tool!*
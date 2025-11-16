function parseIngredients(recipeRow) {
  const ingredients = [];
  for (let i = 1; i <= 6; i++) {
    const name = recipeRow[`ingredient${i}`];
    const amt = recipeRow[`ingredient${i}_amount`];
    if (name && amt) {
      ingredients.push({ name, amount: Number(amt) });
    }
  }
  return ingredients;
}

function getRecipeForItem(recipes, item) {
  return recipes.find(r => r.output_item.toLowerCase() === item.toLowerCase());
}

function calculateRawMaterialsAndCoins(recipes, crafts) {
  const grandTotals = {};
  let totalCoins = 0;

  function recurse(item, amountNeeded) {
    const recipe = getRecipeForItem(recipes, item);
    if (!recipe) {
      grandTotals[item] = (grandTotals[item] || 0) + amountNeeded;
      return;
    }
    const outputQty = Number(recipe.output_amount) || 1;
    const timesToCraft = Math.ceil(amountNeeded / outputQty);
    const coinsPer = Number(recipe.Coins) || 0;
    totalCoins += coinsPer * timesToCraft;

    const ingredients = parseIngredients(recipe);
    for (const ing of ingredients) {
      recurse(ing.name, ing.amount * timesToCraft);
    }
  }

  for (const order of crafts) {
    recurse(order.item, order.amount);
  }

  return { rawTotals: grandTotals, totalCoins };
}

module.exports = { calculateRawMaterialsAndCoins };
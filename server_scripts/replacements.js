function createShapedRecipe(output, shape, mapping) {
  return { 'output': output, 'shape': shape, 'mapping': mapping };
}

function createSmithingRecipe(output, template, itemToUpgrade, upgradeItem) {
  return { 'output': output, 'template': template, 'itemToUpgrade': itemToUpgrade, 'upgradeItem': upgradeItem };
}

function createMechanicalCraftingRecipe(output, shape, mapping) {
  return { 'output': output, 'shape': shape, 'mapping': mapping };
}

function registerRecipes(event, shapedRecipe, smithingRecipe, mechanicalCraftingRecipe) {
  event.shaped(shapedRecipe.output, shapedRecipe.shape, shapedRecipe.mapping);
  event.smithing(smithingRecipe.output, smithingRecipe.template, smithingRecipe.itemToUpgrade, smithingRecipe.upgradeItem);
  event.recipes.create.mechanical_crafting(mechanicalCraftingRecipe.output, mechanicalCraftingRecipe.shape, mechanicalCraftingRecipe.mapping);
}

const shapedRecipe = createShapedRecipe('moonsweaponry:diamond_greatsword', ['   ', ' d ', 'dsd'], { d: 'minecraft:diamond', s: 'minecraft:stick' });
const smithingRecipe = createSmithingRecipe('moonsweaponry:netherite_greatsword', 'minecraft:echo_shard', 'moonsweaponry:diamond_greatsword', 'minecraft:oak_log');
const mechanicalCraftingRecipe = createMechanicalCraftingRecipe('minecraft:dirt', [' GGG ', 'GGGGG', 'GGGGG', 'GGGGG', ' GGG '], { G: '#forge:grasses' });

ServerEvents.recipes(event => {
  registerRecipes(event, shapedRecipe, smithingRecipe, mechanicalCraftingRecipe);
});

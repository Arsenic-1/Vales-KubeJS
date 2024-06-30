const shapedRecipe = {
  output: Item.of('moonsweaponry:diamond_greatsword', 1),
  shape: ['   ', ' d ', 'dsd'],
  mapping: { d: 'minecraft:diamond', s: 'minecraft:stick' }
};

const smithingRecipe = {
  output: 'moonsweaponry:netherite_greatsword',
  template: 'minecraft:echo_shard',
  itemToUpgrade: 'moonsweaponry:diamond_greatsword',
  upgradeItem: 'minecraft:oak_log'
};

const mechanicalCraftingRecipe = {
  output: 'minecraft:dirt',
  shape: [' GGG ', 'GGGGG', 'GGGGG', 'GGGGG', ' GGG '],
  mapping: { G: '#forge:grasses' }
};

ServerEvents.recipes(event => {
  event.shaped(shapedRecipe.output, shapedRecipe.shape, shapedRecipe.mapping);
  event.smithing(smithingRecipe.output, smithingRecipe.template, smithingRecipe.itemToUpgrade, smithingRecipe.upgradeItem);
  event.recipes.create.mechanical_crafting(mechanicalCraftingRecipe.output, mechanicalCraftingRecipe.shape, mechanicalCraftingRecipe.mapping);
});
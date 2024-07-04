// Mod shortcuts
const MOD = (domain: string, id: string, x?: number): string => (x ? `${x}x ` : "") + (id.startsWith('#') ? '#' : "") + domain + ":" + id.replace('#', '');
const CR = (id: string, x?: number): string => MOD("create", id, x);
const MC = (id: string, x?: number): string => MOD("minecraft", id, x);
const KJ = (id: string, x?: number): string => MOD("kubejs", id, x);
const FD = (id: string, x?: number): string => MOD("farmersdelight", id, x);
const SP = (id: string, x?: number): string => MOD("supplementaries", id, x);
const FO = (id: string, x?: number): string => MOD("forge", id, x);
const AC = (id: string, x?: number): string => MOD("aquaculture", id, x);
const MW = (id: string, x?: number): string => MOD("moonsweaponry", id, x);

// Recipe creation functions
function createShapedRecipe(output: string, shape: string[], mapping: { [key: string]: string }): { output: string, shape: string[], mapping: { [key: string]: string } } {
  return { 'output': output, 'shape': shape, 'mapping': mapping };
}

function createSmithingRecipe(output: string, template: string, itemToUpgrade: string, upgradeItem: string): { output: string, template: string, itemToUpgrade: string, upgradeItem: string } {
  return { 'output': output, 'template': template, 'itemToUpgrade': itemToUpgrade, 'upgradeItem': upgradeItem };
}

function createMechanicalCraftingRecipe(output: string, shape: string[], mapping: { [key: string]: string }): { output: string, shape: string[], mapping: { [key: string]: string } } {
  return { 'output': output, 'shape': shape, 'mapping': mapping };
}

// Recipe registration function
function registerRecipes(event: Event, shapedRecipe: { output: string, shape: string[], mapping: { [key: string]: string } }, smithingRecipe: { output: string, template: string, itemToUpgrade: string, upgradeItem: string }, mechanicalCraftingRecipe: { output: string, shape: string[], mapping: { [key: string]: string } }): void {
  event.shaped(shapedRecipe.output, shapedRecipe.shape, shapedRecipe.mapping);
  event.smithing(smithingRecipe.output, smithingRecipe.template, smithingRecipe.itemToUpgrade, smithingRecipe.upgradeItem);
  event.recipes.create.mechanical_crafting(mechanicalCraftingRecipe.output, mechanicalCraftingRecipe.shape, mechanicalCraftingRecipe.mapping);
}

// Recipe definitions
const shapedRecipe = createShapedRecipe(MW('diamond_greatsword'), ['   ', ' d ', 'dsd'], { d: MC('diamond'), s: MC('stick') });
const smithingRecipe = createSmithingRecipe(MW('netherite_greatsword'), MC('echo_shard'), MW('diamond_greatsword'), MC('oak_log'));
const mechanicalCraftingRecipe = createMechanicalCraftingRecipe(MC('dirt'), [' GGG ', 'GGGGG', 'GGGGG', 'GGGGG', ' GGG '], { G: FO('#grasses') });

// Recipe removals and registration
ServerEvents.recipes((event: Event) => {
  // Recipe removals
  event.remove({ id: MW('diamond_greatsword') });
  event.remove({ id: MW('netherite_greatsword_smithing') });
  event.remove({ id: CR('building/crafting/furnaces/cobblestone_furnace') });

  // Register recipes
  registerRecipes(event, shapedRecipe, smithingRecipe, mechanicalCraftingRecipe);
});

const blockRecipes = new Map<string, string>();
blockRecipes.set(`${MC('cobblestone')}-${MC('redstone')}`, MC('redstone_block'));
blockRecipes.set(`${MC('sand')}-${MC('birch_planks')}`, MC('lava'));
blockRecipes.set(`${MC('red_sand')}-${MC('birch_planks')}`, MC('lava'));

BlockEvents.rightClicked((event: Event) => {
  const key = `${event.block.id}-${event.item.id}`;
  const newBlockId = blockRecipes.get(key);
  if (newBlockId) {
    handleBlockAndItem(event, newBlockId);
  }
});

function handleBlockAndItem(event: Event, newBlockId: string): void {
  event.block.set(newBlockId);
  event.item.shrink(1);
}
// Mod shortcuts
const MOD = (domain, id, x) => (x ? `${x}x ` : "") + (id.startsWith('#') ? '#' : "") + domain + ":" + id.replace('#', '');
const CR = (id, x) => MOD("create", id, x);
const MC = (id, x) => MOD("minecraft", id, x);
const KJ = (id, x) => MOD("kubejs", id, x);
const FD = (id, x) => MOD("farmersdelight", id, x);
const SP = (id, x) => MOD("supplementaries", id, x);
const FO = (id, x) => MOD("forge", id, x);
const AC = (id, x) => MOD("aquaculture", id, x);
const MW = (id, x) => MOD("moonsweaponry", id, x);
const QU = (id, x) => MOD("quark", id, x);
// Recipe creation functions
function createShapedRecipe(output, shape, mapping) {
    return { 'output': output, 'shape': shape, 'mapping': mapping };
}
function createSmithingRecipe(output, template, itemToUpgrade, upgradeItem) {
    return { 'output': output, 'template': template, 'itemToUpgrade': itemToUpgrade, 'upgradeItem': upgradeItem };
}
function createMechanicalCraftingRecipe(output, shape, mapping) {
    return { 'output': output, 'shape': shape, 'mapping': mapping };
}
// Recipe registration function
function registerRecipes(event, shapedRecipe, smithingRecipe, mechanicalCraftingRecipe) {
    event.shaped(shapedRecipe.output, shapedRecipe.shape, shapedRecipe.mapping);
    event.smithing(smithingRecipe.output, smithingRecipe.template, smithingRecipe.itemToUpgrade, smithingRecipe.upgradeItem);
    event.recipes.create.mechanical_crafting(mechanicalCraftingRecipe.output, mechanicalCraftingRecipe.shape, mechanicalCraftingRecipe.mapping);
}
// Recipe definitions
const shapedRecipe = createShapedRecipe(MW('diamond_greatsword'), ['   ', ' d ', 'dsd'], { d: MC('diamond'), s: MC('stick') });
const smithingRecipe = createSmithingRecipe(MW('netherite_greatsword'), MC('echo_shard'), MW('diamond_greatsword'), MC('oak_log'));
const mechanicalCraftingRecipe = createMechanicalCraftingRecipe(MC('dirt'), [' GGG ', 'GGGGG', 'GGGGG', 'GGGGG', ' GGG '], { G: FO('#grasses') });
// Recipe removals and registration
ServerEvents.recipes((event) => {
    // Recipe removals
    event.remove({ id: MW('diamond_greatsword') });
    event.remove({ id: MW('netherite_greatsword_smithing') });
    event.remove({ id: QU('building/crafting/furnaces/cobblestone_furnace') });

    // Register recipes
    registerRecipes(event, shapedRecipe, smithingRecipe, mechanicalCraftingRecipe);
});
const blockRecipes = new Map();
blockRecipes.set(`${MC('cobblestone')}-${MC('redstone')}`, MC('redstone_block'));
blockRecipes.set(`${MC('sand')}-${MC('birch_planks')}`, MC('lava'));
blockRecipes.set(`${MC('red_sand')}-${MC('birch_planks')}`, MC('lava'));
BlockEvents.rightClicked((event) => {
    const key = `${event.block.id}-${event.item.id}`;
    const newBlockId = blockRecipes.get(key);
    if (newBlockId) {
        handleBlockAndItem(event, newBlockId);
    }
});
function handleBlockAndItem(event, newBlockId) {
    event.block.set(newBlockId);
    event.item.shrink(1);
}
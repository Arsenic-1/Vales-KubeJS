//Mod shorthand
const MOD = (domain, id, x) => (x ? 'C' : '') + (id.startsWith('#') ? '#' : '') + domain + ':' + id.replace('#', '');
const CR = (id, x) => MOD("create", id, x);
const MC = (id, x) => MOD("minecraft", id, x);
const KJ = (id, x) => MOD("kubejs", id, x);
const FD = (id, x) => MOD("farmersdelight", id, x);
const SP = (id, x) => MOD("supplementaries", id, x);
const FO = (id, x) => MOD("forge", id, x);
const MW = (id, x) => MOD("moonsweaponry", id, x);
const QU = (id, x) => MOD("quark", id, x);

// Recipe creation functions
function createShapedRecipe(output, shape, mapping) {
    return { 'type': 'shaped', 'output': output, 'shape': shape, 'mapping': mapping };
}
function createSmithingRecipe(output, template, itemToUpgrade, upgradeItem) {
    return { 'type': 'smithing', 'output': output, 'template': template, 'itemToUpgrade': itemToUpgrade, 'upgradeItem': upgradeItem };
}
function createMechanicalCraftingRecipe(output, shape, mapping) {
    return { 'type': 'mechanical_crafting', 'output': output, 'shape': shape, 'mapping': mapping };
}

// Recipe registration function
function registerRecipes(event, recipes) {
    recipes.forEach(recipe => {
        switch (recipe.type) {
            case 'shaped':
                event.shaped(recipe.output, recipe.shape, recipe.mapping);
                break;
            case 'smithing':
                event.smithing(recipe.output, recipe.template, recipe.itemToUpgrade, recipe.upgradeItem);
                break;
            case 'mechanical_crafting':
                event.recipes.create.mechanical_crafting(recipe.output, recipe.shape, recipe.mapping);
                break;
        }
    });
}

// Recipe definitions
const recipes = [
    createShapedRecipe(MW('diamond_greatsword'), ['   ', ' d ', 'dsd'], { d: MC('diamond'), s: MC('stick') }),
    createShapedRecipe(MW('iron_greatsword'), ['   ', ' i ', 'isi'], { i: MC('iron_ingot'), s: MC('stick') }),
    createSmithingRecipe(MW('netherite_greatsword'), MC('echo_shard'), MW('diamond_greatsword'), MC('oak_log')),
    createMechanicalCraftingRecipe(MC('dirt'), [' GGG ', 'GGGGG', 'GGGGG', 'GGGGG', ' GGG '], { G: FO('#grasses') })
];

// Recipe removals
ServerEvents.recipes((event) => {
    event.remove({ id: MW('diamond_greatsword') });
    event.remove({ id: MW('iron_greatsword') });
    event.remove({ id: MW('netherite_greatsword_smithing') });
    event.remove({ id: QU('building/crafting/furnaces/cobblestone_furnace') });
    
// Register recipes
    registerRecipes(event, recipes);
});


//--// Block recipe handler //--//
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

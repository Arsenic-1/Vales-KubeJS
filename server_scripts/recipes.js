// Mod shorthand
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
function createShapelessRecipe(output, ingredients) {
    return { 'type': 'shapeless', 'output': output, 'ingredients': ingredients };
}
function createSmithingRecipe(output, template, itemToUpgrade, upgradeItem) {
    return { 'type': 'smithing', 'output': output, 'template': template, 'itemToUpgrade': itemToUpgrade, 'upgradeItem': upgradeItem };
}
function createSmeltingRecipe(output, ingredient, experience, cookingTime) {
    return { 'type': 'smelting', 'output': output, 'ingredient': ingredient, 'experience': experience, 'cookingtime': cookingTime };
}
function createBlastingRecipe(output, ingredient, experience, cookingTime) {
    return { 'type': 'blasting', 'output': output, 'ingredient': ingredient, 'experience': experience, 'cookingtime': cookingTime };
}
function createSmokingRecipe(output, ingredient, experience, cookingTime) {
    return { 'type': 'smoking', 'output': output, 'ingredient': ingredient, 'experience': experience, 'cookingtime': cookingTime };
}
function createCampfireCookingRecipe(output, ingredient, experience, cookingTime) {
    return { 'type': 'campfire_cooking', 'output': output, 'ingredient': ingredient, 'experience': experience, 'cookingtime': cookingTime };
}
function createMechanicalCraftingRecipe(output, shape, mapping) {
    return { 'type': 'mechanical_crafting', 'output': output, 'shape': shape, 'mapping': mapping };
}
function createFillingRecipe(results, ingredients) {
    return { 'type': 'create:filling', 'results': results, 'ingredients': ingredients };
}
function createCompactingRecipe(outputs, inputs) {
    return { 'type': 'create:compacting', 'outputs': outputs, 'inputs': inputs };
}
function createCrushingRecipe(outputs, input) {
    return { 'type': 'create:crushing', 'outputs': outputs, 'input': input };
}
function createCuttingRecipe(outputs, input) {
    return { 'type': 'create:cutting', 'outputs': outputs, 'input': input };
}
function createDeployingRecipe(outputs, inputs) {
    return { 'type': 'create:deploying', 'outputs': outputs, 'inputs': inputs };
}
function createEmptyingRecipe(outputs, input) {
    return { 'type': 'create:emptying', 'outputs': outputs, 'input': input };
}
function createHauntingRecipe(outputs, input) {
    return { 'type': 'create:haunting', 'outputs': outputs, 'input': input };
}
function createMillingRecipe(outputs, input) {
    return { 'type': 'create:milling', 'outputs': outputs, 'input': input };
}
function createMixingRecipe(outputs, inputs) {
    return { 'type': 'create:mixing', 'outputs': outputs, 'inputs': inputs };
}
function createPressingRecipe(outputs, input) {
    return { 'type': 'create:pressing', 'outputs': outputs, 'input': input };
}
function createSandpaperPolishingRecipe(output, input) {
    return { 'type': 'create:sandpaper_polishing', 'output': output, 'input': input };
}
function createSequencedAssemblyRecipe(outputs, input, sequence) {
    return { 'type': 'create:sequenced_assembly', 'outputs': outputs, 'input': input, 'sequence': sequence };
}
function createSplashingRecipe(outputs, input) {
    return { 'type': 'create:splashing', 'outputs': outputs, 'input': input };
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
            case 'campfire_cooking':
                event.campfire_cooking(recipe.output, recipe.ingredient).experience(recipe.experience).cookingtime(recipe.cookingtime);
                break;
            case 'mechanical_crafting':
                event.recipes.create.mechanical_crafting(recipe.output, recipe.shape, recipe.mapping);
                break;
            case 'create:filling':
                event.recipes.create.filling(recipe.results, recipe.ingredients);
                break;
        }
    });
}

// Recipe definitions
const recipes = [
    createShapedRecipe(MW('diamond_greatsword'), ['   ', ' d ', 'dsd'], { d: MC('diamond'), s: MC('stick') }),
    createShapedRecipe(MW('iron_greatsword'), ['   ', ' i ', 'isi'], { i: MC('iron_ingot'), s: MC('stick') }),
    createShapedRecipe(MC('lodestone'), ['sss', 'sis', 'sss'], { s: MC('chiseled_stone_bricks'), i: MC('iron_block') }),
    createSmithingRecipe(MW('netherite_greatsword'), MC('echo_shard'), MW('diamond_greatsword'), MC('oak_log')),
    createMechanicalCraftingRecipe(MC('dirt'), [' GGG ', 'GGGGG', 'GGGGG', 'GGGGG', ' GGG '], { G: FO('#grasses') }),
    createFillingRecipe([{ "item": "splash_milk:milk_bottle" }], [{ "item": "minecraft:glass_bottle" }, { "fluid": "minecraft:milk", "nbt": {}, "amount": 250 }]),
    createSandpaperPolishingRecipe(MC('coal'), MC('coal_block')),
];

// Recipe removals
ServerEvents.recipes((event) => {
    event.remove({ id: MW('diamond_greatsword') });
    event.remove({ id: MW('iron_greatsword') });
    event.remove({ id: MW('netherite_greatsword_smithing') });
    event.remove({ id: QU('building/crafting/furnaces/cobblestone_furnace') });
    event.remove({ id: MC('lodestone') });
    event.remove({ id: FD('milk_bottle') });
    event.remove({ id: CR('filling/compat/farmersdelight/milk_bottle') });
    // Register recipes
    registerRecipes(event, recipes);
});

// Block recipe handler
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
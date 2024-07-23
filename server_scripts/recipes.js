// Mod shorthand
const MOD = (domain, id, x) => {
    const result = (x ? 'C' : '') + (id.startsWith('#') ? '#' : '') + domain + ':' + id.replace('#', '');
    console.log(`MOD -> Domain: ${domain}, ID: ${id}, X: ${x}, Result: ${result}`);
    return result;
};

const CR = (id, x) => MOD("create", id, x);
const MC = (id, x) => MOD("minecraft", id, x);
const KJ = (id, x) => MOD("kubejs", id, x);
const FD = (id, x) => MOD("farmersdelight", id, x);
const SP = (id, x) => MOD("supplementaries", id, x);
const FO = (id, x) => MOD("forge", id, x);
const MW = (id, x) => MOD("moonsweaponry", id, x);
const QU = (id, x) => MOD("quark", id, x);

// Recipe creation functions
/**
 * Handles the creation of various types of recipes.
 *
 * @param {object} event - The event object containing the recipe registration methods.
 * @param {array} recipes - An array of recipe objects to be registered.
 *
 * @returns {void}
 */

/**
 * Handles the creation of a shaped crafting recipe.
 *
 * @param {object} output - The item stack representing the output of the recipe.
 * @param {array} shape - An array of strings representing the shape of the crafting grid.
 * @param {object} mapping - An object mapping characters in the shape to item stacks.
 *
 * @returns {object} - A shaped crafting recipe object.
 */
function createShapedRecipe(output, shape, mapping) {
    const result = { 'type': 'shaped', 'output': output, 'shape': shape, 'mapping': mapping };
    console.log(`createShapedRecipe -> Output: ${output}, Shape: ${shape}, Mapping: ${JSON.stringify(mapping)}, Result: ${JSON.stringify(result)}`);
    return result;
}

/**
 * Handles the creation of a smithing crafting recipe.
 *
 * @param {object} output - The item stack representing the output of the recipe.
 * @param {object} template - The item stack representing the template item in the smithing table.
 * @param {object} itemToUpgrade - The item stack representing the item to be upgraded.
 * @param {object} upgradeItem - The item stack representing the upgrade item.
 *
 * @returns {object} - A smithing crafting recipe object.
 */
function createSmithingRecipe(output, template, itemToUpgrade, upgradeItem) {
    const result = { 'type': 'smithing', 'output': output, 'template': template, 'itemToUpgrade': itemToUpgrade, 'upgradeItem': upgradeItem };
    console.log(`createSmithingRecipe -> Output: ${output}, Template: ${template}, ItemToUpgrade: ${itemToUpgrade}, UpgradeItem: ${upgradeItem}, Result: ${JSON.stringify(result)}`);
    return result;
}

/**
 * Handles the creation of a mechanical crafting recipe.
 *
 * @param {object} output - The item stack representing the output of the recipe.
 * @param {array} shape - An array of strings representing the shape of the crafting grid.
 * @param {object} mapping - An object mapping characters in the shape to item stacks.
 *
 * @returns {object} - A mechanical crafting recipe object.
 */
function createMechanicalCraftingRecipe(output, shape, mapping) {
    const result = { 'type': 'mechanical_crafting', 'output': output, 'shape': shape, 'mapping': mapping };
    console.log(`createMechanicalCraftingRecipe -> Output: ${output}, Shape: ${shape}, Mapping: ${JSON.stringify(mapping)}, Result: ${JSON.stringify(result)}`);
    return result;
}

/**
 * Handles the creation of a filling recipe.
 *
 * @param {array} results - An array of item stacks representing the results of the recipe.
 * @param {array} ingredients - An array of objects representing the ingredients required for the recipe.
 *
 * @returns {object} - A filling recipe object.
 */
function createFillingRecipe(results, ingredients) {
    const result = { 'type': 'create:filling', 'results': results, 'ingredients': ingredients };
    console.log(`createFillingRecipe -> Results: ${JSON.stringify(results)}, Ingredients: ${JSON.stringify(ingredients)}, Result: ${JSON.stringify(result)}`);
    return result;
}

/**
 * Handles the creation of a sandpaper polishing recipe.
 *
 * @param {object} output - The item stack representing the output of the recipe.
 * @param {object} input - The item stack representing the input item for the recipe.
 *
 * @returns {object} - A sandpaper polishing recipe object.
 */
function createSandpaperPolishingRecipe(output, input) {
    const result = { 'type': 'create:sandpaper_polishing', 'output': output, 'input': input };
    console.log(`createSandpaperPolishingRecipe -> Output: ${output}, Input: ${input}, Result: ${JSON.stringify(result)}`);
    return result;
}

function registerRecipes(event, recipes) {
    console.log(`registerRecipes -> Total Recipes: ${recipes.length}`);
    recipes.forEach(recipe => {
        console.log(`Registering Recipe -> ${JSON.stringify(recipe)}`);
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
    console.log("Removing recipes and registering new ones.");
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
    console.log(`Block Right-Clicked -> Block: ${event.block.id}, Item: ${event.item.id}`);
    const key = `${event.block.id}-${event.item.id}`;
    const newBlockId = blockRecipes.get(key);
    if (newBlockId) {
        console.log(`Transforming Block -> Old: ${event.block.id}, New: ${newBlockId}`);
        handleBlockAndItem(event, newBlockId);
    } else {
        console.log(`No Transformation Found -> Key: ${key}`);
    }
});

/**
 * Handles the block and item interaction when a block is right-clicked.
 *
 * @param {object} event - The event object containing information about the block and item interaction.
 * @param {object} newBlockId - The new block ID to set when the interaction occurs.
 *
 * @returns {void}
 */

function handleBlockAndItem(event, newBlockId) {
    console.log(`Handling Block and Item -> Block: ${event.block.id}, New Block ID: ${newBlockId}`);
    event.block.set(newBlockId);
    event.item.shrink(1);
}


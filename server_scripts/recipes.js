const MOD = (domain, id, x) => `${x ? `${x}x ` : ""}${id.startsWith("#") ? "#" : ""}${domain}:${id.replace("#", "")}`
const CR = (id, x) => MOD("create", id, x)
const MC = (id, x) => MOD("minecraft", id, x)
const FO = (id, x) => MOD("forge", id, x)
const MW = (id, x) => MOD("moonsweaponry", id, x)

function createRecipe(output, shape, mapping, template, itemToUpgrade, upgradeItem) {
  return {
    output,
    shape,
    mapping,
    template,
    itemToUpgrade,
    upgradeItem
  }
}

function registerRecipes(event, recipe) {
  if (recipe.shape) {
    event.shaped(recipe.output, recipe.shape, recipe.mapping)
  }
  if (recipe.template) {
    event.smithing(recipe.output, recipe.template, recipe.itemToUpgrade, recipe.upgradeItem)
  }
  if (recipe.mapping) {
    event.recipes.create.mechanical_crafting(recipe.output, recipe.shape, recipe.mapping)
  }
}

const recipes = [
  createRecipe(MW("diamond_greatsword"), ["   ", " d ", "dsd"], { d: MC("diamond"), s: MC("stick") }),
  createRecipe(MW("netherite_greatsword"), null, null, MC("echo_shard"), MW("diamond_greatsword"), MC("oak_log")),
  createRecipe(MC("dirt"), [" GGG ", "GGGGG", "GGGGG", "GGGGG", " GGG "], { G: FO("#grasses") })
]

ServerEvents.recipes(event => {
  event.remove({ id: MW("diamond_greatsword") })
  event.remove({ id: MW("netherite_greatsword_smithing") })
  event.remove({ id: CR("building/crafting/furnaces/cobblestone_furnace") })

  recipes.forEach(recipe => registerRecipes(event, recipe))
})

BlockEvents.rightClicked(event => {
  const blockRecipes = new Map()
  blockRecipes.set(`${MC("cobblestone")}-${MC("redstone")}`, MC("redstone_block"))
  blockRecipes.set(`${MC("sand")}-${MC("birch_planks")}`, MC("lava"))
  blockRecipes.set(`${MC("red_sand")}-${MC("birch_planks")}`, MC("lava"))

  const handleBlockAndItem = (event, newBlockId) => {
    event.block.set(newBlockId)
    event.item.shrink(1)
  }

  const key = `${event.block.id}-${event.item.id}`
  const newBlockId = blockRecipes.get(key)
  if (newBlockId) {
    handleBlockAndItem(event, newBlockId)
  }
})
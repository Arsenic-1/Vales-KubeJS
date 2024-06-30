const recipes = new Map();
recipes.set("minecraft:cobblestone-minecraft:redstone", "minecraft:redstone_block");
recipes.set("forge:sand-minecraft:birch_planks", "minecraft:lava");

BlockEvents.rightClicked(event => {
  const key = `${event.block.id}-${event.item.id}`;
  const newBlockId = recipes.get(key);
  if (newBlockId) {
    handleBlockAndItem(event, newBlockId);
  }
});

function handleBlockAndItem(event, newBlockId) {
  event.block.set(newBlockId);
  event.item.shrink(1);
}

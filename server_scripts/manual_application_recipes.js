const recipes = [
    {
      blockCheck: block => block.id === "minecraft:cobblestone",
      itemCheck: item => item.id === "minecraft:redstone",
      newBlockId: "minecraft:redstone_block"
    },
    {
      blockCheck: block => block.hasTag('forge:sand'),
      itemCheck: item => item.id === 'minecraft:birch_planks',
      newBlockId: 'minecraft:lava'
    }
  ];
  
  BlockEvents.rightClicked(event => {
    recipes.forEach(recipe => handleBlockAndItem(event, recipe));
  });
  
  function handleBlockAndItem(event, recipe) {
    if(!recipe.blockCheck(event.block) || !recipe.itemCheck(event.item)) {
      return;
    }
    event.block.set(recipe.newBlockId);
    event.item.shrink(1);
  }
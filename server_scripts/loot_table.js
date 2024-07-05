const modifiers = event => {
    const entitiesAndLoot = {
      "minecraft:evoker": ["minecraft:emerald"],
      "minecraft:vindicator": ["minecraft:emerald"],
      "minecraft:zombified_piglin": ["minecraft:gold_nugget", "minecraft:gold_ingot"],
      "minecraft:drowned": ["minecraft:copper_ingot"],
      "minecraft:zombie": ["minecraft:iron_ingot"],
      "minecraft:zombie_villager": ["minecraft:iron_ingot"],
      "minecraft:husk": ["minecraft:iron_ingot"],
      "minecraft:iron_golem": ["minecraft:iron_ingot"],
      "minecraft:wither_skeleton": ["minecraft:coal"],
      "minecraft:witch": ["minecraft:redstone"]
    }
  
    for (let entity in entitiesAndLoot) {
      const modifier = event.addEntityLootModifier(entity)
      entitiesAndLoot[entity].forEach(lootItem => modifier.removeLoot(lootItem))
    }
  }
  
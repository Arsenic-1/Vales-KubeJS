LootJS.modifiers((event) => {
    const entitiesAndLoot = [
        [["minecraft:evoker", "minecraft:vindicator"], ["minecraft:emerald"]],
        ["minecraft:zombified_piglin", ["minecraft:gold_nugget", "minecraft:gold_ingot"]],
        ["minecraft:drowned", ['minecraft:copper_ingot']],
        [["minecraft:zombie", "minecraft:zombie_villager", "minecraft:husk", "minecraft:iron_golem"], ["minecraft:iron_ingot"]],
        ["minecraft:wither_skeleton", ["minecraft:coal"]],
        ["minecraft:witch", ["minecraft:redstone"]]
    ];

    entitiesAndLoot.forEach(([entities, loot]) => {
        const entityList = Array.isArray(entities) ? entities : [entities];
        const modifiers = entityList.map(entity => event.addEntityLootModifier(entity));
        loot.forEach(lootItem => modifiers.forEach(modifier => modifier.removeLoot(lootItem)));
    });
});

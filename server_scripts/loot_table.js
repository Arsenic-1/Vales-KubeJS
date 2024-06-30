const addEntityLootModifier = (event, entities, lootToRemove) => {
    if (!Array.isArray(entities)) {
        entities = [entities];
    }

    entities.forEach(entity => {
        const modifier = event.addEntityLootModifier(entity);
        lootToRemove.forEach(loot => {
            modifier.removeLoot(loot);
        });
    });
};

LootJS.modifiers((event) => {
    addEntityLootModifier(event, "minecraft:iron_golem", ["minecraft:iron_ingot"]);
    addEntityLootModifier(event, ["minecraft:evoker", "minecraft:vindicator"], ["minecraft:emerald"]);
    addEntityLootModifier(event, "minecraft:zombified_piglin", ["minecraft:gold_nugget", "minecraft:gold_ingot"]);
    addEntityLootModifier(event, "minecraft:drowned", ['minecraft:copper_ingot'])
    addEntityLootModifier(event, ["minecraft:zombie", "minecraft:husk"], ["minecraft:iron_ingot"])
});

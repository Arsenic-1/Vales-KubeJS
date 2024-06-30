LootJS.modifiers((event) => {
    event
        .addEntityLootModifier("minecraft:iron_golem")
        .removeLoot("minecraft:iron_ingot");
    event
        .addEntityLootModifier("minecraft:evoker","minecraft:vindicator")
        .removeLoot("minecraft:emerald");
    event
        .addEntityLootModifier("minecraft:zombified_piglin")
        .removeLoot("minecraft:gold_nugget","minecraft:gold_ingot");
});
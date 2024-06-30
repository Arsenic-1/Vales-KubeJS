const tags1 = [
    'minecraft:grass_block',
    'immersive_weathering:rooted_grass_block',
    'immersive_weathering:grassy_earthen_clay',
    'immersive_weathering:grassy_sandy_dirt',
    'immersive_weathering:grassy_silt',
    'immersive_weathering:grassy_permafrost'
];

const tags2 = [
    'minecraft:cobblestone',
    'minecraft:oak_log'
];

ServerEvents.tags('item', function(event) {
    for (let i = 0; i < tags1.length; i++) {
        event.add('forge:grasses', tags1[i]);
    }
    for (let i = 0; i < tags2.length; i++) {
        event.add('forge:tag2', tags2[i]);
    }
});

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
    tags1.forEach(tag => event.add('forge:grasses', tag));
    tags2.forEach(tag => event.add('forge:tag2', tag));
});

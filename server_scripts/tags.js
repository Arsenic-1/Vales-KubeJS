const tags = [
    'minecraft:grass_block',
    'immersive_weathering:rooted_grass_block',
    'immersive_weathering:grassy_earthen_clay',
    'immersive_weathering:grassy_sandy_dirt',
    'immersive_weathering:grassy_silt',
    'immersive_weathering:grassy_permafrost'
];

ServerEvents.tags('item', function(event) {
    event.add('forge:grasses', ...tags);
});

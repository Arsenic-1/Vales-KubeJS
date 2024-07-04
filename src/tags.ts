const tags1: string[] = [
    'minecraft:grass_block',
    'immersive_weathering:rooted_grass_block',
    'immersive_weathering:grassy_earthen_clay',
    'immersive_weathering:grassy_sandy_dirt',
    'immersive_weathering:grassy_silt',
    'immersive_weathering:grassy_permafrost'
];

const tags2: string[] = [
    'minecraft:cobblestone',
    'minecraft:oak_log'
];

ServerEvents.tags('item', function(event: any) {
    tags1.forEach((tag: string) => event.add('forge:grasses', tag));
    tags2.forEach((tag: string) => event.add('forge:tag2', tag));
})
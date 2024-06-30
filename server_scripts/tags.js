const tags = ServerEvents?.tags;
const add = tags?.addItem?.bind(tags);

if(add) {
    add(
        'item', 
        'forge:grasses', 
        'minecraft:grass_block',
        'immersive_weathering:rooted_grass_block',
        'immersive_weathering:grassy_earthen_clay',
        'immersive_weathering:grassy_sandy_dirt',
        'immersive_weathering:grassy_silt'
    );
} else {
    console.error('add is null');
}
if(add) {
    add(
        'item', 
        'forge:emeralds',  // Added comma here
        'minecraft:emerald',
        'minecraft:emerald_block'
    );
} else {
    console.error('add is null');
}
